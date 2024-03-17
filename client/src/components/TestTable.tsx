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
import { useToast } from "./ui/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

interface TestTableProps {}

interface Test {
  id: string;
  name: string;
  onGoing: boolean;
  author: {
    user: {
      institute: string;
    };
  };
}

const TableList: FC<TestTableProps> = () => {
  const [data, setData] = useState<Test[]>([]);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const func = async () => {
      const res = await axios.get(
        "http://localhost:6969/api/student/getAllTests"
      );
      if (res.status != 200) {
        toast({
          description: "Something went wrong!",
          variant: "destructive",
        });
      } else {
        setData(res.data.tests);
      }
    };
    func();
  }, []);
  return (
    <div className="px-12">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">S.NO</TableHead>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead className="w-[200px] ">Institute</TableHead>
            <TableHead className=" w-[100px] text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((space: Test, idx: number) => (
            <TableRow
              key={idx}
              onClick={() => router.push(`/test/${space.id}`)}
            >
              <TableCell className="font-medium">{idx + 1}</TableCell>
              <TableCell className="">{space.name}</TableCell>
              <TableCell className=" truncate ">
                {space.author.user.institute}
              </TableCell>
              <TableCell className="text-right">
                {space.onGoing ? "onGoing" : "Closed"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableList;
