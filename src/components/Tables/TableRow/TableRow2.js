/** @format */

//Table with 2 columns

import { Flex, Td, Text, Tr, useColorModeValue } from "@chakra-ui/react";
import React from "react";

function TableRow2(props) {
  const { field, data } = props;
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Tr>
      <Td minWidth={{ sm: "44vw", md: "30vw", lg: "10em", xl: "13vw" }}>
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Flex direction="column">
            <Text
              marginLeft="1em"
              fontSize="md"
              color={textColor}
              fontWeight="bold"
              minWidth="100%"
            >
              {field}
            </Text>
          </Flex>
        </Flex>
      </Td>
      <Td minWidth={{ sm: "1vw", md: "1vw", lg: "1vw", xl: "1vw" }}>
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Flex direction="column">
            <Text
              fontSize="md"
              color={textColor}
              fontWeight="light-bold"
              minWidth="100%"
            >
              :
            </Text>
          </Flex>
        </Flex>
      </Td>
      <Td minWidth={{ sm: "70vw", md: "52vw", lg: "12em", xl: "18vw" }}>
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Flex direction="column">
            <Text
              fontSize="md"
              color={textColor}
              fontWeight="light-bold"
              minWidth="100%"
            >
              {data}
            </Text>
          </Flex>
        </Flex>
      </Td>
    </Tr>
  );
}

export default TableRow2;
