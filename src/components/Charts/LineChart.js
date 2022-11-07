import React from "react";
import ReactApexChart from "react-apexcharts";

function LineChartComponent(props) {
  return (
    <ReactApexChart
      options={props.lineChartOptions}
      series={props.series}
      width="100%"
      height="100%"
    />
  );
}

export default LineChartComponent;
