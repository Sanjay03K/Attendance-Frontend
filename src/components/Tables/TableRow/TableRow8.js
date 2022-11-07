/** @format */

//Table with 7 columns

import {
  FormControl,
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

function TableRow8(props) {
  const { row1, row2, row3, row4, row5, row6, row7, row8 } = props;
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Tr>
      <Td minWidth="15em">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Flex direction="column">
            <Text
              fontSize="md"
              color={textColor}
              fontWeight="bold"
              minWidth="100%"
            >
              {row1}
            </Text>
          </Flex>
        </Flex>
      </Td>
      <Td minWidth="15em">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Flex direction="column">{row2}</Flex>
        </Flex>
      </Td>
      <Td minWidth="15em">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <FormControl>
            <Flex direction="column">{row3}</Flex>
          </FormControl>
        </Flex>
      </Td>
      <Td minWidth="15em">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <FormControl>
            <Flex direction="column">{row4}</Flex>
          </FormControl>
        </Flex>
      </Td>
      <Td minWidth="15em">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <FormControl>
            <Flex direction="column">{row5}</Flex>
          </FormControl>
        </Flex>
      </Td>
      <Td minWidth="15em">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <FormControl>
            <Flex direction="column">{row6}</Flex>
          </FormControl>
        </Flex>
      </Td>
      <Td minWidth="5em">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <FormControl>
            <Flex direction="column">{row7}</Flex>
          </FormControl>
        </Flex>
      </Td>
      <Td minWidth="5em">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <FormControl>
            <Flex direction="column">{row8}</Flex>
          </FormControl>
        </Flex>
      </Td>
    </Tr>
  );
}

export default TableRow8;
