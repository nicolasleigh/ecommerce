import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Search from "@/views/components/Search";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { DataTablePagination } from "./Pagination";
import { cn } from "@/lib/utils";
// import useWindowSize from "@/hooks/useWindowSize";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  setSearchValue,
  searchValue,
  showSearch = false,
  initialPageSize = 10,
}: DataTableProps<TData, TValue>) {
  // const windowSize = typeof window !== "undefined" ? useWindowSize() : false;

  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: initialPageSize, //default page size
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    getExpandedRowModel: getExpandedRowModel(),
    getSubRows: (row) => row.products,
    // getRowCanExpand: (row) => row.products?.length !== 0,
    // getRowCanExpand: (row) => true,
    state: {
      pagination,
      // columnVisibility: {
      //   status: windowSize !== "sm",
      // },
    },
  });
  const { t } = useTranslation();

  return (
    <div className='px-1'>
      <Search table={table} setSearchValue={setSearchValue} searchValue={searchValue} visible={showSearch} />

      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  // console.log(header);
                  return (
                    <TableHead key={header.id} className='px-1 first-of-type:pl-1 sm:first-of-type:pl-4'>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.id !== "actions" && t(header.column.columnDef.header as string),
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
                <TableRow key={row.id} className={cn(row.getCanExpand() && "bg-secondary hover:bg-secondary")}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell key={cell.id} className='pt-2 pb-2 px-1 first-of-type:pl-1 sm:first-of-type:pl-4'>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  {t("No results.")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end gap-2 mt-4'>
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
