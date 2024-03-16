import { PineconeStore } from "@langchain/pinecone";
import { Request, Response } from "express";
import { embeddings, openai, pineconeIndex } from "../libs/constants";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PromptTemplate } from "@langchain/core/prompts";
import { LLMChain } from "langchain/chains";
import prisma from "../libs/db";
import { Pinecone } from "@pinecone-database/pinecone";

export const uploadFile = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      throw new Error("PDF File not found.");
    }
    if (!req.body.namespace) {
      throw new Error("namespace not found.");
    }
    const { namespace, userId } = req.body;

    const space = await prisma.pinecone.findFirst({
      where: {
        AND: [
          {
            authorId: userId,
          },
          {
            name: namespace,
          },
        ],
      },
    });

    if (space) {
      throw new Error("space already exists");
    }
    const space_name = namespace + "-" + userId;

    const pdfBuffer = req.file.buffer;
    const pdfBlob = new Blob([pdfBuffer], { type: "application/pdf" });

    const pdfLoader = new PDFLoader(pdfBlob);
    const rawDocs = await pdfLoader.load();

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const docs = await textSplitter.splitDocuments(rawDocs);

    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex,
      namespace: space_name,
    });
    await vectorStore.addDocuments(docs);

    const result = await prisma.teacher.update({
      where: {
        id: userId,
      },
      data: {
        pinecones: {
          create: {
            name: namespace,
          },
        },
      },
    });
    console.log(result);
    res.status(200).json({
      status: "success",
      message: "pdf is uploaded successfully.",
      data: result,
      name: namespace,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: `Error Occured , ${err}`,
    });
  }
};

export const createTest = async (req: Request, res: Response) => {
  try {
    const { name, description, data } = req.body;
    const roomKey = Math.floor(Math.random() * 900000) + 100000;
    const testData = { name, testKey: roomKey };
    res.status(200).json({
      status: "success",
      message: "Test has been created successfully",
      testData,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: `Error Occured ${err}`,
    });
  }
};

export const generateAnswer = async (req: Request, res: Response) => {
  try {
    const { question, namespace, marks } = req.body;
    if (!question) throw new Error("Question is not present");
    if (!namespace) throw new Error("No namespace");
    if (!marks) throw new Error("No marks");

    const vectorStore = new PineconeStore(embeddings, {
      pineconeIndex,
      namespace,
    });
    const results = await vectorStore.similaritySearch(question, 5);
    let context = "";
    results.forEach((res) => {
      context += res.pageContent;
    });

    let words;

    if (marks == 5) {
      words = 100;
    } else if (marks == 10) {
      words = 200;
    } else {
      words = 400;
    }

    const prompt = new PromptTemplate({
      inputVariables: ["question", "context", "marks", "words"],
      template: `You are an AI assistant tasked with answering questions based on a given context.

      Question: {question}
      Marks: {marks}
      Context: {context}

      Answer the question for the specified marks using the provided context.Length of the words should be atleast {words} words If the context does not contain enough information to answer the question, respond with "Insufficient data" . `,
    });

    const chain = new LLMChain({
      llm: openai,
      prompt: prompt,
    });

    const data = await chain.invoke({ question, marks, context, words });

    res.status(200).json({
      status: "success",
      message: data,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: `Error Occured ${err}`,
    });
  }
};

export const getAllSpaces = async (req: Request, res: Response) => {
  try {
    const id = req.query.userId;
    if (!id) throw new Error("No Query Id");
    const userId: string = id as string;

    const data = await prisma.pinecone.findMany({
      where: {
        authorId: userId,
      },
    });
    res.status(200).json({ status: "success", message: data });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: `Error occured : ${err} `,
    });
  }
};

export const deleteSpace = async (req: Request, res: Response) => {
  try {
    const id = req.query.userId as string;
    const name = req.query.name as string;
    if (!id) throw new Error("No Query Id");
    const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
    const index = pc.index(process.env.PINECONE_INDEX!);

    await index.namespace(`${name}-${id}`).deleteAll();
    await prisma.pinecone.deleteMany({
      where: {
        AND: [
          {
            authorId: id as string,
          },
          {
            name,
          },
        ],
      },
    });
    res.status(200).json({
      status: "success",
      messae: "Pinecone index has been deleted.",
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: `Error occured : ${err} `,
    });
  }
};
