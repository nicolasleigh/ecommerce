import Category from "@/views/seller/Category";
import ProductDetails from "@/views/seller/ProductDetails";
import { lazy } from "react";
const SellerDashboard = lazy(() => import("../../views/seller/SellerDashboard"));
const AddProduct = lazy(() => import("../../views/seller/AddProduct"));
const Products = lazy(() => import("../../views/seller/Products"));
const DiscountProducts = lazy(() => import("../../views/seller/DiscountProducts"));
const Orders = lazy(() => import("../../views/seller/Orders"));
const Payments = lazy(() => import("../../views/seller/Payments"));
const SellerToAdmin = lazy(() => import("../../views/seller/SellerToAdmin"));
const SellerToCustomer = lazy(() => import("../../views/seller/SellerToCustomer"));
const Profile = lazy(() => import("../../views/seller/Profile"));
const EditProduct = lazy(() => import("../../views/seller/EditProduct"));
const OrderDetails = lazy(() => import("../../views/seller/OrderDetails"));

export const sellerRoutes = [
  {
    path: "/dashboard",
    element: <SellerDashboard />,
    role: "seller",
    status: "active",
  },
  {
    path: "/category",
    element: <Category />,
    role: "seller",
  },
  {
    path: "/add-product",
    element: <AddProduct />,
    role: "seller",
    status: "active",
  },
  {
    path: "/edit-product/:productId",
    element: <EditProduct />,
    role: "seller",
    status: "active",
  },
  {
    path: "/products",
    element: <Products />,
    role: "seller",
    status: "active",
  },
  {
    path: "/discount-product",
    element: <DiscountProducts />,
    role: "seller",
    status: "active",
  },
  {
    path: "/orders",
    element: <Orders />,
    role: "seller",
  },
  {
    path: "/order/details/:orderId",
    element: <OrderDetails />,
    role: "seller",
  },
  {
    path: "/product/details/:productId",
    element: <ProductDetails />,
    role: "seller",
  },
  {
    path: "/payments",
    element: <Payments />,
    role: "seller",
    status: "active",
  },
  {
    path: "/chat-support",
    element: <SellerToAdmin />,
    role: "seller",
  },
  {
    path: "/chat-customer/:customerId",
    element: <SellerToCustomer />,
    role: "seller",
    status: "active",
  },
  {
    path: "/chat-customer",
    element: <SellerToCustomer />,
    role: "seller",
    status: "active",
  },
  {
    path: "/profile",
    element: <Profile />,
    role: "seller",
  },
];
