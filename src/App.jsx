import { useState } from "react";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import AuthLayout from "./components/AuthLayout";
import Home from "./components/Home";
import Starters from "./components/Starters.jsx";
import Drinks from "./components/Drinks.jsx";
import Deserts from "./components/Deserts.jsx";
import NavEnclose from "./components/NavEnclose";
import HomeEnclose from "./components/HomeEnclose";
import DishTemplate from "./components/DishTemplate";
import CartLayout from "./components/CartLayout";
import Cart from "./components/Cart";
import { Provider } from "react-redux";
import store from "./store/store.js";
import CartPayment from "./components/CartPayment.jsx";
import Caution from "./components/Caution.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route element={<NavEnclose />}>
          <Route element={<HomeEnclose />}>
            <Route path="/home" element={<Home />} />
            <Route path="/drinks" element={<Drinks />} />
            <Route path="/deserts" element={<Deserts />} />
            <Route path="/starters" element={<Starters />} />
          </Route>
          <Route element={<CartLayout />}>
            <Route path="/cart" element={<Cart />} />
          </Route>
        </Route>

        {/* <Route path="/bar" element={<Caution />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
