import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import DeleteModal from "./DeleteModal";
import { Category } from "@prisma/client";
import EditModal from "./EditModal";

export type Column = {
  id: number;
  category: Category;
  event_name: string;
  discount: number;
  minimal_purchase_price: number;
  start_date: string;
  end_date: string;
};

const formatter = new Intl.DateTimeFormat("id-ID", {
  year: "numeric",
  month: "long",
  day: "2-digit",
});

export const columns: ColumnDef<Column>[] = [
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
    accessorKey: "event_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Event Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({row})=>{
      return (row.getValue("category") as {category_name: string}).category_name
    }
  },
  {
    accessorKey: "discount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Discount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({row})=>{
      return row.getValue("discount")+"%"
    }
  },
  {
    accessorKey: "minimal_purchase_price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Minimal Purchase Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({row})=>{
      return parseInt(row.getValue("minimal_purchase_price") as string).toLocaleString("id-ID", {style: "currency", currency: "IDR"})
    }
  },
  {
    accessorKey: "start_date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Start Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({row})=>{
      return formatter.format(Date.parse(row.getValue("start_date")))
    }
  },
  {
    accessorKey: "end_date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          End Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({row})=>{
      return formatter.format(Date.parse(row.getValue("end_date")))
    }
  },
  {
    header: "Action",
    id: "action",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <EditModal id={row.getValue("id")} category={(row.getValue("category") as { id: number }).id.toString()} event_name={row.getValue("event_name")} discount={row.getValue("discount")} minimal_purchase_price={row.getValue("minimal_purchase_price")} start_date={row.getValue("start_date")} end_date={row.getValue("end_date")}  />
          <DeleteModal id={row.getValue("id")} />
        </div>
      );
    },
  },
];
