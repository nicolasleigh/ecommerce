import RowsPerPage from "@/components/tables/RowsPerPage";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Search({ setSearchValue, searchValue, table, visible }) {
  return (
    <div className='flex justify-between items-center py-2'>
      <RowsPerPage table={table} />

      {visible ? (
        <Input
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          type='text'
          placeholder='Search...'
          className='max-w-52'
        />
      ) : null}
    </div>
  );
}
