import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye } from "lucide-react";
import { UserColumn } from "../user-management/columns";
import { MemberColumn } from "../member-management/columns";
import Link from "next/link";
import DeleteModal from "./DeleteModal";

export type TransactionHistoryColumn = {
  id: number;
  user: UserColumn;
  member: MemberColumn;
  ppn: number;
  discount: number;
  total_price: number;
  fixed_total_price: number;
  money_paid: number;
  change: number;
  created_at: string;
};

const formatter = new Intl.DateTimeFormat("id-ID", {
  year: "numeric",
  month: "long",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});

export const columns: ColumnDef<TransactionHistoryColumn>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          No
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({row})=>{
      return row.index + 1
    }
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({row})=>{
      return formatter.format(Date.parse(row.getValue("created_at")))
    }
  },
  {
    accessorKey: "member.name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Member Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({row})=>{
      if(row.getValue("member_name") != undefined){
        return row.getValue("member_name")
      }else{
        return "Guest"
      }
    }
  },
  {
    accessorKey: "user.full_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Creator
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "fixed_total_price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fixed Total Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({row})=>{
      return parseInt(row.getValue("fixed_total_price") as string).toLocaleString("id-ID", {style: "currency", currency: "IDR"})
    }
  },
  {
    accessorKey: "money_paid",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Money Paid
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({row})=>{
      return parseInt(row.getValue("money_paid") as string).toLocaleString("id-ID", {style: "currency", currency: "IDR"})
    }
  },
  {
    header: "Action",
    id: "action",
    cell: ({ row }) => {
      return (
       
        <div className="flex gap-2">
          <Button asChild className="bg-blue-500">
            <Link href={`/transactions/cashier/invoice/${row.getValue("id")}`}><Eye/></Link>
          </Button>
          <DeleteModal id={row.getValue("id")}/>
        </div>
      );
    },
  },
];
