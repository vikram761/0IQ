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
