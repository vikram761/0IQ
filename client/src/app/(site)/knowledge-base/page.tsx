"use client";
import TableList from "@/components/TableList";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Label } from "@/components/ui/label";

const Page = () => {
  const [name, setName] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  };
  return (
    <div className="w-full ">
      <div className="w-full flex justify-between px-12 mb-12">
        <h1 className="text-4xl font-bold">KnowLedge Base</h1>
        <Popover>
          <PopoverTrigger asChild>
            <Button>Add</Button>
          </PopoverTrigger>
          <PopoverContent className="w-xl bg-black">
            <form onSubmit={handleSubmit} className=" h-52">
              <Label className="text-white" htmlFor="name">
                Name
              </Label>
              <Input
                type="text"
                placeholder="joe"
                className="mb-4"
                id="name"
                value={name}
                onChange={(e: any) => setName(e.target.value)}
              />
              <Label className="text-white " htmlFor="file">
                File
              </Label>
              <Input
                type="file"
                className="mb-6"
                onChange={(e: any) => setFile(e.target.files[0])}
              />
              <Button type="submit" className="bg-white text-black">
                Submit
              </Button>
            </form>
          </PopoverContent>
        </Popover>
      </div>
      <TableList />
    </div>
  );
};

export default Page;
