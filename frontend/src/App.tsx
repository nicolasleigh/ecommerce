import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Shipping from "./pages/Shipping";
import Details from "./pages/Details";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { get_category } from "./store/reducers/homeReducer";
import CategoryShop from "./pages/CategoryShop";
import SearchProducts from "./pages/SearchProducts";
import Payment from "./pages/Payment";
import Dashboard from "./pages/Dashboard";
import ProtectUser from "./utils/ProtectUser";
import Index from "./components/dashboard/Index";
import Orders from "./components/dashboard/Orders";
import ChangePassword from "./components/dashboard/ChangePassword";
import Wishlist from "./components/dashboard/Wishlist";
import OrderDetails from "./components/dashboard/OrderDetails";
import Chat from "./components/dashboard/Chat";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_category());
  }, []);

  // Scroll to the top
  const Wrapper = ({ children }) => {
    const location = useLocation();
    useLayoutEffect(() => {
      document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);
    return children;
  };

  return (
    <BrowserRouter>
      <Wrapper>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/shipping' element={<Shipping />} />
          <Route path='/products?' element={<CategoryShop />} />
          <Route path='/products/search?' element={<SearchProducts />} />
          <Route path='/product/details/:slug' element={<Details />} />

          <Route path='/dashboard' element={<ProtectUser />}>
            <Route path='' element={<Dashboard />}>
              <Route path='' element={<Index />} />
              <Route path='my-orders' element={<Orders />} />
              <Route path='change-password' element={<ChangePassword />} />
              <Route path='my-wishlist' element={<Wishlist />} />
              <Route path='order/details/:orderId' element={<OrderDetails />} />
              <Route path='chat' element={<Chat />} />
              <Route path='chat/:sellerId' element={<Chat />} />
            </Route>
          </Route>
        </Routes>
      </Wrapper>
    </BrowserRouter>
  );
}
