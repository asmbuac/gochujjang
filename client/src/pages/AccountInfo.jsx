import { EditOutlined } from "@mui/icons-material";
import styled from "styled-components";
import AccountDetail from "../components/AccountDetail";
import { useSelector } from "react-redux";

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

const ResetPasswordButton = styled.button`
  margin-top: 15px;
  width: fit-content;
  padding: 10px;
  cursor: pointer;
`;

const AccountInfo = () => {
  const user = useSelector((state) => state.auth.currentUser);

  return (
    <>
      <Title>My Account</Title>
      <Header>Contact Details</Header>
      <Info>
        <AccountDetail
          label="name"
          field="name"
          data={{ firstName: user?.firstName, lastName: user?.lastName }}
          type="text"
        />
        <AccountDetail
          label="email address"
          field="email"
          data={user?.email}
          type="email"
        />
        <AccountDetail
          label="username"
          field="username"
          data={user?.username}
          type="text"
        />
        <ResetPasswordButton type="button">Reset password</ResetPasswordButton>
      </Info>
    </>
  );
};

export default AccountInfo;
