import { ColumnDef } from "@tanstack/react-table";
import CategoryColumnAction from "./CategoryColumnAction";
import i18n from "@/utils/i18n";

export type Category = {
  id: string;
  image: string;
  name: string;
};

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      return <div className='capitalize text-[10px] sm:text-xs lg:text-sm'>{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const value = row.getValue("image");
      return (
        <div className='w-20 sm:w-28'>
          <img src={value} alt='category image' className='w-full rounded h-24' />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const value = row.getValue("name") as string;
      return <div className='capitalize text-[10px] sm:text-xs lg:text-sm'>{value}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <CategoryColumnAction id={row.original._id} category={row.original} />;
    },
  },
];
