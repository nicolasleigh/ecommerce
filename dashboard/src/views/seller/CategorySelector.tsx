// import { useState } from "react";

// export default function CategorySelector({ value, setValue, onSelect, onSelectObj, selectedObj }) {
//   const [profiles, setProfiles] = useState([]);

//   const { handleSearch, resetSearch } = useSearch();
//   const { t } = useTranslation();

//   const [displaySearch, setDisplaySearch] = useState(false);
//   const [focusedIndex, setFocusedIndex] = useState(-1);
//   // const [selectRes, setSelectRes] = useState("");

//   const handleOnFocus = () => {
//     if (results.length) setDisplaySearch(true);
//   };

//   const closeSearch = () => {
//     setDisplaySearch(false);
//     setFocusedIndex(-1);
//   };

//   const handleOnBlur = () => {
//     setTimeout(() => {
//       closeSearch();
//     }, 1000);
//   };

//   const handleSelection = (selectedItem) => {
//     if (selectedItem) {
//       onSelectObj(selectedItem);
//       // form.onChange(selectedItem);
//       // form.setValue(name, selectedItem);
//       onSelect(selectedItem);
//       closeSearch();
//     }
//   };

//   const handleKeyDown = ({ key }) => {
//     // console.log(key);
//     let nextCount;
//     const keys = ["ArrowDown", "ArrowUp", "Enter", "Escape", "Backspace"];
//     if (!keys.includes(key)) return;

//     // move selection up and down
//     if (key === "ArrowDown") {
//       nextCount = (focusedIndex + 1) % results.length;
//     }
//     if (key === "ArrowUp") {
//       nextCount = (focusedIndex + results.length - 1) % results.length;
//     }
//     if (key === "Backspace") return closeSearch();

//     if (key === "Enter") return handleSelection(results[focusedIndex]);

//     setFocusedIndex(nextCount);
//   };

//   const getInputStyle = () => {
//     return inputStyle ? inputStyle : commonInputClasses + " border-2 rounded p-1 text-lg";
//   };

//   useEffect(() => {
//     if (results.length) return setDisplaySearch(true);
//     setDisplaySearch(false);
//   }, [results.length]);

//   const handleOnChange = ({ target }) => {
//     const { value } = target;
//     setValue(value);
//     handleSearch(searchActor, value, [], setProfiles);
//   };

//   const handleOnSelect = (profile) => {
//     setValue("");
//     updateWriter(profile);
//     onSelect(profile?.id);
//     setProfiles([]);
//     resetSearch();
//   };
//   return (
//     <div className='relative'>
//       <div className='has-[:focus-visible]:outline-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-neutral-950 has-[:focus-visible]:ring-offset-2 dark:has-[:focus-visible]:ring-neutral-300 min-h-10 flex w-full flex-wrap gap-2 rounded-md border px-3 py-2 text-sm ring-offset-white  disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 '>
//         {selectedObj && (
//           <Badge variant='secondary'>
//             {selectedObj.name}
//             <Button
//               variant='ghost'
//               size='icon'
//               className='ml-2 h-3 w-3'
//               type='button'
//               onClick={() => {
//                 onUpdate("");
//                 setValue("");
//                 onSelectObj("");
//                 onSelect("");
//               }}
//             >
//               <XIcon className='w-3' />
//             </Button>
//           </Badge>
//         )}
//         <input
//           type='text'
//           id={name}
//           name={name}
//           // className={getInputStyle()}
//           // className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
//           className='flex-1 outline-none bg-transparent placeholder:text-muted-foreground md:text-sm w-full'
//           placeholder={!!selectedObj ? "" : placeholder}
//           onFocus={handleOnFocus}
//           onBlur={handleOnBlur}
//           onKeyDown={handleKeyDown}
//           value={!!selectedObj ? "" : value}
//           onChange={onChange}
//           disabled={!!selectedObj}
//           {...props}
//         />
//       </div>

//       <SearchResults
//         focusedIndex={focusedIndex}
//         visible={displaySearch}
//         results={results}
//         onSelect={handleSelection}
//         renderItem={renderItem}
//         // resultContainerStyle={resultContainerStyle}
//         selectedResultStyle={selectedResultStyle}
//       />
//     </div>
//   );
// }

// const SearchResults = ({
//   visible,
//   results = [],
//   focusedIndex,
//   onSelect,
//   renderItem,
//   resultContainerStyle,
//   selectedResultStyle,
// }) => {
//   const resultContainer = useRef();

//   useEffect(() => {
//     resultContainer.current?.scrollIntoView({
//       behavior: "smooth",
//       block: "center",
//     });
//   }, [focusedIndex]);

//   if (!visible) return null;
//   return (
//     <div className='absolute z-50 right-0 left-0 top-10 shadow-md p-2 max-h-64 space-y-2 mt-1 overflow-auto border bg-popover'>
//       {results.map((result, index) => {
//         const getSelectedClass = () => {
//           return selectedResultStyle
//             ? selectedResultStyle
//             : // : "dark:bg-dark-subtle bg-light-subtle";
//               "bg-muted";
//         };
//         return (
//           <ResultCard
//             ref={index === focusedIndex ? resultContainer : null}
//             key={index.toString()}
//             item={result}
//             renderItem={renderItem}
//             resultContainerStyle={resultContainerStyle}
//             selectedResultStyle={index === focusedIndex ? getSelectedClass() : ""}
//             onClick={() => {
//               onSelect(result);
//             }}
//           />
//         );
//       })}
//     </div>
//   );
// };

// const ResultCard = forwardRef((props, ref) => {
//   const { item, renderItem, resultContainerStyle, selectedResultStyle, onClick } = props;

//   const getClasses = () => {
//     if (resultContainerStyle) return resultContainerStyle + " " + selectedResultStyle;

//     const newStyle = " cursor-pointer rounded overflow-hidden hover:bg-muted transition ";

//     return (
//       selectedResultStyle + newStyle
//       // " cursor-pointer rounded overflow-hidden dark:hover:bg-dark-subtle hover:bg-light-subtle transition "
//     );
//   };

//   return (
//     <div
//       onClick={onClick}
//       ref={ref}
//       // className="cursor-pointer hover:bg-muted transition rounded"
//       className={getClasses()}
//     >
//       {renderItem(item)}
//     </div>
//   );
// });
