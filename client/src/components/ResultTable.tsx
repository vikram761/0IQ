"use client";
import { FC, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import axios from "axios";
import { getSession } from "next-auth/react";
import { any, string } from "zod";

interface TableProps {}

interface Pinecone {
  id: string;
  name: string;
  key: string;
  onGoing: boolean;
}

const Resulttable: FC<TableProps> = ({}) => {
  const [data, setData] = useState<Pinecone[]>([]);
  useEffect(() => {
    const func = async () => {
      const session = await getSession();
      const id = session?.user.id;
      const res = await axios.get(
        `http://localhost:6969/api/teacher/getAllTests?userId=${id}`
      );
      let newData = res.data.data;
      newData = newData.map((data: any) => {
        return {
          id: data.id,
          key: data.key,
          name: data.name,
          onGoing: data.onGoing,
        };
      });
      console.log(newData);
      setData(newData);
    };
    func();
  }, []);
  return (
    <div className="px-12">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">S.NO</TableHead>
            <TableHead className="w-[100px]">Test Name</TableHead>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead className="w-[100px] text-right">Key</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((example, idx) => (
            <TableRow key={example.id}>
              <TableCell className="w-[100px] font-medium">{idx + 1}</TableCell>
              <TableCell className="w-[100px] ">{example.name}</TableCell>
              <TableCell className="w-[100px]">
                {example.onGoing === true ? "ongoing" : "closed"}
              </TableCell>
              <TableCell className="w-[100px] text-right">
                {example.key}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Resulttable;
