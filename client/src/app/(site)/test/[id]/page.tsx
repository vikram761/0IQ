"use client";

import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { Button } from "@/components/ui/button";

interface Question {
  id: number;
  question: string;
}

interface Answer {
  id: number;
  question: string;
  answer: string;
}

const Page = ({ params }: { params: { id: string } }) => {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [key, setKey] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [score, setScore] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    id: number,
    question: string
  ) => {
    const { value } = e.target;
    const index = answers.findIndex((answer) => answer.id === id);

    if (index !== -1) {
      const updatedAnswers = [...answers];
      updatedAnswers[index] = { ...updatedAnswers[index], answer: value };
      setAnswers(updatedAnswers);
    } else {
      setAnswers([...answers, { id, question, answer: value }]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await axios.post(
      "http://localhost:6969/api/student/uploadAnswer",
      {
        data: answers,
        id: params.id,
      }
    );

    console.log(res.data.scores);
    if (res.status != 200) {
      toast({
        description: "something went wrong",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Answer Uploaded",
      });
    }
    setScore(res.data.scores);
    setIsSubmitted(true);
  };

  const validateKey = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post("http://localhost:6969/api/student/matchKey", {
        id: params.id,
        key: parseInt(key),
      })
      .then((res) => {
        setQuestions(res.data.data);
        setOpen(!open);
      })
      .catch((e) => toast({ title: "Something Went Wrong" }));
    console.log(params.id);
  };

  return (
    <div>
      {open ? (
        <div className="flex justify-center items-center flex-col">
          <form
            className="border-0 border-black w-10/12"
            onSubmit={handleSubmit}
          >
            {questions?.map((question, idx) => (
              <div className="mb-5" key={idx}>
                <div className="mb-2">
                  <label htmlFor={`question-${question.id}`}>
                    {idx + 1}. {question.question}
                  </label>
                </div>
                <div>
                  <textarea
                    className=" border-2 border-black h-20 w-full p-1"
                    id={`question-${question.id}`}
                    value={
                      answers.find((answer) => answer.id === question.id)
                        ?.answer || ""
                    }
                    onChange={(e) =>
                      handleChange(e, question.id, question.question)
                    }
                  />
                </div>
              </div>
            ))}
            {isSubmitted == false ? (
              <Button
                type="submit"
                onClick={() => console.log("clicked")}
                size={"lg"}
              >
                Submit
              </Button>
            ) : (
              <Button type="submit" disabled size={"lg"}>
                Submit
              </Button>
            )}
          </form>
        </div>
      ) : (
        <div className="flex justify-center items-center gap-3 h-1/2">
          <div>
            <input
              className="border-2 border-black p-1"
              placeholder="TEST KEY"
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
          </div>
          <div>
            <button
              onClick={validateKey}
              className="border-2 bg-black text-white rounded border-black p-1"
            >
              Enter Test
            </button>
          </div>
        </div>
      )}
      <div className="text-lg w-full flex justify-center mt-12 mb-12">
        {isSubmitted
          ? `The Total Score is ${
              parseInt(score[0]) + parseInt(score[1]) + parseInt(score[2])
            } / 15.`
          : ``}
      </div>
    </div>
  );
};

export default Page;
