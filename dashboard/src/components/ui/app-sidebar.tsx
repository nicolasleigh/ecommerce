import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { LogOut } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AiOutlineDashboard } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { BsCartCheck } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { IoMdAdd } from "react-icons/io";
import { IoChatbubbles } from "react-icons/io5";
import { MdPayment, MdViewList } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { Button } from "./button";

export const items = [
  {
    title: "Dashboard",
    icon: <AiOutlineDashboard />,
    url: "/dashboard",
  },
  {
    title: "Category",
    icon: <BiCategory />,
    url: "/category",
  },
  {
    title: "Add Product",
    icon: <IoMdAdd />,
    url: "/add-product",
  },
  {
    title: "All Product",
    icon: <MdViewList />,
    url: "/products",
  },
  // {
  //   title: "Discount Product",
  //   icon: <TbBasketDiscount />,
  //   url: "/discount-product",
  // },
  {
    title: "Orders",
    icon: <BsCartCheck />,
    url: "/orders",
  },
  {
    title: "Payments",
    icon: <MdPayment />,
    url: "/payments",
  },
  {
    title: "Chat-Customer",
    icon: <IoChatbubbles />,
    url: "/chat-customer",
  },
  // {
  //   title: "Chat-Support",
  //   icon: <BsFillChatQuoteFill />,
  //   url: "/chat-support",
  // },
  {
    title: "Profile",
    icon: <CgProfile />,
    url: "/profile",
  },
];

export function AppSidebar() {
  const { t } = useTranslation();
  return (
    <Sidebar variant='inset'>
      <SidebarHeader className='mb-8'>
        <Link to='/'>
          <img src='/logo.svg' alt='Petify logo' className='w-full pt-2' />
        </Link>
      </SidebarHeader>
      <SidebarContent className=''>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton className='p-0'>
                <NavLink to={item.url} className={({ isActive }) => (isActive ? "bg-muted" : " ") + " w-full"}>
                  <Button variant='ghost' className='flex items-center justify-start w-full py-1 px-2' asChild>
                    <div>
                      {item.icon}
                      <span>{t(item.title)}</span>
                    </div>
                  </Button>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter className='p-0'>
        <Button variant='secondary' className='flex items-center justify-start w-full py-1 px-2'>
          <LogOut size={18} />
          <span>{t("Log out")}</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
