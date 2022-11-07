/** @format */

//Official International Exposure - Student List

import React from "react";

import { Flex, Td, Text, Tr, useColorModeValue } from "@chakra-ui/react";

import { URL } from "controller/urls_config";

function StudentListInternational(props) {
  const { name, email, reg, roll, batch, dept } = props;
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Tr
      cursor=""
      variant="ghost"
      fontSize="md"
      color={textColor}
      fontWeight="bold"
      minWidth="100%"
      onClick={() => {
        localStorage.setItem("International", roll);
        window.location.href = URL + "LICET#/admin3/InternationalData";
      }}
      id={roll}
      _hover={{
        Radius: "20px",
        background: "#bbbbbb",
        color: "white",
      }}
    >
      <Td minWidth="6em">
        <Flex direction="column">
          <Text fontSize="md" color={textColor} fontWeight="bold">
            {roll}
          </Text>
        </Flex>
      </Td>
      <Td minWidth="12em">
        <Flex direction="column">
          <Text fontSize="md" color={textColor} fontWeight="bold">
            {name}
          </Text>
        </Flex>
      </Td>
      <Td minWidth="8em">
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {reg}
        </Text>
      </Td>
      <Td minWidth="5em">
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {dept}
        </Text>
      </Td>
      <Td minWidth="8em">
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {batch}
        </Text>
      </Td>
      <Td minWidth="14em">
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {email}
        </Text>
      </Td>
    </Tr>
  );
}

export default StudentListInternational;
