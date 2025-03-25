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
import { Gauge, Home, LogOut, MonitorPlay, UserRound } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "./button";
import { useTranslation } from "react-i18next";
import i18n from "@/utils/i18n";
import { AiOutlineDashboard, AiOutlineShoppingCart } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { FaUsers, FaUserTimes } from "react-icons/fa";
import { MdPayment, MdViewList } from "react-icons/md";
import { FaCodePullRequest } from "react-icons/fa6";
import { IoIosChatbubbles, IoMdAdd } from "react-icons/io";
import { TbBasketDiscount } from "react-icons/tb";
import { BsCartCheck, BsFillChatQuoteFill } from "react-icons/bs";
import { IoChatbubbles } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

export const items = [
  // {
  //   title: "Dashboard",
  //   icon: <AiOutlineDashboard />,
  //   url: "/admin/dashboard",
  // },
  // {
  //   title: "Orders",
  //   icon: <AiOutlineShoppingCart />,
  //   url: "/admin/dashboard/orders",
  // },
  // {
  //   title: "Category",
  //   icon: <BiCategory />,
  //   url: "/admin/dashboard/category",
  // },
  // {
  //   title: "Sellers",
  //   icon: <FaUsers />,
  //   url: "/admin/dashboard/sellers",
  // },
  // {
  //   title: "Payment Request",
  //   icon: <MdPayment />,
  //   url: "/admin/dashboard/payment-request",
  // },
  // {
  //   title: "Deactive Sellers",
  //   icon: <FaUserTimes />,
  //   url: "/admin/dashboard/deactive-sellers",
  // },
  // {
  //   title: "Sellers Request",
  //   icon: <FaCodePullRequest />,
  //   url: "/admin/dashboard/sellers-request",
  // },
  // {
  //   title: "Live Chat",
  //   icon: <IoIosChatbubbles />,
  //   url: "/admin/dashboard/chat-seller",
  // },
  {
    title: "Dashboard",
    icon: <AiOutlineDashboard />,
    url: "/seller/dashboard",
  },
  {
    title: "Category",
    icon: <BiCategory />,
    url: "/seller/dashboard/category",
  },
  {
    title: "Add Product",
    icon: <IoMdAdd />,
    url: "/seller/dashboard/add-product",
  },
  {
    title: "All Product",
    icon: <MdViewList />,
    url: "/seller/dashboard/products",
  },
  // {
  //   title: "Discount Product",
  //   icon: <TbBasketDiscount />,
  //   url: "/seller/dashboard/discount-product",
  // },
  {
    title: "Orders",
    icon: <BsCartCheck />,
    url: "/seller/dashboard/orders",
  },
  {
    title: "Payments",
    icon: <MdPayment />,
    url: "/seller/dashboard/payments",
  },
  {
    title: "Chat-Customer",
    icon: <IoChatbubbles />,
    url: "/seller/dashboard/chat-customer",
  },
  // {
  //   title: "Chat-Support",
  //   icon: <BsFillChatQuoteFill />,
  //   url: "/seller/dashboard/chat-support",
  // },
  {
    title: "Profile",
    icon: <CgProfile />,
    url: "/seller/dashboard/profile",
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
