import React, { useState } from "react";
import { Box, Flex, Stat, StatLabel } from "@chakra-ui/react";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

import LineChartComponent from "./LineChart";

import axios from "axios";

import { server_URL } from "controller/urls_config";

function LineChart() {
  const [batches, setbatches] = useState(["2019-2023"]);
  const [batched_result, set_batched_result] = useState({
    "2020-2024": [
      {
        name: "CS123",
        data: [50, 40],
      },
    ],
    "2019-2023": [
      {
        name: "CS123",
        data: [50, 40],
      },
    ],
  });

  const [lineChartOptions, set_linechartOptions] = useState({
    chart: {
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      theme: "dark",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: ["CAT1", "CAT2"],
      labels: {
        style: {
          colors: "#c8cfca",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#c8cfca",
          fontSize: "12px",
        },
      },
    },
    legend: {
      show: true,
    },
    grid: {
      strokeDashArray: 5,
    },
    fill: {
      colors: ["#aba0ef", "#2D3748", "#2D3790"],
    },
    colors: ["#aba0ef", "#2D3748", "#2D3790"],
  });

  let params = new URLSearchParams();
  params.append("batch", localStorage.getItem("batch"));
  params.append("dept", localStorage.getItem("dept"));

  useState(async () => {
    axios.post(server_URL + "AcademicsGraphCA", params).then((items) => {
      set_batched_result(items.data.batched_result);
      setbatches(Object.keys(items.data.batched_result));
      set_linechartOptions({
        ...lineChartOptions,
        xaxis: {
          categories: items.data.exams,
          labels: {
            style: {
              colors: "#c8cfca",
              fontSize: "12px",
            },
          },
        },
      });
    });
  });

  return (
    <>
      {batches.map((res) => {
        return (
          <Card minH="300px">
            <CardBody>
              <Flex
                flexDirection="column"
                align="center"
                justify="center"
                w="100%"
              >
                <Stat mr="auto">
                  <StatLabel
                    fontSize="sm"
                    color="gray.400"
                    fontWeight="bold"
                    pb="1.5rem"
                  >
                    Academics {res}
                  </StatLabel>
                </Stat>
                <Box w="100%" h={{ sm: "225px" }} ps="8px">
                  <LineChartComponent
                    lineChartOptions={lineChartOptions}
                    series={batched_result[res]}
                  />
                </Box>
              </Flex>
            </CardBody>
          </Card>
        );
      })}
    </>
  );
}

export default LineChart;
