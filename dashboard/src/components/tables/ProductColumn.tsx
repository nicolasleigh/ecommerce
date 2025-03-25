import { ColumnDef } from "@tanstack/react-table";
import CategoryColumnAction from "./CategoryColumnAction";
import i18n from "@/utils/i18n";
import ProductColumnAction from "./ProductColumnAction";
import { getShortObjectID } from "@/utils/utils";
import { Badge } from "../ui/badge";

export type Product = {
  id: string;
  image: string;
  name: string;
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "number",
    header: "NO.",
    cell: ({ row }) => {
      return <div className='capitalize text-[10px] sm:text-xs lg:text-sm'>{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      const id = row.original._id;
      return <div className='capitalize text-[10px] sm:text-xs lg:text-sm'>{getShortObjectID(id)}</div>;
    },
  },
  // {
  //   accessorKey: "images",
  //   header: "Image",
  //   cell: ({ row }) => {
  //     const value = row.getValue("images");
  //     return (
  //       <div className='w-20 sm:w-28'>
  //         <img src={value} alt='category image' className='w-full rounded' />
  //       </div>
  //     );
  //   },
  // },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const value = row.getValue("name") as string;
      return <div className='capitalize text-[10px] sm:text-xs lg:text-sm'>{value}</div>;
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const value = row.getValue("category") as string;
      return <Badge className='uppercase font-light'>{value}</Badge>;
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const value = row.getValue("price") as string;
      return <div className='capitalize text-[10px] sm:text-xs lg:text-sm'>{value} ¥</div>;
    },
  },
  {
    accessorKey: "discount",
    header: "Discount",
    cell: ({ row }) => {
      const value = row.getValue("discount") as string;
      return <div className='capitalize text-[10px] sm:text-xs lg:text-sm'>{value} %</div>;
    },
  },
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }) => {
      const value = row.getValue("stock") as string;
      return <div className='capitalize text-[10px] sm:text-xs lg:text-sm'>{value}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <ProductColumnAction productId={row.original._id} />;
    },
  },
];
