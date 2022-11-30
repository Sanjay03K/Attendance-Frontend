import React, { useState, useEffect } from "react";
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
  const [dept, setdept] = useState(null);
  const [course, setcourse] = useState(null);
  const [year, setyear] = useState(null);
  const [day, setday] = useState(null);
  const [sem, setsem] = useState(null);
  const [load, isload] = useState(false);
  const [init, isinit] = useState(null);
  const [done, isdone] = useState(false);
  const [over, isover] = useState(false);
  const [type, istype] = useState(null);

  const [final_course, set_final_course] = useState(null);
  const [final_display, set_final_display] = useState([]);
  const [final_attended, set_final_attended] = useState([]);

  const [under,setunder] = useState([])

  const [i_data, set_i_data] = useState([]);
  const [i_course, set_i_course] = useState(null);
  const [i_dept, set_i_dept] = useState(null);
  const [i_year, set_i_year] = useState(null);
  const [i_sem, set_i_sem] = useState(null);
  const [i_load, is_i_load] = useState(false);
  const [i_start, set_i_start] = useState(null);
  const [i_end, set_i_end] = useState(null);
  const [i_over, is_i_over] = useState(false);

  const [display_dept, set_display_dept] = useState(null);

  const [start, setstart] = useState(null);
  const [end, setend] = useState(null);

  const toast = useToast()
  const toastIdRef = React.useRef()

  const textColor = useColorModeValue("gray.700", "white");
  const inputBg = useColorModeValue("white", "gray.800");
  const mainorange = useColorModeValue("orange.300", "orange.300");

  useEffect(async () => {
    var email = localStorage.getItem("email")
    var auth_token = localStorage.getItem("token")
    axios.post("http://218.248.16.182/segregation",{
      email,
      auth_token
    }).then((results)=>{
      setunder(results.data.courses);
      istype(results.data.access)
      set_display_dept(results.data.dept);
    })
  },[])

  function submit() {
    if(year==null || display_dept==null || sem==null || year=='' || display_dept=='' || sem==''){
      toastIdRef.current = toast({ description: "Select all the fields", status: 'warning',isClosable: true })
    }
    else{
      var dept = display_dept
      var email = localStorage.getItem("email")
      var auth_token = localStorage.getItem("token")
      axios.post("http://218.248.16.182/report", {
        email,
        auth_token,
        year,
        dept,
        sem
      }).then((results)=>{
        if(results.data.count > 0){
          isload(true)
        }
        else{
          isload(false)
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
    var dept = display_dept
    if(end=='' || date==''){
      toastIdRef.current = toast({ description: "Select all the fields", status: 'warning',isClosable: true })
    }
    else{
      axios.post("http://218.248.16.182/full_report", {
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
          let lst = new Set(results.data.map((d)=>{return d.day}))
          lst = [...lst];
          setData(lst)
          isload(false)
        }
      }).catch((err)=>{
        if (err.response.data!=undefined) {
          toastIdRef.current = toast({ description: err.response.data, status: 'error',isClosable: true })
        }
      })
    }
  }

  function get_courses(day) {
    var email = localStorage.getItem("email")
    var auth_token = localStorage.getItem("token")
    var dept = display_dept
    axios.post("http://218.248.16.182/get_courses",{
      email,
      auth_token,
      day,
      end,
      year,
      dept,
      sem
    }).then((results)=>{
      set_final_display(results.data)
      set_final_course(results.data[0]);
      isdone(true)
    })
  }

  function i_final() {
    var email = localStorage.getItem("email")
    var auth_token = localStorage.getItem("token")
    var start = document.getElementById("i_start").value;
    start = start.split('-').join('/')
    set_i_start(start)
    var end = document.getElementById("i_end").value;
    end = end.split('-').join('/')
    set_i_end(end)
    var course = i_course;
    var dept = i_dept;
    var sem = i_sem;
    var year = i_year;
    if(end=='' || start==''){
      toastIdRef.current = toast({ description: "Select all the fields", status: 'warning',isClosable: true })
    }
    else{
      axios.post("http://218.248.16.182/individual",{
        email,
        auth_token,
        start,
        end,
        course,
        dept,
        sem,
        year,
      }).then((results)=>{
        if(results.data.length == 0){
          toastIdRef.current = toast({ description: "No report found", status: 'info',isClosable: true })
        }
        else{
          let lst = new Set(results.data.map((d)=>{
            let keys = Object.keys(d)
            let filtered = keys.filter(k=>{
              if(k.indexOf(i_course)!=-1){return k}
            })
            if(filtered.length!=0){
              return d.day;
            }
            }))
          lst = [...lst];
          if (lst[0] == undefined) {
            toastIdRef.current = toast({ description: "No report found", status: 'info',isClosable: true })
          } else {
            set_i_data(lst)
            set_final_course(results.data)
            is_i_load(false);
          }
        }
      }).catch((err)=>{
        if (err.response.data!=undefined) {
          toastIdRef.current = toast({ description: err.response.data, status: 'error',isClosable: true })
        }
      })
    }
  }

  const downloadXLSFile = async () => {
    var dept = display_dept;
    let s_url = "http://218.248.16.182/download_report?start="+start+"&end="+end+"&email="+localStorage.getItem("email")+"&sem="+sem+"&dept="+dept+"&year="+year+"&auth_token="+localStorage.getItem("token")
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

  const i_downloadXLSFile = async () => {
    let s_url = "http://218.248.16.182/download_indiv?start="+i_start+"&end="+i_end+"&email="+localStorage.getItem("email")+"&sem="+i_sem+"&dept="+i_dept+"&year="+i_year+"&auth_token="+localStorage.getItem("token")+"&course="+i_course;
    const headers = {'Content-Type': 'blob'};
    const config = {method: 'GET', url: s_url, responseType: 'arraybuffer', headers};
    try {
        const response = await axios(config);        
        const outputFilename = i_course+"_"+i_dept+"_"+i_year+"_"+i_sem+"-"+Date.now()+".xlsx";
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
      {
        type == 1 ? (
          <Card mb="1rem">
            <CardBody>
              <Flex flexDirection="column" align="center" justify="center" w="100%">
                <Text fontSize="xl" color={textColor} fontWeight="bold" mr="auto" fontStyle={"initial"}>
                  Report Selection
                </Text>
              </Flex>
            </CardBody>
            <SimpleGrid columns={{ sm: 1, md: 2, xl: 2 }} gap={5}>
                <Box>
                  <CardHeader mt="1em">
                    <Button colorScheme='teal' variant='outline' style={{"width":"40em"}} onClick={()=>{isinit(1); isload(false); isover(false); isdone(false); setData([]); set_i_data([]); setcourse(null); }}>
                      Course Wise Report
                    </Button>
                  </CardHeader>
                </Box>
                <Box>
                  <CardHeader mt="1em">
                    <Button colorScheme='teal' variant='outline' style={{"width":"40em"}} onClick={()=>{isover(false); isinit(0); setsem(null); setyear(null); is_i_load(false); set_i_data([]); setcourse(null); 
                    set_final_attended([]); set_final_display([]); is_i_over(false)
                    }}>
                      Department Report
                    </Button>
                  </CardHeader>
                </Box>
              </SimpleGrid>
          </Card>
        ) : (
          <>
            <Card mb="1rem">
                <CardBody>
                  <Flex flexDirection="column" align="center" justify="center" w="100%">
                    <Text fontSize="xl" color={textColor} fontWeight="bold" mr="auto">
                      Course Report
                    </Text>
                  </Flex>
                </CardBody>
                <SimpleGrid columns={{ sm: 1, md: 1, xl: 1 }} gap={5}>
                    <Box>
                      <CardHeader mt="1em">
                        <Text fontSize="lg" color={textColor} fontWeight="semi">
                          Course List
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
                        <Select placeholder='Select course' onChange={(e)=>{
                          if (e.target.value == '') {
                            toastIdRef.current = toast({ description: "Course not selected", status: 'info',isClosable: true })
                            is_i_load(false)
                            set_i_data([])
                            isover(false)
                            set_final_display([])
                          }
                          else{
                            set_i_course(e.target.value.split('.')[0])
                            set_i_dept(e.target.value.split('.')[1])
                            set_i_year(e.target.value.split('.')[2])
                            set_i_sem(e.target.value.split('.')[3])  
                            is_i_load(true)
                            set_i_data([])
                            isover(false)
                            set_final_display([])
                          }
                        }}>{under.length > 0 ? (
                          under.map((item) => (
                            <>
                              <option value={item.sub+'.'+item.dept+'.'+item.year+'.'+item.sem}>{item.name}{' - '}{item.sub}{' - '}{'('+item.dept+')'}</option>
                            </>
                          ))
                        ) : (<></>) }
                        </Select>
                      </InputGroup>
                    </Box>
                </SimpleGrid>     
              </Card>
          </>
        )
      }

      { init == 0 ? (
                <Card mb="1rem">
                <CardBody>
                  <Flex flexDirection="column" align="center" justify="center" w="100%">
                    <Text fontSize="xl" color={textColor} fontWeight="bold" mr="auto">
                    Department Report
                    </Text>
                  </Flex>
                </CardBody>
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
                        <Select placeholder={display_dept} onChange={(e)=>{
                          setdept(e.target.value)
                        }}>
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
                        }}>{
                          year == 1 ? (
                            <>
                              <option value='1'>1</option>
                              <option value='2'>2</option>
                            </>
                          ) : year == 2 ? (
                            <>
                              <option value='3'>3</option>
                              <option value='4'>4</option>
                            </>
                          ) : year == 3 ?
                          (
                            <>
                              <option value='5'>5</option>
                              <option value='6'>6</option>
                            </>
                          ) : year == 4 ? (
                            <>
                              <option value='7'>7</option>
                              <option value='8'>8</option>
                            </>
                          ) : (
                            <></>
                          )
                        }
                        </Select>
                      </InputGroup>
                    </Box>
                  </SimpleGrid>
        
                <Button
                  mt="1em"
                  onClick={()=>{
                    setData([])
                    isdone(false)
                    isover(false)
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
        ) : init == 1 ? ( 
          <>
            <Card mb="1rem">
                <CardBody>
                  <Flex flexDirection="column" align="center" justify="center" w="100%">
                    <Text fontSize="xl" color={textColor} fontWeight="bold" mr="auto">
                      Course Report
                    </Text>
                  </Flex>
                </CardBody>
                <SimpleGrid columns={{ sm: 1, md: 1, xl: 1 }} gap={5}>
                    <Box>
                      <CardHeader mt="1em">
                        <Text fontSize="lg" color={textColor} fontWeight="semi">
                          Course List
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
                        <Select placeholder='Select course' onChange={(e)=>{
                          if (e.target.value == '') {
                            toastIdRef.current = toast({ description: "Course not selected", status: 'info',isClosable: true })
                            is_i_over(false)
                            is_i_load(false)
                            set_i_data([])
                            isover(false)
                          }
                          else{
                            set_i_course(e.target.value.split('.')[0])
                            set_i_dept(e.target.value.split('.')[1])
                            set_i_year(e.target.value.split('.')[2])
                            set_i_sem(e.target.value.split('.')[3])  
                            is_i_load(true)
                            set_i_data([])
                            isover(false)
                            is_i_over(false)
                          }
                        }}>{under.length > 0 ? (
                          under.map((item) => (
                            <>
                              <option value={item.sub+'.'+item.dept+'.'+item.year+'.'+item.sem}>{item.name}{' - '}{item.sub}{' - '}{'('+item.dept+')'}</option>
                            </>
                          ))
                        ) : (<></>) }
                        </Select>
                      </InputGroup>
                    </Box>
                </SimpleGrid>     
              </Card>
          </> 
        ) : (
          <></>
        )
      }

    {
      i_load ? (
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
                     id="i_start"
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
                     id="i_end"
                   />
                 </InputGroup>
           </Box>
        </SimpleGrid>
        <Button
           mt="1em"
           onClick={()=>{
             i_final()
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
          i_data.length > 0 ? (
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
                  set_final_attended([])
                  if(e.target.value == ''){
                    set_final_display([])
                    is_i_over(false)
                    setcourse(null)
                  }
                  else{
                    is_i_over(false)
                    let new_arr = []
                    for (let i = 0; i < final_course.length; i++) {
                      if (final_course[i].day == e.target.value) {
                        new_arr.push(final_course[i])
                      }
                    }
                    set_final_display(new_arr)
                    is_i_over(true)
                    }
                  }}>
                  {i_data.map((item) => (
                    <option value={item}>{item}</option>
                  ))}
                </Select>
              </InputGroup>
              <Button
                mt="1em"
                onClick={()=>{
                  i_downloadXLSFile()
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
      )
    }

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
                setday(null)
                isover(false)
              }
              else{
                isover(false)
                setday(e.target.value)
                get_courses(e.target.value)  
                if (document.getElementById("cour") != null) {
                  document.getElementById("cour").options.selectedIndex = 0;
                }
              }
              }}>
              {data.map((item) => (
                <option value={item}>{item}</option>
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
                <Select id="cour" placeholder='Choose...' onChange={(e)=>{
                  if(e.target.value != '' ){
                    set_final_attended(e.target.value)
                    isover(true)
                  }
                  else{
                    isover(false)
                  }
                }}>
                  {
                  Object.keys(final_course)
                  .filter((key) => {
                    if(key != 'register_no' && key!='day' && key!='undefined' && key!=''){
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
                {final_display.length > 0 ? (
                        final_display.map((item) => (
                            <>
                              <Tr color="white.100">
                                <Th color="white.100">{item.register_no}</Th>
                                <Th color="white.100">{item[final_attended]}</Th>
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

    {
      i_over ? (
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
                    {
                    final_display.length > 0 ? (
                       Object.keys(final_display[0])
                       .filter((value)=>{
                        if (value!='day' && value!='register_no' && value!='pri_code' && value!='dept' && value!='year' && value!='sem' && value!='mailed') {
                          final_attended.push(value)
                          return value
                        }
                      })
                       .map((value) => (
                            <>
                              <Th color="white.100">{value}</Th>
                            </>
                        )) 
                      ) : (
                      <></>
                    )}
                  </Tr>
                </Thead>
                <Tbody>
                {final_display.length > 0 ? (
                        final_display.map((item) => (
                            <>
                              <Tr color="white.100">
                                <Th color="white.100">{item.register_no}</Th>
                                {
                                  final_attended.map((value) => (
                                    <Th color="white.100">{item[value]}</Th>
                                  ))
                                }    
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
