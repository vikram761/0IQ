import { PromptTemplate } from "@langchain/core/prompts";
import { OpenAI } from "@langchain/openai";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

export const getAllTests = async (req: Request, res: Response) => {
  try {
    const tests = await prisma?.test.findMany({
      select: {
        id: true,
        name: true,
        onGoing: true,
        author: {
          select: {
            user: {
              select: {
                institute: true,
              },
            },
          },
        },
      },
    });
    res.status(200).json({
      status: "success",
      tests: tests,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: `Error occured : ${err}`,
    });
  }
};

export const matchKey = async (req: Request, res: Response) => {
  try {
    const { id, key } = req.body;
    const data = await prisma?.test.findUnique({
      where: {
        id: id,
      },
    });
    if (!data) throw new Error("test not found");

    if (data.key != key) throw new Error("Key mismatch");

    const question = JSON.parse(data.answer as string)["question"];

    const result = [
      {
        id: uuidv4(),
        question: question["question1"],
      },
      {
        id: uuidv4(),
        question: question["question2"],
      },
      {
        id: uuidv4(),
        question: question["question3"],
      },
    ];

    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      error: `Error Occured : ${err}`,
    });
  }
};

interface Temp {
  question: string;
  answer: string;
  id: string;
}

export const uploadAnswer = async (req: Request, res: Response) => {
  try {
    const { data, id } = req.body;
    const written_answers = data.map((temp: any) => {
      return {
        answer: temp.answer,
      };
    });

    const answer = await prisma?.test.findUnique({
      where: {
        id: id,
      },
      select: {
        answer: true,
      },
    });
    const actual_answers: any = JSON.parse(answer?.answer as string)["answer"];

    const template = `
You are an AI assistant tasked with grading test answers. You will be provided with two inputs:

your output should be only like "SCORE :'NUMBER'" where the number value can flutter between 0 to 5.fell free to reduce the marks if written answer is some what wrong or incorrect or irrelevant.

1. The actual answer to the test question.
2. The student's written answer to the test question.

Your task is to compare the student's written answer with the actual answer and assign a score from 0 to 5, based on the following rubric:

5 - The student's answer is completely correct and accurately captures all essential points.
4 - The student's answer is mostly correct, with only minor inaccuracies or omissions.
3 - The student's answer is partially correct, but contains some significant inaccuracies or omissions.
2 - The student's answer shows some understanding of the topic, but is largely inaccurate or incomplete.
1 - The student's answer demonstrates minimal understanding of the topic.
0 - The student's answer is entirely incorrect or unrelated to the question.

Actual Answer: {actual_answer}

Student's Written Answer: {student_answer}

Your output should be a single number from 0 to 5, representing the score you assign to the student's answer based on the rubric.

Remember to evaluate the answer objectively and consistently, without any bias or preconceived notions.
`;

    const prompt = new PromptTemplate({
      template,
      inputVariables: ["actual_answer", "student_answer"],
    });

    const llm = new OpenAI({ temperature: 0, maxTokens: 1000 });

    const scores = [];

    for (let i = 0; i < 3; i++) {
      const actualAnswer = actual_answers["answer" + `${i + 1}`];
      const studentAnswer = written_answers[i].answer;
      const formattedPrompt = await prompt.format({
        actual_answer: actualAnswer,
        student_answer: studentAnswer,
      });
      const output = await llm.invoke([formattedPrompt]);
      console.log(output);
      const score = `${output}`[output.length - 1];
      console.log(score);
      scores.push(score);
    }

    res.json({ scores });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      error: `error ${err}`,
    });
  }
};
