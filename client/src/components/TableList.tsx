"use client";
import { Dispatch, FC, SetStateAction } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { FaRegTrashAlt } from "react-icons/fa";
import axios from "axios";
import { useToast } from "./ui/use-toast";

interface space {
  id: string;
  name: string;
  authorId: string;
}

interface TableProps {
  data: space[];
  setData: Dispatch<SetStateAction<space[]>>;
  userId: string;
}

const TableList: FC<TableProps> = ({ data, setData, userId }) => {
  const { toast } = useToast();
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
          {data.map((space: space, idx: number) => (
            <TableRow key={idx}>
              <TableCell className="font-medium">{idx + 1}</TableCell>
              <TableCell className="w-full">{space.name}</TableCell>
              <TableCell className="text-right grid justify-center">
                <FaRegTrashAlt
                  onClick={async () => {
                    try {
                      await axios.delete(
                        `http://localhost:6969/api/teacher/deleteSpace?userId=${userId}&name=${space.name}`
                      );
                      const newData = data.filter((temp) => {
                        return temp.id != space.id;
                      });
                      toast({
                        description: "Deleted the space Successfully",
                      });
                      setData(newData);
                    } catch (err) {
                      toast({
                        description: "Something went wrong",
                        variant: "destructive",
                      });
                      console.error(err);
                    }
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
