export default function Search({ setParPage, setSearchValue, searchValue }) {
  return (
    <div className='flex justify-between items-center'>
      <select
        onChange={(e) => setParPage(parseInt(e.target.value))}
        name=''
        id=''
        className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'
      >
        <option value='5'>5</option>
        <option value='10'>10</option>
        <option value='20'>20</option>
      </select>
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        type='text'
        placeholder='Search...'
        className='px-4 py-2 focus:border-indigo-500 outline-none bg-transparent border border-slate-700 rounded-md text-[#d0d2d6]'
      />
    </div>
  );
}
