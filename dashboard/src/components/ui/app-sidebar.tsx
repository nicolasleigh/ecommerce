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
import { logout } from "@/store/reducers/authReducer";
import {
  ArrowBigLeft,
  CreditCard,
  Gauge,
  LayoutList,
  ListPlus,
  LogOut,
  MessageSquareMore,
  ShoppingCart,
  UserRoundPen,
  Wallet,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../theme-provider";
import { Button } from "./button";

const items = [
  {
    title: "Dashboard",
    icon: <Gauge />,
    url: "/dashboard",
  },
  {
    title: "Category",
    icon: <LayoutList />,
    url: "/category",
  },
  {
    title: "Add Product",
    icon: <ListPlus />,
    url: "/add-product",
  },
  {
    title: "All Product",
    icon: <ShoppingCart />,
    url: "/products",
  },
  {
    title: "Orders",
    icon: <Wallet />,
    url: "/orders",
  },
  {
    title: "Payments",
    icon: <CreditCard />,
    url: "/payments",
  },
  {
    title: "Chat Customer",
    icon: <MessageSquareMore />,
    url: "/chat-customer",
  },
  {
    title: "Profile",
    icon: <UserRoundPen />,
    url: "/profile",
  },
  {
    title: "Customer Page",
    icon: <ArrowBigLeft />,
    url: "https://pet.linze.pro",
  },
];

export function AppSidebar() {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Sidebar variant='inset'>
      <SidebarHeader className='mb-4'>
        <Link to='/'>
          <img src={theme === "dark" ? "/logo-dark.svg" : "/logo.svg"} alt='Petify logo' className='w-full pt-2' />
        </Link>
      </SidebarHeader>
      <SidebarContent className=''>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton className='p-0'>
                <NavLink
                  to={item.url}
                  target={item.url.startsWith("https://") ? "_blank" : "_self"}
                  className={({ isActive }) => (isActive ? "bg-primary text-primary-foreground" : " ") + " w-full"}
                >
                  <Button
                    variant='ghost'
                    className='flex items-center justify-start w-full py-1 px-2 hover:bg-primary hover:text-primary-foreground'
                    asChild
                  >
                    <div>
                      {item.icon}
                      <span>{item.title}</span>
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
        <Button
          variant='secondary'
          onClick={() => dispatch(logout(navigate))}
          className='flex items-center justify-start w-full py-1 px-2'
        >
          <LogOut size={18} />
          <span>{"Log out"}</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
