import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Card from "./pages/Card";
import Shipping from "./pages/Shipping";
import Details from "./pages/Details";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/card' element={<Card />} />
        <Route path='/shipping' element={<Shipping />} />
        <Route path='/product/details/:slug' element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}
