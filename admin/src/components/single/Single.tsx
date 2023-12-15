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

const excludedKeys = new Set(["__v", "avatar", "image"]);

const splitTitle = (title: string) => {
  return title.split("").reduce((res, char, i) => {
    const nextChar = title[i + 1];
    return (
      res + char + (nextChar && nextChar.toUpperCase() === nextChar ? " " : "")
    );
  });
};

const transformValue = (item: [string, any]): string => {
  const [key, value] = item;

  switch (true) {
    case typeof value === "boolean":
      return value ? "yes" : "no";
    case key === "createdAt" || key === "updatedAt":
      return new Date(value).toLocaleString();
    case Array.isArray(value):
      return value.join(", ");
    case typeof value === "number":
      return `$${value}`;
    default:
      return value;
  }
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
    if (props.slug === "order" && Array.isArray(others.products)) {
      others.products = others.products
        ?.map(
          (item: { [key: string]: any } | string) =>
            typeof item === "object" && `${item.product._id} ${item.quantity}`
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
                : props.data.title}
            </h1>
            <button onClick={handleClick}>Update</button>
          </div>
          <div className="details">
            {Object.entries(props.data)
              .filter(
                (item) =>
                  !excludedKeys.has(item[0]) &&
                  !(Array.isArray(item[1]) && item[1].length === 0)
              )
              .map((item) => (
                <div className="item" key={item[0]}>
                  <span className="itemTitle">
                    {item[0] === "_id" ? "ID" : splitTitle(item[0])}:
                  </span>
                  <span className="itemValue">{transformValue(item)}</span>
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
