import { PineconeStore } from "@langchain/pinecone";
import { Request, Response } from "express";
import { embeddings, pineconeIndex } from "../libs/constants";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export const uploadFile = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      throw new Error("PDF File not found.");
    }
    if (!req.body.namespace) {
      throw new Error("namespace not found.");
    }
    const { namespace } = req.body;
    const pdfBuffer = req.file.buffer;
    const pdfBlob = new Blob([pdfBuffer], { type: "application/pdf" });

    const pdfLoader = new PDFLoader(pdfBlob);
    const rawDocs = await pdfLoader.load();

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      chunkOverlap: 100,
    });

    const docs = await textSplitter.splitDocuments(rawDocs);

    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex,
    });
    await vectorStore.addDocuments(docs, namespace);

    res.status(200).json({
      status: "success",
      message: "pdf is uploaded successfully.",
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: `Error Occured , ${err}`,
    });
  }
};
