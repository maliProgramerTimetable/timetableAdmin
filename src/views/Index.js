import Chart from "chart.js";
// core components
import {
  chartOptions,
  parseOptions,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";

const Index = (props) => {

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }


  return (
    <>
      <Header />
      
    </>
  );
};

export default Index;
