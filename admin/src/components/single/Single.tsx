import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./single.scss";
import { useState } from "react";
import EditModal from "../editModal/EditModal";
import { ColumnInfo, Order, Product, User } from "../../types";
import { columns as productColumns } from "../../pages/products/Products";
import { columns as orderColumns } from "../../pages/orders/Orders";
import { columns as userColumns } from "../../pages/users/Users";

type Props = {
  id: number;
  img?: string;
  title: string;
  info: object;
  chart?: {
    dataKeys: {
      name: string;
      color: string;
    }[];
    data: object[];
  };
  activities?: {
    time: string;
    text: string;
  }[];
  slug: string;
  data: Product & Order & User;
};

const Single = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [columns, setColumns] = useState<ColumnInfo[]>([]);

  const handleClick = () => {
    props.slug === "product"
      ? setColumns(productColumns)
      : props.slug === "order"
      ? setColumns(orderColumns)
      : setColumns(userColumns);
    const { createdAt, updatedAt, __v, password, ...others } = props.data;
    if (props.slug === "order") {
      others.products = others.products
        ?.map(
          (item: { [key: string]: any }) =>
            `${item.product._id} ${item.quantity}`
        )
        .join(", ");
    }
    setFormData(others);
    setOpen(true);
  };

  return (
    <div className="single">
      <div className="view">
        <div className="info">
          <div className="topInfo">
            {props.data.avatar ? (
              <img src={props.data.avatar} alt="" />
            ) : (
              props.data.image && <img src={props.data.image} alt="" />
            )}
            <h1>
              {props.slug === "user"
                ? `${props.data.firstName} ${props.data.lastName}`
                : props.title}
            </h1>
            <button onClick={handleClick}>Update</button>
          </div>
          <div className="details">
            {Object.entries(props.data)
              .filter((item) => item[0] !== "__v" && item[0] !== "avatar")
              .map((item) => (
                <div className="item" key={item[0]}>
                  <span className="itemTitle">{item[0]}:</span>
                  <span className="itemValue">
                    {typeof item[1] === "boolean"
                      ? item[1] === true
                        ? "yes"
                        : "no"
                      : item[1]}
                  </span>
                </div>
              ))}
          </div>
        </div>
        {props.chart && (
          <div className="chart">
            <ResponsiveContainer width="99%" height="100%">
              <LineChart data={props.chart.data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  contentStyle={{ borderRadius: "5px" }}
                  labelStyle={{ display: "none" }}
                />
                <Legend />
                {props.chart.dataKeys.map((dataKey) => (
                  <Line
                    type="monotone"
                    dataKey={dataKey.name}
                    stroke={dataKey.color}
                    key={dataKey.color}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
      <div className="activities">
        <h2>Latest Activities</h2>
        {props.activities && (
          <ul>
            {props.activities.map((activity) => (
              <li key={activity.text + activity.time}>
                <div>
                  <p>{activity.text}</p>
                  <time>{activity.time}</time>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {open && (
        <EditModal
          slug={props.slug}
          columns={columns}
          setOpen={setOpen}
          formData={formData}
          setFormData={setFormData}
        />
      )}
    </div>
  );
};

export default Single;
