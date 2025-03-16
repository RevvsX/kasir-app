import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";

export type UserColumn = {
  id: number;
  full_name: string;
  username: string;
  address: string;
  role: string;
  phone_number: string;
};

export const columns: ColumnDef<UserColumn>[] = [
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
    accessorKey: "full_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Full name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Username
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "phone_number",
    header: "Phone Number",
  },
  {
    header: "Action",
    id: "action",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <EditModal
            username={row.getValue("username")}
            full_name={row.getValue("full_name")}
            password=""
            address={row.getValue("address")}
            phone_number={row.getValue("phone_number")}
            role={row.getValue("role")}
            id={row.getValue("id")}
          />
          <DeleteModal id={row.getValue("id")} />
        </div>
      );
    },
  },
];
