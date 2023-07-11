import Announcement from "./components/Announcement";
import Navbar from "./components/Navbar";
import Marquee from "./components/Marquee";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Pay from "./pages/Pay";
import Success from "./pages/Success";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";

const App = () => {
  const user = true;

  return (
    <BrowserRouter>
      <Announcement />
      <Navbar />
      <Marquee />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/register" element={user ? <Navigate replace to="/" /> : <Register />} />
        <Route path="/login" element={user ? <Navigate replace to="/" /> : <Login />} />
        <Route path="/products">
          <Route index element={<ProductList />} />
          <Route path=":category" element={<ProductList />} />
        </Route>
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/success" element={<Success />} />
      </Routes>
      <Newsletter />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
