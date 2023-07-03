import styled from 'styled-components';

const Container = styled.div`
  height: 30px;
  background-color: #7487bf;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 3px;
  text-transform: uppercase;
  position: relative;
  z-index: 1;
`;

const Announcement = () => {
  return (
    <Container>
      Free Shipping on Orders Over $50
    </Container>
  );
};

export default Announcement;
