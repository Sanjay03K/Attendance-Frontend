import React, { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from 'axios';
import { useDisclosure } from '@chakra-ui/react'
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
  Spinner,
  TableCaption,
  TableContainer,
  Td,
  Tfoot,
  FormControl,
  FormLabel
} from "@chakra-ui/react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

// Custom components
import CardHeader from "components/Card/CardHeader.js";
import { Select } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'

function TimeTable() {  

  let [timetable, settimetable] = useState({'monday':[{"name":'abc'}]});
  const [year,setyear] = useState(null)
  const [day,setday] = useState('monday')
  const [period,setperiod] = useState(null)
  const [id,setid] = useState(null)
  const [code,setcode] = useState(null)
  const toast = useToast()
  const toastIdRef = React.useRef()

  const textColor = useColorModeValue("gray.700", "white");
  const inputBg = useColorModeValue("white", "gray.800");
  const mainorange = useColorModeValue("orange.300", "orange.300");
  const [visible,setvisible] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

  function edit_period(){
    var email = localStorage.getItem("email")

    axios.post("http://192.168.10.11:8080/update_time_table",{
      email,
      day,
      year,
      id,
      code,
      period
    }).then((results)=>{
      if(results){
        toastIdRef.current = toast({ description: "Updated Successfully", status: 'success',isClosable: true })
      }
      else{
        toastIdRef.current = toast({ description: "Problem in Updation", status: 'error',isClosable: true })

      }
    })
  }

  function submit(){
    var email = localStorage.getItem("email")
    var auth_token = localStorage.getItem("token")

    toastIdRef.current = toast({ description: "Searching...", status: 'success',isClosable: true })
    axios.post("http://192.168.10.11:8080/get_time_table",{
      email,
      auth_token,
      year
    }).then((results)=>{
      console.log(results)
      settimetable(results.data.message);
      setvisible(true)
    })
  }

  return (
    <Flex direction="column" pt={{ base: "400px", md: "75px" }}>
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
                <br/><br/>
                  {visible &&                 <TableContainer>
  <Table variant='simple'>
    <Thead>
      <Tr>
        <Th>Day</Th>
        <Th>Period-1</Th>
        <Th>Period-2</Th>
        <Th>Period-3</Th>
        <Th>Period-4</Th>
        <Th>Period-5</Th>
        <Th>Period-6</Th>
        <Th>Period-7</Th>
        <Th>Period-8</Th>
        <Th>Edit</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>Monday</Td>
        {timetable['monday'].map(res=>{
          return (<Td>{"("+res['code']+") "+res['name']}</Td>)
        })}
        <Td><Button onClick={()=>{setday('monday');onOpen();}}>Edit</Button></Td>
      </Tr>
      <Tr>
        <Td>Tuesday</Td>
        {timetable['tuesday'].map(res=>{
          return (<Td>{"("+res['code']+") "+res['name']}</Td>)
        })}
        <Td><Button onClick={()=>{setday('tuesday');onOpen();}}>Edit</Button></Td>

      </Tr>
      <Tr>
        <Td>Wednesday</Td>
        {timetable['wednesday'].map(res=>{
          return (<Td>{"("+res['code']+") "+res['name']}</Td>)
        })}
        <Td><Button onClick={()=>{setday('wednesday');onOpen();}}>Edit</Button></Td>

      </Tr>
      <Tr>
        <Td>Thursday</Td>
        {timetable['thursday'].map(res=>{
          return (<Td>{"("+res['code']+") "+res['name']}</Td>)
        })}
        <Td><Button onClick={()=>{setday('thursday');onOpen();}}>Edit</Button></Td>

      </Tr>
      <Tr>
        <Td>Friday</Td>
        {timetable['friday'].map(res=>{
          return (<Td>{"("+res['code']+") "+res['name']}</Td>)
        })}
        <Td><Button onClick={()=>{setday('friday');onOpen();}}>Edit</Button></Td>

      </Tr>
    </Tbody>
  </Table> 
</TableContainer> }
<Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Enter the Period</FormLabel>
              <Select placeholder='Select Period' onChange={(e)=>{
                        setperiod(e.value)}}>
                          <option value='08:00:00'>1</option>
                          <option value='09:00:00'>2</option>
                          <option value='10:10:00'>3</option>
                          <option value='11:00:00'>4</option>
                          <option value='11:50:00'>5</option>
                          <option value='13:30:00'>6</option>
                          <option value='14:20:00'>7</option>
                          <option value='15:10:00'>8</option>

                        </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Enter the Faculty to be Assigned</FormLabel>
              <Select placeholder=" " onChange={(e)=>{
                        setid(e.value)}}>
                          {timetable[day].map(res=>{
                            return(<option value={res.id}>{res.name}</option>)
                          })}
                        </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Enter the code of the subject</FormLabel>
              <Select placeholder=" " onChange={(e)=>{
                        setcode(e.value)}}>
                          {timetable[day].map(res=>{
                            return(<option value={res.code}>{res.code}</option>)
                          })}
                        </Select>
            </FormControl>


          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={edit_period}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default TimeTable;
