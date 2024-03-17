"use client";
import TableList from "@/components/ResultTable";

const Page = () => {
  return (
    <div className="w-full ">
      <div className="w-full flex justify-between px-12 mb-12">
        <h1 className="text-4xl font-bold">Results of Past Test</h1>
      </div>
      <TableList />
    </div>
  );
};

export default Page;
