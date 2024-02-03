import { useParams } from "react-router-dom";
import DetailsSection from "../ui/DetailsSection";

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

  return (
    <DetailsSection details={details} buttons={buttons} boldLastRow={true} />
  );
};

export default Order;
