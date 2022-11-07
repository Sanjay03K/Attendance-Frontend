import React, { Component } from "react";
import Card from "components/Card/Card";
import Chart from "react-apexcharts";

class BarChartComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: [
        {
          name: "Academic Summary",
          data: props.chartData,
        },
      ],
      chartOptions: {
        chart: {
          toolbar: {
            show: false,
          },
        },
        tooltip: {
          style: {
            backgroundColor: "red",
            fontSize: "12px",
            fontFamily: undefined,
          },
          onDatasetHover: {
            style: {
              backgroundColor: "red",
              fontSize: "12px",
              fontFamily: undefined,
            },
          },
          theme: "dark",
        },
        xaxis: {
          categories: props.categories,
          show: true,
          labels: {
            show: true,
            style: {
              colors: "#fff",
              fontSize: "12px",
            },
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          show: true,
          color: "#fff",
          labels: {
            show: true,
            style: {
              colors: "#fff",
              fontSize: "14px",
            },
          },
        },
        grid: {
          show: false,
        },
        fill: {
          colors: "#fff",
        },
        dataLabels: {
          enabled: false,
        },
        plotOptions: {
          bar: {
            borderRadius: 8,
            columnWidth: "12px",
          },
        },
        responsive: [
          {
            breakpoint: 768,
            options: {
              plotOptions: {
                bar: {
                  borderRadius: 0,
                },
              },
            },
          },
        ],
      },
    };
  }

  render() {
    return (
      <Card
        py="1rem"
        height={{ sm: "200px" }}
        width="100%"
        bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
        position="relative"
      >
        <Chart
          options={this.state.chartOptions}
          series={this.state.chartData}
          type="bar"
          width="100%"
          height="100%"
        />
      </Card>
    );
  }
}

export default BarChartComponent;
