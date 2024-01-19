import {
  CheckCircleOutline,
  ErrorOutline,
  RestartAltOutlined,
} from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Form = styled.form`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
`;

const MsgContainer = styled.div`
  margin: ${(props) => props.margin};
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${(props) => props.color};
`;

const Msg = styled.span`
  font-weight: 600;
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
  gap: 10px;
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
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [tracker, setTracker] = useState(0);
  const { _id: userId, token } = useSelector((state) => state.auth.currentUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const res = await axios.put(
        `http://localhost:8000/api/users/${userId}`,
        Object.fromEntries(formData),
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );

      if (res.data) {
        setErrorMsg("");
        setShowForm(false);
        setSuccessMsg("You changed your password successfully!");
        setTracker((prev) => prev + 1);
      }
    } catch (err) {
      setErrorMsg(err.response?.data || "Something went wrong...");
    }
  };

  useEffect(() => {
    successMsg.length > 0 && setTimeout(() => setSuccessMsg(""), 5000);
  }, [tracker]);

  return showForm ? (
    <Form onSubmit={handleSubmit}>
      {errorMsg.length > 0 && (
        <MsgContainer color="rosybrown" margin="0 0 15px">
          <ErrorOutline />
          <Msg>{errorMsg}</Msg>
        </MsgContainer>
      )}
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
        <Input type="password" id="password" name="password" defaultValue="" />
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
  ) : (
    <>
      {successMsg.length > 0 && (
        <MsgContainer color="darkolivegreen" margin="15px 0 0">
          <CheckCircleOutline />
          <Msg>{successMsg}</Msg>
        </MsgContainer>
      )}
      <ButtonContainer
        margin="15px"
        style={{ color: "rosybrown", cursor: "pointer" }}
        onClick={() => setShowForm(true)}
      >
        <RestartAltOutlined />
        Reset Password
      </ButtonContainer>
    </>
  );
};

export default ResetPassword;
