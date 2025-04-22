import ThemeButton from "@/components/ThemeButton";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useSelector } from "react-redux";

export default function Header() {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div className='px-4 py-2 flex gap-2 justify-between items-center'>
      <SidebarTrigger />
      <div className='flex items-center gap-4'>
        <ThemeButton />
        <img src={userInfo.image} alt='profile image' className='w-10 h-10 rounded-full overflow-hidden' />
      </div>
    </div>
  );
}
