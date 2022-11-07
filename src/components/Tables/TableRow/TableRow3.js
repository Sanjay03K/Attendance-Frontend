//Table with 4 columns

import {
  FormControl,
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

function TableRow4(props) {
  const { row1, row2, row3, row4 } = props;
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Tr>
      <Td minWidth={{ sm: "16em" }}>
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
      <Td minWidth={{ sm: "16em" }}>
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Flex direction="column">{row2}</Flex>
        </Flex>
      </Td>
      <Td minWidth={{ sm: "16em" }}>
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <FormControl>
            <Flex direction="column">{row3}</Flex>
          </FormControl>
        </Flex>
      </Td>
    </Tr>
  );
}

export default TableRow4;
