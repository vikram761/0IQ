"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import * as React from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "react-toastify"; // Importing toast from react-toastify
import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { LoadingButton } from "@/components/ui/loading-button";

const FormSchema = z.object({
  bio: z.string().min(10, {
    message: "Bio must be at least 10 characters.",
  }),
});

const DEFAULT_VALUE = {
  bio: "",
};

export interface Question {
  id: number;
  question: string;
}

interface Props {
  questions: Question[];
}

const AutosizeTextareaForm: React.FC<Props> = ({ questions }) => {
  const [loading, setLoading] = React.useState(false);
  const [answers, setAnswers] = React.useState<{ [key: number]: string }>({});

  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: DEFAULT_VALUE,
    resolver: zodResolver(FormSchema),
  });

  const handleSubmit = (questionId: number) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.success(`You have submitted an answer for question ${questionId}`);
    }, 500);
  };

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    questionId: number,
  ) => {
    const { value } = event.target;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  return (
    <>
      {questions.map((question) => (
        <Form key={question.id} {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit(() => handleSubmit(question.id))(e);
            }}
            className="w-2/3 space-y-6"
          >
            <FormField
              name={`bio_${question.id}`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={`bio_${question.id}`}>
                    {question.question}
                  </FormLabel>
                  <AutosizeTextarea
                    id={`bio_${question.id}`}
                    {...field}
                    value={answers[question.id] || ""}
                    onChange={(event) =>
                      handleTextareaChange(event, question.id)
                    }
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton loading={loading} type="submit">
              Submit
            </LoadingButton>
          </form>
        </Form>
      ))}
    </>
  );
};

export default AutosizeTextareaForm;
