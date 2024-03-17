"use client";
import Input from "@/components/Input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface question {
  question: {
    question1: string;
    question2: string;
    question3: string;
  };
  answer: {
    answer1: string;
    answer2: string;
    answer3: string;
  };
}

const Page = () => {
  const [userId, setUserId] = useState("");
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [base, setBase] = useState("");
  const router = useRouter();
  const [questions, setQuestions] = useState<question>({
    question: {
      question1: "",
      question2: "",
      question3: "",
    },
    answer: {
      answer1: "",
      answer2: "",
      answer3: "",
    },
  });

  useEffect(() => {
    const func = async () => {
      const data = await getSession();
      if (!data || !data.user) router.push("/dashboard");
      const id = data?.user.id;
      setUserId(id!);
    };
    func();
  }, []);
  return (
    <div className="w-full  ">
      <div className="px-8 max-w-5xl ">
        <h1 className="text-4xl font-bold mb-4">Create Test</h1>
        <div className="flex flex-col gap-6">
          <Input
            value={name}
            onChange={(e: any) => {
              setName(e.target.value);
            }}
            type="text"
            label="Enter TestName"
            placeholder="Name"
          />
          <Input
            value={base}
            onChange={(e: any) => setBase(e.target.value)}
            type="text"
            label="Enter KnowledgeBase Name"
            placeholder="Base"
          />
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 items-end justify-between">
              <div className="w-full ">
                <Input
                  value={questions.question.question1}
                  onChange={(e: any) =>
                    setQuestions((prev) => {
                      return {
                        ...prev,
                        question: {
                          ...prev.question,
                          question1: e.target.value,
                        },
                      };
                    })
                  }
                  type="text"
                  label="Question 1"
                  placeholder="question 1"
                />
              </div>
              <Button
                onClick={async () => {
                  try {
                    const res = await axios.post(
                      "http://localhost:6969/api/teacher/generate-answer",
                      {
                        question: questions.question.question1,
                        namespace: base,
                        marks: 5,
                        userId,
                      }
                    );
                    if (res.status != 200) {
                      throw new Error("Error occurred");
                    }
                    console.log(res);
                    setQuestions((prev) => {
                      return {
                        ...prev,
                        answer: {
                          ...prev.answer,
                          answer1: res.data.message.text,
                        },
                      };
                    });
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                generate
              </Button>
            </div>
            <textarea
              className="border border-zinc-400 px-4 py-2 rounded-md resize-none h-60 "
              placeholder="Enter your answer here..."
              value={questions.answer.answer1}
              onChange={(e: any) => {
                setQuestions((prev) => {
                  return {
                    ...prev,
                    answer: { ...prev.answer, answer1: e.target.value },
                  };
                });
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 items-end justify-between">
              <div className="w-full ">
                <Input
                  value={questions.question.question2}
                  onChange={(e: any) =>
                    setQuestions((prev) => {
                      return {
                        ...prev,
                        question: {
                          ...prev.question,
                          question2: e.target.value,
                        },
                      };
                    })
                  }
                  type="text"
                  label="Question 2"
                  placeholder="question 2"
                />
              </div>
              <Button
                onClick={async () => {
                  try {
                    const res = await axios.post(
                      "http://localhost:6969/api/teacher/generate-answer",
                      {
                        question: questions.question.question2,
                        namespace: base,
                        marks: 5,
                        userId,
                      }
                    );
                    if (res.status != 200) {
                      throw new Error("Error occurred");
                    }
                    console.log(res);
                    setQuestions((prev) => {
                      return {
                        ...prev,
                        answer: {
                          ...prev.answer,
                          answer2: res.data.message.text,
                        },
                      };
                    });
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                generate
              </Button>
            </div>
            <textarea
              className="border border-zinc-400 px-4 py-2 rounded-md h-60"
              placeholder="Enter your answer here..."
              value={questions.answer.answer2}
              onChange={(e: any) => {
                setQuestions((prev) => {
                  return {
                    ...prev,
                    answer: { ...prev.answer, answer2: e.target.value },
                  };
                });
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 items-end justify-between">
              <div className="w-full ">
                <Input
                  value={questions.question.question3}
                  onChange={(e: any) =>
                    setQuestions((prev) => {
                      return {
                        ...prev,
                        question: {
                          ...prev.question,
                          question3: e.target.value,
                        },
                      };
                    })
                  }
                  type="text"
                  label="Question 3"
                  placeholder="question 3"
                />
              </div>
              <Button
                onClick={async () => {
                  try {
                    const res = await axios.post(
                      "http://localhost:6969/api/teacher/generate-answer",
                      {
                        question: questions.question.question3,
                        namespace: base,
                        marks: 5,
                        userId,
                      }
                    );
                    if (res.status != 200) {
                      throw new Error("Error occurred");
                    }
                    console.log(res);
                    setQuestions((prev) => {
                      return {
                        ...prev,
                        answer: {
                          ...prev.answer,
                          answer3: res.data.message.text,
                        },
                      };
                    });
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                generate
              </Button>
            </div>
            <textarea
              className="border border-zinc-400 px-4 py-2 rounded-md h-60"
              placeholder="Enter your answer here..."
              value={questions.answer.answer3}
              onChange={(e: any) => {
                setQuestions((prev) => {
                  return {
                    ...prev,
                    answer: { ...prev.answer, answer3: e.target.value },
                  };
                });
              }}
            />
          </div>
        </div>
        {userId === "" ? (
          <Button disabled className="mt-4 mb-16" size={"lg"}>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button
            size={"lg"}
            onClick={async () => {
              try {
                const res = await axios.post(
                  "http://localhost:6969/api/teacher/create-test",
                  {
                    name,
                    base,
                    QandA: questions,
                    userId,
                  }
                );
                if (res.status != 200) {
                  throw new Error("Error occured");
                }
                console.log(res);
                toast({
                  description: "Test has created successfully",
                });
                router.push("/showTest");
              } catch (err) {
                toast({
                  description: "Ughh! Something went wrong",
                  variant: "destructive",
                });
                console.error(err);
              }
            }}
            className="mt-4 mb-16"
          >
            SUBMIT
          </Button>
        )}
      </div>
    </div>
  );
};

export default Page;
