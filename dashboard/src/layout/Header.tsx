import ThemeButton from "@/components/ThemeButton";
import LanguageButton from "@/components/ui/LanguageButton";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useSelector } from "react-redux";

export default function Header({ showSidebar, setShowSidebar }) {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div className='px-4 py-2 flex gap-2 justify-between items-center'>
      <SidebarTrigger />
      <div className='flex items-center gap-4'>
        {/* <ModeToggle /> */}
        <ThemeButton />
        <LanguageButton />
        <img src={userInfo.image} alt='profile image' className='w-10 h-10 rounded-full overflow-hidden' />
      </div>
    </div>
  );
  // return (
  //   <div className='fixed top-0 left-0 w-full py-5 px-2 lg:px-7 z-40'>
  //     <div className='ml-0 lg:ml-[260px] rounded-md h-[65px] flex justify-between items-center bg-[#b1addf] px-5 transition-all'>
  //       <div
  //         onClick={() => setShowSidebar(!showSidebar)}
  //         className='w-[35px] flex lg:hidden h-[35px] rounded-sm bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 justify-center items-center cursor-pointer'
  //       >
  //         <span>
  //           <FaList />
  //         </span>
  //       </div>
  //       <div className='hidden md:block'>
  //         <input
  //           type='text'
  //           className='px-3 py-2 outline-none border bg-transparent border-slate-700 rounded-md text-[#2e2b47] focus:border-indigo-400 overflow-hidden'
  //           name='search'
  //           placeholder='search'
  //         />
  //       </div>
  //       <div className='flex justify-center items-center gap-8 relative'>
  //         <div className='flex justify-center items-center'>
  //           <div className='flex justify-center items-center gap-3'>
  //             <div className='flex justify-center items-center flex-col text-end'>
  //               <h2 className='font-bold'>{userInfo.name}</h2>
  //               <span className='text-[14px] w-full font-normal'>{userInfo.role}</span>
  //             </div>

  //             {userInfo.role === "admin" ? (
  //               <img
  //                 src='http://localhost:5173/admin.jpg'
  //                 alt='admin image'
  //                 className='w-[45px] h-[45px] rounded-full overflow-hidden'
  //               />
  //             ) : (
  //               <img
  //                 src={userInfo.image}
  //                 alt='admin image'
  //                 className='w-[45px] h-[45px] rounded-full overflow-hidden'
  //               />
  //             )}
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
}
