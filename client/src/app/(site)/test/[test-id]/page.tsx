import AutosizeTextareaForm from "@/components/AutosizeTextareaForm";

const Page = () => {
  const myData = [
    {
      id: 1,
      question: "Who are you?",
    },
    {
      id: 2,
      question: "why are you gay?",
    },
  ];
  return <AutosizeTextareaForm questions={myData} />;
};

export default Page;
