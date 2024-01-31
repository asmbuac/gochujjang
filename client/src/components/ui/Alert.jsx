import styled from "styled-components";
import { SvgIcon } from "@mui/material";
import { CheckCircleOutline, ErrorOutline } from "@mui/icons-material";

const alertTypes = {
  danger: {
    color: "crimson",
    icon: ErrorOutline,
  },
  success: {
    color: "darkolivegreen",
    icon: CheckCircleOutline,
  },
};

const Container = styled.div`
  margin: ${({ $margin }) => $margin};
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ $color }) => $color};
`;

const Icon = styled(SvgIcon)``;

const Message = styled.span`
  font-weight: 600;
`;

const Alert = ({ type, margin, color, icon, children }) => {
  return (
    <Container $margin={margin} $color={type ? alertTypes[type]?.color : color}>
      <Icon component={type ? alertTypes[type]?.icon : icon} />
      <Message>{children}</Message>
    </Container>
  );
};

export default Alert;
