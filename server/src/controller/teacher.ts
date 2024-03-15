import { PineconeStore } from "@langchain/pinecone";
import { Request, Response } from "express";
import { embeddings, openai, pineconeIndex } from "../libs/constants";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PromptTemplate } from "@langchain/core/prompts";
import { LLMChain } from "langchain/chains";

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
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const docs = await textSplitter.splitDocuments(rawDocs);

    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex,
      namespace,
    });
    await vectorStore.addDocuments(docs);

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

    const prompt = new PromptTemplate({
      inputVariables: ["question", "context", "marks"],
      template: `You are an AI assistant tasked with answering questions based on a given context.

      Question: {question}
      Marks: {marks}
      Context: {context}

      Answer the question for the specified marks using the provided context. If the context does not contain enough information to answer the question, respond with "Insufficient information to answer t      he question.The size of the answer will depend on the marks allocated to the question . for example if marks is 10 the answer should be greater than 200 words and for 20 marks the answer should be greater than 400 word"`,
    });

    const chain = new LLMChain({
      llm: openai,
      prompt: prompt,
    });

    const data = await chain.invoke({ question, marks, context });

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
