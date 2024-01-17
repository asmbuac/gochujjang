import { EditOutlined } from "@mui/icons-material";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f0f0f0;
  padding: 15px 0;
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailTitle = styled.span`
  font-size: 12px;
  color: gray;
  text-transform: capitalize;
`;

const Data = styled.span``;

const EditButton = styled(EditOutlined)``;

const AccountDetail = ({ field, data }) => {
  return (
    <Container>
      <DetailContainer>
        <DetailTitle>{field}</DetailTitle>
        <Data>{data}</Data>
      </DetailContainer>
      <EditButton />
    </Container>
  );
};

export default AccountDetail;
