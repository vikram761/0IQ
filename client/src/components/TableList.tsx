"use client";
import { FC } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { FaRegTrashAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface TableProps {}

let data = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Michael Johnson" },
  { id: 4, name: "Emily Brown" },
  { id: 5, name: "David Wilson" },
];

const TableList: FC<TableProps> = ({}) => {
  const router = useRouter();
  return (
    <div className="px-12">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">S.NO</TableHead>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead className=" w-[100px] text-right">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((example, idx) => (
            <TableRow key={example.id}>
              <TableCell className="font-medium">{idx + 1}</TableCell>
              <TableCell className="w-full">{example.name}</TableCell>
              <TableCell className="text-right grid justify-center">
                <FaRegTrashAlt
                  onClick={() => {
                    data = data.filter((temp) => {
                      return temp.id != example.id;
                    });
                    router.refresh();
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableList;
