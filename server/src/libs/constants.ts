import { OpenAI } from "@langchain/openai";
import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { LlamaCpp } from "@langchain/community/llms/llama_cpp";

// export const openai = new OpenAI({
//   modelName: "gpt-3.5-turbo-instruct",
//   temperature: 0.9,
//   openAIApiKey: process.env.OPENAI_API_KEY,
//    maxTokens: 3596
// });
//
export const llama = new LlamaCpp({
  modelPath : ""
})

export const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: "text-embedding-3-large",
  dimensions: 1536,
});

export const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

export const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX!);
