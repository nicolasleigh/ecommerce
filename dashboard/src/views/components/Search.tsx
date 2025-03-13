import RowsPerPage from "@/components/tables/RowsPerPage";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Search({ setSearchValue, searchValue, table }) {
  return (
    <div className='flex justify-between items-center py-2'>
      <RowsPerPage table={table} />
      {/* <Select onValueChange={(value) => setPerPage(parseInt(value))}>
        <SelectTrigger className='w-24'>
          <SelectValue />
        </SelectTrigger>
        <SelectContent className='min-w-0 w-24'>
          <SelectItem value='5'>5</SelectItem>
          <SelectItem value='10'>10</SelectItem>
          <SelectItem value='20'>20</SelectItem>
        </SelectContent>
      </Select> */}

      <Input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        type='text'
        placeholder='Search...'
        className='max-w-52'
        // className='px-4 py-2  outline-none bg-transparent border rounded-md '
      />
    </div>
  );
}
