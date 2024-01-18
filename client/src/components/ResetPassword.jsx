import { RestartAltOutlined } from "@mui/icons-material";
import { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #e6e6e6;
  padding: 10px;
  margin-bottom: 10px;

  &:focus-within {
    border-color: black;
  }
`;

const Label = styled.label`
  font-size: 12px;
  color: gray;
  text-transform: capitalize;
  margin-left: 2px;
`;

const Input = styled.input`
  border: none;
  outline: none;
  font-size: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.justify};
  gap: 8px;
  margin-top: ${(props) => props.margin};
`;

const Button = styled.button`
  margin-top: ${(props) => props.margin};
  padding: 10px;
  border: 2px solid;
  border-color: ${(props) => props.bc};
  background-color: ${(props) => props.bg};
  color: ${(props) => props.color};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  cursor: pointer;
  transition: all 300ms ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const ResetPassword = () => {
  const [showForm, setShowForm] = useState(false);

  if (showForm) {
    return (
      <Form>
        <InputContainer>
          <Label htmlFor="oldPassword">Old Password</Label>
          <Input
            type="password"
            id="oldPassword"
            name="oldPassword"
            defaultValue=""
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="password">New Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            defaultValue=""
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <Input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            defaultValue=""
          />
        </InputContainer>
        <ButtonContainer justify="right" margin="10px">
          <Button
            bc="black"
            bg="white"
            color="black"
            type="button"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </Button>
          <Button bc="black" bg="black" color="white" type="submit">
            Save
          </Button>
        </ButtonContainer>
      </Form>
    );
  }

  return (
    <ButtonContainer
      margin="15px"
      style={{ color: "rosybrown", cursor: "pointer" }}
      onClick={() => setShowForm(true)}
    >
      <RestartAltOutlined />
      Reset Password
    </ButtonContainer>
  );
};

export default ResetPassword;
