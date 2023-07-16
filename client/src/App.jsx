import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Announcement from "./components/Announcement";
import Navbar from "./components/Navbar";
import Marquee from "./components/Marquee";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return (
    <>
      <Announcement />
      <Navbar />
      <Marquee />
      <Routes>
        <Route index element={<Home />} />
        <Route
          path="/register"
          element={user ? <Navigate replace to="/" /> : <Register />}
        />
        <Route
          path="/login"
          element={user ? <Navigate replace to="/" /> : <Login />}
        />
        <Route path="/products">
          <Route index element={<ProductList />} />
          <Route path=":category" element={<ProductList />} />
        </Route>
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<Success />} />
      </Routes>
      <Newsletter />
      <Footer />
    </>
  );
};

export default App;
