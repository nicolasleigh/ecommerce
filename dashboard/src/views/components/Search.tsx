import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Search({ setParPage, setSearchValue, searchValue }) {
  return (
    <div className='flex justify-between items-center'>
      <Select onValueChange={(value) => setParPage(parseInt(value))}>
        <SelectTrigger className='w-24'>
          <SelectValue />
        </SelectTrigger>
        <SelectContent className='min-w-0 w-24'>
          <SelectItem value='5'>5</SelectItem>
          <SelectItem value='10'>10</SelectItem>
          <SelectItem value='20'>20</SelectItem>
        </SelectContent>
      </Select>
      {/* <select
        onChange={(e) => setParPage(parseInt(e.target.value))}
        name=''
        id=''
        className='px-4 py-2  outline-none  border border-slate-700 rounded-md '
      >
        <option value='5'>5</option>
        <option value='10'>10</option>
        <option value='20'>20</option>
      </select> */}
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        type='text'
        placeholder='Search...'
        className='px-4 py-2  outline-none bg-transparent border border-slate-700 rounded-md '
      />
    </div>
  );
}
