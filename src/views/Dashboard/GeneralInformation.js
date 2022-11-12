import React, { useState } from "react";
import axios, { AxiosRequestConfig } from 'axios';
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
  Input,
  InputGroup,
  SimpleGrid,
  Box,
  Spinner
} from "@chakra-ui/react";

// Custom components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { Select } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'

function GeneralInformation() {  
  const [data, setData] = useState([]);
  const [dayData, setdayData] = useState({});
  const [count, setCount] = useState(0);
  const [dept, setdept] = useState(null);
  const [course, setcourse] = useState(null);
  const [year, setyear] = useState(null);
  const [day, setday] = useState(null);
  const [sem, setsem] = useState(null);
  const [load, isload] = useState(false);
  const [done, isdone] = useState(false);
  const [over, isover] = useState(false);

  const [start, setstart] = useState(null);
  const [end, setend] = useState(null);

  const toast = useToast()
  const toastIdRef = React.useRef()

  const textColor = useColorModeValue("gray.700", "white");
  const inputBg = useColorModeValue("white", "gray.800");
  const mainorange = useColorModeValue("orange.300", "orange.300");

  function submit() {
    if(year==null || dept==null || sem==null || year=='' || dept=='' || sem==''){
      toastIdRef.current = toast({ description: "Select all the fields", status: 'warning',isClosable: true })
    }
    else{
      var email = localStorage.getItem("email")
      var auth_token = localStorage.getItem("token")
      axios.post("http://localhost:5000/report", {
        email,
        auth_token,
        year,
        dept,
        sem
      }).then((results)=>{
        if(results.data.length > 0){
          isload(true)
        }
        else{
          toastIdRef.current = toast({ description: "No report found", status: 'info',isClosable: true })
        }
      }).catch(()=>{
        toastIdRef.current = toast({ description: "No report found", status: 'info',isClosable: true })
      })
    }
  }

  function final() {
    var email = localStorage.getItem("email")
    var auth_token = localStorage.getItem("token")
    var date = document.getElementById("date").value;
    date = date.split('-').join('/')
    setstart(date)
    var end = document.getElementById("end").value;
    end = end.split('-').join('/')
    setend(end)
    if(end=='' || date==''){
      toastIdRef.current = toast({ description: "Select all the fields", status: 'warning',isClosable: true })
    }
    else{
      axios.post("http://localhost:5000/full_report", {
        email,
        auth_token,
        date,
        end,
        year,
        dept,
        sem
      }).then((results)=>{
        if(results.data.length == 0){
          toastIdRef.current = toast({ description: "No report found", status: 'info',isClosable: true })
        }
        else{
          localStorage.setItem("data",results.data)
          setData(results.data)
          isload(false)
        }
      }).catch((err)=>{
        if (err.response.data!=undefined) {
          toastIdRef.current = toast({ description: err.response.data, status: 'error',isClosable: true })
        }
      })
    }
  }

  const downloadXLSFile = async () => {
    let s_url = "http://localhost:5000/download_report?start="+start+"&end="+end+"&email="+localStorage.getItem("email")+"&sem="+sem+"&dept="+dept+"&year="+year+"&auth_token="+localStorage.getItem("token")
    const headers = {'Content-Type': 'blob'};
    const config = {method: 'GET', url: s_url, responseType: 'arraybuffer', headers};
    try {
        const response = await axios(config);        
        const outputFilename = dept+"_"+year+"_"+sem+"-"+Date.now()+".xlsx";
        const url = URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', outputFilename);
        document.body.appendChild(link);
        link.click();
        link.remove();
    } catch (error) {
        throw Error(error);
    }
  }

  return (
    <Flex direction="column" pt={{ base: "400px", md: "75px" }}>

      <Card mb="1rem">
        <CardBody>
          <Flex flexDirection="column" align="center" justify="center" w="100%">
            <Text fontSize="xl" color={textColor} fontWeight="bold" mr="auto">
              View Report
            </Text>
          </Flex>
        </CardBody>
        <CardHeader mt="1em">
          {/* <Text fontSize="lg" color={textColor} fontWeight="semi">
            Search Student
          </Text> */}
        </CardHeader>
        <SimpleGrid columns={{ sm: 1, md: 3, xl: 3 }} gap={5}>
            <Box>
              <CardHeader mt="1em">
                <Text fontSize="lg" color={textColor} fontWeight="semi">
                  Department
                </Text>
              </CardHeader>

              <InputGroup
                bg={inputBg}
                mt="1rem"
                borderRadius="15px"
                w="cover"
                _focus={{
                  borderColor: { mainorange },
                }}
                _active={{
                  borderColor: { mainorange },
                }}
              >
                <Select placeholder='Select Department' onChange={(e)=>{
                  setdept(e.target.value)
                }}>
                  <option value='MECH'>MECH</option>
                  <option value='CSE'>CSE</option>
                  <option value='ECE'>ECE</option>
                  <option value='EEE'>EEE</option>
                  <option value='IT'>IT</option>
                </Select>
              </InputGroup>
            </Box>

            <Box>
              <CardHeader mt="1em">
                <Text fontSize="lg" color={textColor} fontWeight="semi">
                  Year
                </Text>
              </CardHeader>

              <InputGroup
                bg={inputBg}
                mt="1rem"
                borderRadius="15px"
                w="cover"
                _focus={{
                  borderColor: { mainorange },
                }}
                _active={{
                  borderColor: { mainorange },
                }}
              >
                <Select placeholder='Select Year' onChange={(e)=>{
                  setyear(e.target.value)
                }}>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                </Select>
              </InputGroup>
            </Box>

            <Box>
              <CardHeader mt="1em">
                <Text fontSize="lg" color={textColor} fontWeight="semi">
                  Semester
                </Text>
              </CardHeader>
              <InputGroup
                bg={inputBg}
                mt="1rem"
                borderRadius="15px"
                w="cover"
                _focus={{
                  borderColor: { mainorange },
                }}
                _active={{
                  borderColor: { mainorange },
                }}
              >
               <Select placeholder='Select Semester' onChange={(e)=>{
                  setsem(e.target.value)
                }}>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                  <option value='6'>6</option>
                  <option value='7'>7</option>
                  <option value='8'>8</option>
                </Select>
              </InputGroup>
            </Box>
          </SimpleGrid>

        <Button
          mt="1em"
          onClick={()=>{
            submit()
          }}
          colorScheme="orange"
          alignSelf="flex-end"
          variant="solid"
          width="25%"
        >
          Submit
        </Button>
      </Card>

    {load ? (
       <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
       <SimpleGrid columns={{ sm: 1, md: 2, xl: 2 }} gap={5}>
          <Box>
                <CardHeader mt="1em">
                  <Text fontSize="lg" color={textColor} fontWeight="semi">
                    Start Date
                  </Text>
                </CardHeader>

                <InputGroup
                  bg={inputBg}
                  mt="1rem"
                  borderRadius="15px"
                  w="cover"
                  _focus={{
                    borderColor: { mainorange },
                  }}
                  _active={{
                    borderColor: { mainorange },
                  }}
                >
                  <Input
                    placeholder="Select Date and Time"
                    size="md"
                    type="date"
                    id="date"
                  />
                </InputGroup>
          </Box>
          <Box>
                <CardHeader mt="1em">
                  <Text fontSize="lg" color={textColor} fontWeight="semi">
                    End Date
                  </Text>
                </CardHeader>

                <InputGroup
                  bg={inputBg}
                  mt="1rem"
                  borderRadius="15px"
                  w="cover"
                  _focus={{
                    borderColor: { mainorange },
                  }}
                  _active={{
                    borderColor: { mainorange },
                  }}
                >
                  <Input
                    placeholder="Select Date and Time"
                    size="md"
                    type="date"
                    id="end"
                  />
                </InputGroup>
          </Box>
       </SimpleGrid>
       <Button
          mt="1em"
          onClick={()=>{
            final()
          }}
          colorScheme="orange"
          alignSelf="flex-end"
          variant="solid"
          width="25%"
        >
          Submit  
        </Button>
     </Card>
    ) : (
      <>
      {
      data.length > 0 ? (
      <Card overflowX={{ sm: "scroll", xl: "hidden" }}>          
        <CardHeader mt="1em">
            <Text fontSize="lg" color={textColor} fontWeight="semi">
              Select Date
            </Text>
          </CardHeader>
          <InputGroup
            bg={inputBg}
            mt="1rem"
            borderRadius="15px"
            w="cover"
            _focus={{
              borderColor: { mainorange },
            }}
            _active={{
              borderColor: { mainorange },
            }}
          >
            <Select placeholder='Choose...' onChange={(e)=>{
              if(e.target.value == ''){
                isdone(false)
                setcourse(null)
                isover(false)
              }
              else{
                setcourse(null)
                isover(false)
                  for (let i = 0; i < data.length; i++) {
                    if(data[i].day == e.target.value){
                      setdayData(data[i])
                    }
                  }
                  setday(e.target.value)
                  isdone(true)
                }
              }}>
              {data.map((item) => (
                <option value={item.day}>{item.day}</option>
              ))}
            </Select>
          </InputGroup>
          <Button
            mt="1em"
            onClick={()=>{
              downloadXLSFile()
            }}
            colorScheme="blue"
            alignSelf="flex-end"
            variant="solid"
            width="25%"
          >
            Download Report  
        </Button>
      </Card>
      ) : (
        <></>
      )}
      </>
    )}  

    {
      done ? (
        <>
          <br/>
          <Card overflowX={{ sm: "scroll", xl: "hidden" }}>          
            <CardHeader mt="1em">
                <Text fontSize="lg" color={textColor} fontWeight="semi">
                  Select Course
                </Text>
              </CardHeader>
              <InputGroup
                bg={inputBg}
                mt="1rem"
                borderRadius="15px"
                w="cover"
                _focus={{
                  borderColor: { mainorange },
                }}
                _active={{
                  borderColor: { mainorange },
                }}
              >
                <Select placeholder='Choose...' onChange={(e)=>{
                  if (dayData[e.target.value] == null && e.target.value != ''){
                    isover(false)
                    toastIdRef.current = toast({ description: "No report found", status: 'info',isClosable: true })
                  }
                  else if(e.target.value != ''){
                    setcourse(JSON.parse(dayData[e.target.value])[0]);
                    isover(true)
                  }
                }}>
                  {
                  Object.keys(dayData)
                  .filter((key) => {
                    if(key != 'day'){
                       return key 
                    }
                  })
                  .map((key,i) => (
                    <option value={key}>{key}</option>
                  ))
                  }
                </Select>
              </InputGroup>
          </Card>
        </>
      ) :
      <></>
    }

    {
      over ? (
        <>
        <br/>
        <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
            <CardHeader p="6px 0px 22px 0px">
              <Text fontSize="xl" color={textColor} fontWeight="bold">
                Students List
              </Text>
            </CardHeader>
            <CardBody>
              <Table variant="simple" color={textColor}>
                <Thead>
                  <Tr my=".8rem" pl="0px" color="gray.400">
                    <Th color="gray.400">Register No</Th>
                    <Th color="gray.400">Attended</Th>
                  </Tr>
                </Thead>
                <Tbody>
                {Object.keys(course).length > 0 ? (
                        Object.keys(course).map((key,i) => (
                            <>
                              <Tr color="white.100">
                                <Th color="white.100">{key}</Th>
                                <Th color="white.100">{course[key]}</Th>
                              </Tr>
                            </>
                        )) 
                      ) : (
                      <></>
                    )}
                </Tbody>
              </Table>
            </CardBody>
          </Card>
        </>
      ) : (
        <></>
      )
    }

    </Flex>
  );
}

export default GeneralInformation;
