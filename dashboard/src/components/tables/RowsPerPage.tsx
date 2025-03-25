import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const rowArray = [2, 5, 10];

export default function RowsPerPage({ table }) {
  return (
    <div className='flex items-center space-x-2'>
      <Select
        value={`${table.getState().pagination.pageSize}`}
        onValueChange={(value) => {
          table.setPageSize(Number(value));
        }}
      >
        <SelectTrigger className=' w-20'>
          <SelectValue placeholder={table.getState().pagination.pageSize} />
        </SelectTrigger>
        <SelectContent side='top' className='min-w-0'>
          {rowArray.map((pageSize) => (
            <SelectItem key={pageSize} value={`${pageSize}`}>
              {pageSize}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
