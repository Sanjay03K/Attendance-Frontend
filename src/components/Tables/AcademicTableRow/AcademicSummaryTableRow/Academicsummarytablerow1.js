//Class Advisor AcademicSummaryTableRow

import {
  FormControl,
  Input,
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

function Academicsummarytablerow(props) {
  const { row1, row2, row3, row4 } = props;
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <div>
      {" "}
      <Tr>
        <Td minWidth={{ sm: "225px" }}>
          <Text>Attendance Percentage : {row1}</Text>
        </Td>
      </Tr>
      <Tr>
        <Td minWidth={{ sm: "225px" }}>
          <Text>CGPA : {row2}</Text>
        </Td>
      </Tr>
      <Tr>
        <Td minWidth={{ sm: "225px" }}>
          <Text>Total Credits : {row3}</Text>
        </Td>
      </Tr>
      <Tr>
        <Td minWidth={{ sm: "225px" }}>
          <Text>Placement Eligibility : {row4}</Text>
        </Td>
      </Tr>
    </div>
  );
}

export default Academicsummarytablerow;
