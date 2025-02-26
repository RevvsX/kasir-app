import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MouseEventHandler, useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import CreateModal from "./CreateModal";
import { useRouter } from "next/router";
import PaginationComponent from "@/components/partials/PaginationComponent";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagenumber: string;
  pagelimit: string;
  pagecount: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pagenumber,
  pagelimit,
  pagecount
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const router = useRouter()

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  const pgSize = useMemo(() => [5, 10, 20, 30, 40, 50], []);

  useEffect(() => {
    table.setPageSize(Number(pagelimit))
    if (!pgSize.includes(parseInt(pagelimit as string))) {
      router.replace(
        {
          pathname: router.pathname,
          query: { ...router.query, pagelimit: 10, pagenumber },
        },
      );
    }
  }, [pagelimit, pagenumber, router, pgSize, table]);

  const previous: MouseEventHandler = (e) => {
    e.preventDefault();
    router.replace(
      {
        pathname: router.pathname,
        query: { ...router.query, pagelimit, pagenumber: parseInt(pagenumber) == 1 ? 1 : parseInt(pagenumber) - 1 },
      }
    );
  }

  const next: MouseEventHandler = (e) => {
    e.preventDefault();
    router.replace(
      {
        pathname: router.pathname,
        query: { ...router.query, pagelimit, pagenumber: parseInt(pagenumber) + 1 },
      },
    );
  }

  return (
    <div>
      <div className="flex justify-end">
        <CreateModal />
      </div>
      <div className="flex flex-col md:flex-row gap-2 justify-between items-center py-4">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              router.replace(
                {
                  pathname: router.pathname,
                  query: { ...router.query, pagelimit: value, pagenumber },
                },
              );
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pgSize.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Input
          placeholder="Filter category name..."
          onChange={(event) =>
            router.replace({
              pathname: router.pathname,
              query: { ...router.query, search: event.target.value, pagelimit, pagenumber }
            })
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between px-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground"></div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex w-[100px] items-center justify-center text-sm font-medium text-nowrap">
            Page {pagenumber} of{" "}
            {pagecount}
          </div>
          <PaginationComponent next={next} previous={previous} pagenumber={pagenumber}/>
        </div>
      </div>
    </div>
  );
}
