import styled from "styled-components";
import { useParams } from "react-router-dom";
import DetailsSection from "../ui/DetailsSection";

const Container = styled.div`
  padding: 15px 25px;
  display: flex;
  flex-direction: column;
  border: 1px solid #e6e6e6;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
    font-weight: bold;
  }
`;

const Field = styled.span`
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  color: gray;
`;

const Value = styled.span`
  text-transform: capitalize;
`;

const ButtonContainer = styled.div`
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: right;
  gap: 8px;
`;

const Button = styled.button`
  padding: 10px;
  border: 2px solid;
  border-color: black;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  cursor: pointer;
  transition: all 300ms ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const Order = ({ order }) => {
  const params = useParams().id;

  const details = [
    { field: "Order Number", value: order?._id },
    {
      field: "Date Placed",
      value: !params
        ? new Date(order?.createdAt).toLocaleDateString()
        : new Date(order?.createdAt).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
    },
    { field: "Order Status", value: order?.status },
    { field: "Total", value: `$${order?.amount}` },
  ];

  const buttons = [
    {
      text: "Support",
      link: "/support",
      bgColor: "transparent",
      textColor: "black",
    },
    {
      text: "Details",
      link: `/account/orders/${order?._id}`,
      bgColor: "black",
      textColor: "white",
    },
  ];

  return <DetailsSection details={details} buttons={buttons} />;
};

export default Order;
