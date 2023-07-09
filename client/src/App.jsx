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
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";

const App = () => {

  return (
    <BrowserRouter>
      <Announcement />
      <Navbar />
      <Marquee />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<ProductList />} />
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
