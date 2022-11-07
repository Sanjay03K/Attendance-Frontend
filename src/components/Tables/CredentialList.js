/** @format */

//Class Advisor Academic - StudentList

import React, { useState, useEffect } from "react";

import {
  Avatar,
  Badge,
  Button,
  Flex,
  Td, 
  Text,
  Tr,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
  Input,
  Tooltip
} from "@chakra-ui/react";
import axios from "axios";

import { server_URL } from "controller/urls_config";

function CredentialList(props) {
  const toast = useToast()

  const { email, roll, batch, dept, user_type,password } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const statuses = ['success', 'error', 'warning', 'info']

  function cred_delete() {
    let params = new URLSearchParams();
    params.append("email",email);
      axios.post(server_URL + "admin_delete_creds", params).then((results)=>{
        if(results.data == "removed"){
          localStorage.setItem("result","Deleted Successfully");
        }
        else{
          localStorage.setItem("result","Unable to delete credential");
        }
      })
    }

    function cred_edit() {
      let params = new URLSearchParams();
      var user = document.getElementById("UID").value
      var lower = user.toLowerCase();
      if (lower== "student") {
        params.append("user_type",0);
      }
      else if (lower== "class advisor") {
        params.append("user_type",1);
      }
      else if(lower== "hod"){
        params.append("user_type",2);
      }
      else if (lower== "official") {
        params.append("user_type",3);
      }
      else if (lower== "admin") {
        params.append("user_type",4);
      } 
      params.append("email",document.getElementById("EID").value);
      params.append("password",document.getElementById("PID").value);
      params.append("roll_no",document.getElementById("RID").value);
      params.append("dept",document.getElementById("DID").value);
      params.append("batch",document.getElementById("BID").value);
      axios.post(server_URL + "admin_edit_creds", params).then((results)=>{
        if (results.data == "edited") {
          setTimeout(() => {
            document.getElementById("rf").style.display = "none";
          document.getElementById("rs").style.display = "none";
          }, 2000);
          document.getElementById("rf").style.display = "none";
          document.getElementById("rs").style.display = "block";
        }
        else{
          setTimeout(() => {
            document.getElementById("rf").style.display = "none";
          document.getElementById("rs").style.display = "none";
          }, 2000);
          document.getElementById("rs").style.display = "none";
          document.getElementById("rf").style.display = "block";
        }
      });
    }

    function fun_reload() {
      window.location.reload(false);
    }

  return (
    <Tr
      cursor=""
      variant="ghost"
      fontSize="md"
      color={textColor}
      fontWeight="bold"
      minWidth="100%"
      id={email}
      _hover={{ 
        Radius: "20px",
        background: "#bbbbbb",
        color: "white",
      }}
    >
      <Td>
        <Flex direction="column">
          <Text fontSize="md" color={textColor} fontWeight="bold">
            {email}
          </Text>
        </Flex>
      </Td>
      <Td>
        <Flex direction="column">
          <Text fontSize="md" color={textColor} fontWeight="bold">
            {roll}
          </Text>
        </Flex>
      </Td>
      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {dept}
        </Text>
      </Td>
      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {batch}
        </Text>
      </Td>
      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {user_type}
        </Text>
      </Td>
      <Td>
        <Button
          onClick={onOpen}
          bg="orange.300"
          alignSelf="flex-end"
          width="fit-content"
        >
          Edit
        </Button>
        <Modal
        isOpen={isOpen}
        onClose={()=>{onClose();fun_reload();}}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Credential</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
          <Tr>
                <Td>
                  <Text m="1em">Email</Text>
                </Td>
                <Td>
                  <Input
                    minWidth="20em"
                    borderRadius="5px"
                    fontSize="sm"
                    type="text"
                    defaultValue={email}
                    id="EID"
                    disabled = {true}
                  />
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Text m="1em">Password</Text>
                </Td>
                <Td>
                <Tooltip label="Password displayed will only be in hashed format. If you want to change the password enter it in normal form (eg : licet@786)." placement="right">
                  <Input
                    minWidth="20em"
                    borderRadius="5px"
                    fontSize="sm"
                    type="text"
                    defaultValue={password}
                    id="PID"
                  />
                  </Tooltip>
                </Td>
              </Tr>
          <Tr>
                <Td>
                  <Text m="1em">Roll No</Text>
                </Td>
                <Td>
                  <Input
                    minWidth="20em"
                    borderRadius="5px"
                    fontSize="sm"
                    type="text"
                    defaultValue={roll}
                    id="RID"
                  />
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Text m="1em">Department</Text>
                </Td>
                <Td>
                  <Input
                    minWidth="20em"
                    borderRadius="5px"
                    fontSize="sm"
                    type="text"
                    defaultValue={dept}
                    id="DID"
                  />
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Text m="1em">Batch</Text>
                </Td>
                <Td>
                  <Input
                    minWidth="20em"
                    borderRadius="5px"
                    fontSize="sm"
                    type="text"
                    defaultValue={batch}
                    id="BID"
                  />
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Text m="1em">User Type</Text>
                </Td>
                <Td>
                <Tooltip label="Enter 0 for student, 1 for class advisor, 2 for hod, 3 for official, 4 for admin" placement="right">
                  <Input
                    minWidth="20em"
                    borderRadius="5px"
                    fontSize="sm"
                    type="text"
                    defaultValue={user_type}
                    id="UID"
                  />
                  </Tooltip>
                </Td>
              </Tr>
              <p id="rs" style={{display:"none",color:"green",textAlign:"center"}}>Edited Successfully</p>
              <p id="rf" style={{display:"none",color:"red"}}>Edit Failed</p>
          </ModalBody>

          <ModalFooter>
            <Button onClick={()=>{cred_edit(); 
            
          }} 
          colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={()=>{onClose();fun_reload()}}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </Td>
      <Td>

        <Button
          onClick={()=>{cred_delete(); 
            toast({
            title: `${localStorage.getItem('result')}`,
            status: "success",
            duration: 1000,
            position: "top",
            isClosable: true,
            onCloseComplete: fun_reload
            });
          }}
          bg="orange.300"
          alignSelf="flex-end"
          width="fit-content"
        >
          Delete
        </Button>
      </Td>
    </Tr>
  );
}

export default CredentialList;
