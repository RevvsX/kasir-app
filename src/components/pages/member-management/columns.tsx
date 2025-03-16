import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";

export type MemberColumn = {
  id: number;
  name: string;
  address: string;
  phone_number: string;
};

export const columns: ColumnDef<MemberColumn>[] = [
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
    cell: ({ row }) => {
      return row.index + 1
    }
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "address",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Address
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "phone_number",
    header: "Phone number",
  },
  {
    header: "Action",
    id: "action",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <EditModal
            id={row.getValue("id")}
            name={row.getValue("name")}
            address={row.getValue("address")}
            phone_number={row.getValue("phone_number")}
          />
          <DeleteModal id={row.getValue("id")} />
        </div>
      );
    },
  },
];
