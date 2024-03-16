"use client";
import TableList from "@/components/TableList";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

interface space {
  id: string;
  name: string;
  authorId: string;
}

const Page = () => {
  const [name, setName] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<space[]>([]);

  const { toast } = useToast();
  const userId = "cbf77fc0-e518-47bc-a5f6-50015ff27a06";

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await axios.get(
          `http://localhost:6969/api/teacher/getAllSpaces?userId=${userId}`
        );
        if (res.status == 200) {
          console.log(res.data);
          setData(res.data.message);
        } else throw new Error("Something went wrong.");
      };
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      if (!file) throw new Error("File Not Found");

      const formData = new FormData();
      formData.append("pdf", file);
      formData.append("namespace", name);
      formData.append("userId", userId);
      const result = await axios.post(
        "http://localhost:6969/api/teacher/upload-file",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("result ", result);

      if (result.status == 200) {
        toast({
          title: "File Uploaded",
        });
        setData((prev) => [...prev, result.data.data]);
      } else {
        toast({
          title: "File Not Uploaded",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Something Went Wrong",
        variant: "destructive",
      });
    }
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
      <TableList data={data} setData={setData} userId={userId} />
    </div>
  );
};

export default Page;
