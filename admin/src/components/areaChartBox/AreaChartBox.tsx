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
  return <div className="areaChartBox"></div>;
};

export default AreaChartBox;
