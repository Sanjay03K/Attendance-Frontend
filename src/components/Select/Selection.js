import React from "react";
import GeneralInformationdata from "views/Pages/GeneralInformationdata";
// Chakra imports
import {
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
  SimpleGrid,
  Button,
  ButtonGroup,
  Link,
} from "@chakra-ui/react";

function Selection() {
  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, xl: 1 }} 
      spacing="24px"
      w="100%"
      mt="1rem"
    >
      {/* <FormControl id="dept">
        <FormLabel>Department</FormLabel>
        <Select placeholder="Select Department">
          <option>Computer Science Engineering (CSE)</option>
          <option>Information technology (IT)</option>
          <option>Electronics and Communications Engineering (ECE)</option>
          <option>Electrical & Electronics Engineering (EEE)</option>
          <option>Mechanical Engineering A (MECH A)</option>
          <option>Mechanical Engineering B (MECH B)</option>
        </Select>
      </FormControl> */}

      <FormControl id="batch">
        <FormLabel>Batch</FormLabel>
        <Select placeholder="Select Batch">
          <option>2022</option>
          <option>2023</option>
          <option>2024</option>
          <option>2025</option>
        </Select>
      </FormControl>
    </SimpleGrid>
  );
}

export default Selection;
