import Announcement from '../components/Announcement';
import Navbar from '../components/Navbar';
import Slider from '../components/Slider';
import Categories from '../components/Categories';
import Products from '../components/Products';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import styled from "styled-components";
import Marquee from '../components/Marquee';

const Container = styled.div``;

const Home = () => {
  return (
    <Container>
      <Announcement />
      <Navbar />
      <Marquee />
      <Slider />
      <Categories />
      <Products />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Home;
