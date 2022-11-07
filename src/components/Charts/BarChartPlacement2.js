// Placement Charts

import React, { Component, useState } from "react";
import Card from "components/Card/Card";
import Chart from "react-apexcharts";
import { barChartData, barChartOptions } from "variables/charts";

import axios from "axios";

import { URL, server_URL } from "controller/urls_config";

let chartOptions = {
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
    categories: ["2019-2023"],
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
};

function BarChartPlacement() {
  const [chartData, setChartData] = useState({
    name: "Internship",
    data: [],
  });
  const [chartOptions, setchartOptions] = useState({
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
      categories: ["2019-2023"],
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
  });

  let params = new URLSearchParams();
  params.append("batch", localStorage.getItem("batch"));
  params.append("dept", localStorage.getItem("dept"));

  useState(async () => {
    axios.post(server_URL + "PlacementGraphHOD", params).then((items) => {
      setChartData({ ...chartData, data: items.data.placement_lst });
      setchartOptions({
        ...chartOptions,
        xaxis: {
          categories: items.data.batches,
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
      });
    });
  });

  return (
    <Card
      py="1rem"
      height={{ sm: "200px" }}
      width="100%"
      bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
      position="relative"
    >
      <Chart
        options={chartOptions}
        series={[chartData]}
        type="bar"
        width="100%"
        height="100%"
      />
    </Card>
  );
}

export default BarChartPlacement;
