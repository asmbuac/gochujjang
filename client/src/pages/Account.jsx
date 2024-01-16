import { PersonOutlined, ReceiptLongOutlined } from "@mui/icons-material";
import { SvgIcon } from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  max-width: 1600px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
`;

const Nav = styled.nav`
  padding: 20px 10px 20px 30px;
  position: sticky;
  top: 60px;
  max-height: calc(100vh - 60px);
  width: 260px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  color: black;
  transition: all 300ms ease-in-out;

  &:hover {
    background-color: #f0f0f0;
  }

  &.active {
    background-color: #f8f8f8;
  }
`;

const Icon = styled(SvgIcon)``;

const ItemTitle = styled.span``;

const Content = styled.div`
  max-width: calc(100% - 300px);
  width: calc(100% - 300px);
  padding: 20px;
`;

const Account = () => {
  return (
    <Container>
      <Nav>
        <NavItem to="/account" end>
          <Icon component={PersonOutlined} />
          <ItemTitle>My Info</ItemTitle>
        </NavItem>
        <NavItem to="/account/orders" end>
          <Icon component={ReceiptLongOutlined} />
          <ItemTitle>My Orders</ItemTitle>
        </NavItem>
      </Nav>
      <Content>
        <Outlet />
      </Content>
    </Container>
  );
};

export default Account;
