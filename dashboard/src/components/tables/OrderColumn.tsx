import { ColumnDef } from "@tanstack/react-table";
import CategoryColumnAction from "./CategoryColumnAction";
import i18n from "@/utils/i18n";
import OrderColumnAction from "./OrderColumnAction";
import { Button } from "../ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";
import { getShortObjectID } from "@/utils/utils";
import { Badge } from "../ui/badge";
import moment from "moment";

export type Order = {
  id: string;
  image: string;
  name: string;
};

export const columns: ColumnDef<Order>[] = [
  // {
  //   accessorKey: "number",
  //   header: "NO.",
  //   cell: ({ row }) => {
  //     return <div className='capitalize text-[10px] sm:text-xs lg:text-sm'>{row.index + 1}</div>;
  //   },
  // },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      const value = row.original._id;
      const id = getShortObjectID(value);
      return <div className='capitalize text-[10px] sm:text-xs lg:text-sm'>{id}</div>;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const productName = row.getValue("name") as string;
      const customerName = row.original.shippingInfo?.name;
      return (
        <div className='capitalize text-[10px] lg:w-20 sm:text-xs lg:text-sm'>
          {productName ? productName : customerName}
        </div>
      );
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
      return <div className='capitalize text-[10px] max-sm:w-16 sm:text-xs lg:text-sm'>{totalPrice} ¥</div>;
    },
  },
  {
    accessorKey: "paymentStatus",
    header: "Status",
    cell: ({ row }) => {
      const value = row.getValue("paymentStatus") as string;
      if (!value) return null;
      return <Badge className='uppercase font-light'>{value}</Badge>;
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const value = row.getValue("date") as string;
      const formatted = moment(value).format("lll");
      return <div className='capitalize text-[10px] max-sm:w-20 sm:text-xs lg:text-sm'>{formatted}</div>;
    },
  },
  {
    // header: "Expand",
    id: "expand",
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
      const isProduct = row.depth === 1;
      return <OrderColumnAction orderId={row.original._id} isProduct={isProduct} />;
    },
  },
];
