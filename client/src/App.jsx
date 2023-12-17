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
import Wishlist from "./pages/Wishlist";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetWishlistQuery } from "./redux/wishlistApi";

export const WishlistContext = createContext(null);

const App = () => {
  const [wishlist, setWishlist] = useState(null);
  const user = useSelector((state) => state.auth.currentUser);
  const { pathname } = useLocation();
  const { data } = useGetWishlistQuery(user?._id);

  useEffect(() => {
    const wishlist = new Set(data?.products.map((item) => item._id));
    setWishlist(wishlist);
  }, [data]);

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
      <WishlistContext.Provider value={wishlist}>
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
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </WishlistContext.Provider>
      <Newsletter />
      <Footer />
    </>
  );
};

export default App;
