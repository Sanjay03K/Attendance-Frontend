/** @format */

//Class Advisor International Exposure - Student List

import React from "react";

import { Flex, Td, Text, Tr, useColorModeValue } from "@chakra-ui/react";

import { URL } from "controller/urls_config";

function StudentListInternational(props) {
  const { name, email, reg, roll, batch } = props;
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
        let params = new URLSearchParams();
        params.append("RollNumber", localStorage.getItem("International"));
        window.location.href = URL + "Class-Advisor#/admin1/InternationalData";
      }}
      id={roll}
      _hover={{
        Radius: "20px",
        background: "#bbbbbb",
        color: "white",
      }}
    >
      <Td>
        <Flex direction="column">
          <Text fontSize="md" color={textColor} fontWeight="bold">
            {roll}
          </Text>
        </Flex>
      </Td>
      <Td>
        <Flex direction="column">
          <Text fontSize="md" color={textColor} fontWeight="bold">
            {name}
          </Text>
        </Flex>
      </Td>
      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {reg}
        </Text>
      </Td>
      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {batch}
        </Text>
      </Td>
      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {email}
        </Text>
      </Td>
    </Tr>
  );
}

export default StudentListInternational;
