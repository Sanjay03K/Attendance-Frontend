/** @format */

//Official - StudentList GeneralInformation

import {
  Avatar,
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

import { URL } from "controller/urls_config";

function GeneralParticularstablerow(props) {
  const { roll, name, reg, dept, batch, email } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");

  return (
    <Tr
      cursor=""
      variant="ghost"
      fontSize="md"
      color={textColor}
      fontWeight="bold"
      minWidth="100%"
      onClick={() => {
        localStorage.setItem("generalStudent", roll);
        let params = new URLSearchParams();
        params.append("RollNumber", localStorage.getItem("generalStudent"));
        window.location.href = URL + "Admin#/admin4/GeneralInformationdata";
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

export default GeneralParticularstablerow;
