import { EditOutlined } from "@mui/icons-material";
import styled from "styled-components";
import AccountDetail from "../components/AccountDetail";

const Title = styled.h1`
  margin-bottom: 30px;
  text-transform: uppercase;
  font-weight: 900;
`;

const Header = styled.h2`
  font-size: 18px;
  text-transform: uppercase;
  font-weight: 900;
  margin-bottom: 10px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #f0f0f0;
  padding: 15px 0;
`;

const DetailTitle = styled.span`
  font-size: 12px;
  color: gray;
`;

const Data = styled.span``;

const ResetPasswordButton = styled.button`
  margin-top: 15px;
  width: fit-content;
  padding: 10px;
`;

const AccountInfo = () => {
  return (
    <>
      <Title>My Info</Title>
      <Header>Contact Details</Header>
      <Info>
        <AccountDetail field="name" data="Adrienne Shayne Buac" />
        <AccountDetail field="email address" data="asmbuac@gmail.com" />
        <AccountDetail field="username" data="asmbuac" />
        <ResetPasswordButton>Reset password</ResetPasswordButton>
      </Info>
    </>
  );
};

export default AccountInfo;
