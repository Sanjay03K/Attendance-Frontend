// Academic summary Charts

import React, { useState } from "react";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody.js";
import BarChartComponent from "./BarChart";
import { Flex, Stat, StatLabel } from "@chakra-ui/react";
import axios from "axios";

import { URL, server_URL } from "controller/urls_config";

function BarChartAcademicSummary() {
  const [batches, setbatches] = useState(["2019-2023"]);
  const [chartData, setChartData] = useState({
    "2019-2023": { 8.5: 2, 9.2: 1, 9.9: 1 },
    "2020-2024": { 9.9: 5 },
  });

  let params = new URLSearchParams();
  params.append("batch", localStorage.getItem("batch"));
  params.append("dept", localStorage.getItem("dept"));
  useState(async () => {
    axios.post(server_URL + "AcademicSummaryGraphCA", params).then((items) => {
      setbatches(items.data.batches);
      setChartData(items.data.results);
    });
  });

  return batches.map((res) => {
    return (
      <Card minH="300px">
        <CardBody>
          <Flex flexDirection="column" align="center" justify="center" w="100%">
            <Stat mr="auto">
              <StatLabel
                fontSize="sm"
                color="gray.400"
                fontWeight="bold"
                pb="1.5rem"
              >
                Academic Summary {res}
              </StatLabel>
            </Stat>
            <BarChartComponent
              chartData={Object.values(chartData[res])}
              categories={Object.keys(chartData[res])}
            />
          </Flex>
        </CardBody>
      </Card>
    );
  });
}

export default BarChartAcademicSummary;
