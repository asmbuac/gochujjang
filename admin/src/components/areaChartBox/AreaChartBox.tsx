import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./areaChartBox.scss";

type AreaChartData = {
  name: string;
  books: number;
  clothes: number;
  electronic: number;
};

type AreaChartBoxProps = {
  data: AreaChartData[];
};

const AreaChartBox: React.FC<AreaChartBoxProps> = ({ data }) => {
  return (
    <div className="areaChartBox">
      <h1>Revenue Analytics</h1>
      <div className="chart">
        <ResponsiveContainer width="99%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Legend iconType="circle" iconSize={10} />
            <Tooltip
              contentStyle={{ borderRadius: "5px" }}
              labelStyle={{ display: "none" }}
            />
            <Area
              type="monotone"
              dataKey="books"
              stackId="1"
              stroke="#8884d8"
              fill="#8884d8"
            />
            <Area
              type="monotone"
              dataKey="clothes"
              stackId="1"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
            <Area
              type="monotone"
              dataKey="electronic"
              stackId="1"
              stroke="#ffc658"
              fill="#ffc658"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AreaChartBox;
