import AreaChartBox from "../../components/areaChartBox/AreaChartBox";
import BarChartBox from "../../components/barChartBox/BarChartBox";
import LineChartBox from "../../components/lineChartBox/LineChartBox";
import PieChartBox from "../../components/pieChartBox/PieChartBox";
import TopBox from "../../components/topBox/TopBox";
import {
  areaChartBoxRevenue,
  barChartBoxRevenue,
  barChartBoxVisit,
  chartBoxConversion,
  chartBoxProduct,
  chartBoxRevenue,
  chartBoxUser,
  pieChartBoxLeadSources,
} from "../../data";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <div className="box box1">
        <TopBox />
      </div>
      <div className="box box2">
        <LineChartBox {...chartBoxUser} />
      </div>
      <div className="box box3">
        <LineChartBox {...chartBoxProduct} />
      </div>
      <div className="box box4">
        <PieChartBox data={pieChartBoxLeadSources} />
      </div>
      <div className="box box5">
        <LineChartBox {...chartBoxConversion} />
      </div>
      <div className="box box6">
        <LineChartBox {...chartBoxRevenue} />
      </div>
      <div className="box box7">
        <AreaChartBox data={areaChartBoxRevenue} />
      </div>
      <div className="box box8">
        <BarChartBox {...barChartBoxVisit} />
      </div>
      <div className="box box9">
        <BarChartBox {...barChartBoxRevenue} />
      </div>
    </div>
  );
};

export default Home;
