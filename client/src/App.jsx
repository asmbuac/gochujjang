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
import ArtistList from "./pages/ArtistList";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetWishlistQuery } from "./redux/wishlistApi";
import styled from "styled-components";
import NavDrawer from "./components/NavDrawer";
import SearchDrawer from "./components/SearchDrawer";
import Account from "./pages/Account";

export const WishlistContext = createContext(null);

const Container = styled.div`
  position: relative;
`;

const App = () => {
  const [wishlist, setWishlist] = useState(null);
  const [navOpen, setNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
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
    <Container>
      <Announcement />
      <Navbar setNavOpen={setNavOpen} setSearchOpen={setSearchOpen} />
      <NavDrawer open={navOpen} setOpen={setNavOpen} />
      <SearchDrawer open={searchOpen} setOpen={setSearchOpen} />
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
          <Route path="/artists" element={<ArtistList />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </WishlistContext.Provider>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default App;
