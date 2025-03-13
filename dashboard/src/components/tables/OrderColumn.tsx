import { ColumnDef } from "@tanstack/react-table";
import CategoryColumnAction from "./CategoryColumnAction";
import i18n from "@/utils/i18n";
import OrderColumnAction from "./OrderColumnAction";
import { Button } from "../ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";

export type Order = {
  id: string;
  image: string;
  name: string;
};

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      return <div className='capitalize text-[10px] sm:text-xs lg:text-sm'>{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "name",
    header: "Product Name",
    cell: ({ row }) => {
      const value = row.getValue("name") as string;
      return <div className='capitalize text-[10px] sm:text-xs lg:text-sm'>{value}</div>;
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => {
      const value = row.getValue("quantity") as string;
      return <div className='capitalize text-[10px] sm:text-xs lg:text-sm'>{value}</div>;
    },
  },
  {
    accessorKey: "price",
    header: "Total Price",
    cell: ({ row }) => {
      const price = row.getValue("price") as string;
      const quantity = row.getValue("quantity") as string;
      let totalPrice = price;
      if (quantity) {
        totalPrice = parseInt(price) * parseInt(quantity) + "";
      }
      return <div className='capitalize text-[10px] sm:text-xs lg:text-sm'>{totalPrice} ¥</div>;
    },
  },
  {
    accessorKey: "paymentStatus",
    header: "Status",
    cell: ({ row }) => {
      const value = row.getValue("paymentStatus") as string;
      return <div className='capitalize text-[10px] sm:text-xs lg:text-sm'>{value}</div>;
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const value = row.getValue("date") as string;
      return <div className='capitalize text-[10px] sm:text-xs lg:text-sm'>{value}</div>;
    },
  },
  {
    header: "Expand",
    cell: ({ row }) => {
      return row.getCanExpand() ? (
        <Button onClick={row.getToggleExpandedHandler()} variant='ghost' className='p-1 h-6'>
          {row.getIsExpanded() ? <ChevronDown /> : <ChevronRight />}
        </Button>
      ) : (
        ""
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <OrderColumnAction orderId={row.original._id} />;
    },
  },
];
