import React, { useState, useEffect } from "react";
import axios from "axios";
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
  Button,
  Grid,
  GridItem,
  RadioGroup,
  Stack,
  Radio,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { useToast } from '@chakra-ui/react'
import { useHistory } from "react-router-dom";

function ExtraCurricularData() {
  const toast = useToast()
  const toastIdRef = React.useRef()
  const history = useHistory();

  function submit() {
    setload(true)
    var email = localStorage.getItem("email")
    var auth_token = localStorage.getItem("token")
    var code = localStorage.getItem("code")
    var data = JSON.stringify([present])
    var dept = localStorage.getItem("dept")
    var year = localStorage.getItem("year")
    var sem = localStorage.getItem("sem")
    var id  = localStorage.getItem("id")
    axios.post("http://localhost:5000/attendance_marked", {
      email,
      auth_token,
      data,
      dept,
      year,
      sem,
      code,
      id
    }).then(()=>{
      axios.post("http://localhost:5000/attendance",{
        email,
        auth_token,
        data,
        dept,
        year,
        sem,
        code,
        id
      }).then((result)=>{
        toastIdRef.current = toast({ description: result.data, status: 'success',isClosable: true })
        setload(false)
      }).catch((error)=>{
        toastIdRef.current = toast({ description: error.response.data, status: 'error',isClosable: true })
        setload(false)
      })
    }).catch((err)=>{
      toastIdRef.current = toast({ description: "Attendance already marked! Redirecting to dashboard...", status: 'info',isClosable: true })
      setload(false)
      setTimeout(() => {
        history.push('/admin/dashboard')
      }, 2000)
    })
  }

  const [data, setdata] = useState([])
  const [present, setpresent] = useState({})
  const [load, setload] = useState(false)

  useEffect(async () => {
    var email = localStorage.getItem("email")
    var auth_token = localStorage.getItem("token")
    var dept = localStorage.getItem("dept")
    var year = localStorage.getItem("year")
    var sem = localStorage.getItem("sem")
    var id  = localStorage.getItem("id")
    var code = localStorage.getItem("code")

    axios.post("http://localhost:5000/getdetails", {
      email,
      auth_token,
      dept,
      year,
      sem,
      id,
      code
    }).then((items) => {
      for (let i = 0; i < items.data.length; i++) {
        present[items.data[i].register_no] = 1        
      }
      setdata(items.data);
    }).catch((err)=>{
      toastIdRef.current = toast({ description: 'Page can\'t be accessed this way. Redirecting...', status: 'warning',isClosable: true })
      setTimeout(() => {
        history.push('/admin/dashboard')
      }, 2000)
    });
  }, [])

  const textColor = useColorModeValue("gray.700", "white");

  return (
    <>
    <Flex direction="column" pt={{ base: "400px", md: "75px" }}>
      <Grid columns={{ sm: 1, md: 2, xl: 2 }} gap={4}>
        <GridItem>
          <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
            <CardHeader p="6px 0px 22px 0px">
              <Text fontSize="xl" color={textColor} fontWeight="bold">
                Attendance Upload
              </Text>
            </CardHeader>
            <CardBody>
              <Table variant="simple" color={textColor}>
                <Thead>
                  <Tr my=".8rem" pl="0px" color="gray.400">
                    <Th color="gray.400">Student Name</Th>
                    <Th color="gray.400">Register No</Th>
                    <Th color="gray.400">Roll No</Th>
                    <Th color="gray.400">Departemnt</Th>
                    <Th color="gray.400"> Present/Absent </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.length > 0 ? (
                    data.map((items) => (
                      <Tr>
                         <Th color="white.100">{items.name}</Th>
                         <Th color="white.100">{items.register_no}</Th>
                         <Th color="white.100">{items.roll_no}</Th>
                         <Th color="white.100">{items.dept}</Th>
                         <Th style={{textTransform:"none"}}><RadioGroup defaultValue='1' onChange={(e)=>{
                          present[items.register_no] = e;
                         }}>
                          <Stack spacing={5} direction='row'>
                            <Radio colorScheme='blue' value='1'>
                              Present
                            </Radio>
                            <Radio colorScheme='orange' value='0'>
                              Absent
                            </Radio>
                          </Stack>
                        </RadioGroup></Th>
                      </Tr>
                    ))
                  ) : (<></>) }
                </Tbody>
              </Table>
            </CardBody>
          </Card>
        </GridItem>
        <Button
          mt="1em"
          colorScheme="orange"
          alignSelf="flex-end"
          variant="solid"
          width="10%"
          onClick={()=>{submit()}}
          isLoading = {load}
        >
          Submit
        </Button>
      </Grid>
    </Flex>
  </>
  );
}

export default ExtraCurricularData;
