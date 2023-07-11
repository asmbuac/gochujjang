import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  height: 40vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  padding: 30px 40px;
  background-color: black;
  color: white;
  font-size: 20px;
  font-weight: 600;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  transition: all 300ms ease;

  &:hover {
    background-color: #7487bf;
  }
`;

function Pay() {
  const handleCheckout = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/checkout",
        {
          amount: 2000,
        }
      );
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Button onClick={handleCheckout}>Pay Now</Button>
    </Container>
  );
}

export default Pay;
