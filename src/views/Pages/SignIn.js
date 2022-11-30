import React from "react";
// import axios from "axios";
// Chakra imports
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useColorModeValue,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
// Assets
import signInImage from "assets/img/signInImage.png";
import axios from "axios";
import { useHistory } from "react-router-dom";

function SignIn() {
  localStorage.setItem("token", -1); // Removing session
  const history = useHistory();
  const titleColor = useColorModeValue("orange.300", "orange.200");
  const textColor = useColorModeValue("gray.400", "white");
  const { isOpen, onOpen, onClose } = useDisclosure()
  localStorage.removeItem("name");
  localStorage.removeItem("email");
  localStorage.removeItem("id");
  localStorage.removeItem("courses");
  async function passcheck(){
    document.getElementById("result").innerHTML = "";
    var email = document.getElementById("email").value;
    var password = document.getElementById("pass").value;
    if(email=='' || password==''){
      document.getElementById("result").innerHTML = "Required Email and Password";
    }
    else{
      let res = null
      try {
        res = await axios.post('http://218.248.16.182/login', {
          email,
          password, 
        })
        localStorage.setItem("token", res.data.auth_token);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("name", res.data.name);
        localStorage.setItem("id", res.data.id);
        history.push("/admin/dashboard")
      } catch (err) {
          if (res == null && err.response == undefined) {
            document.getElementById("result").innerHTML = "Server Down";
          }
          else{
            document.getElementById("result").innerHTML = err.response.data;
          }
      }
    }
  }
  
  return (
    <Flex position="relative" mb="40px">
      <Flex
        h={{ sm: "initial", md: "75vh", lg: "85vh" }}
        w="100%"
        maxW="1044px"
        mx="auto"
        justifyContent="space-between"
        mb="30px"
        pt={{ sm: "100px", md: "0px" }}
      >
        <Box
          display={{ base: "none", md: "block" }}
          overflowX="hidden"
          h="100%"
          w="40%"
          paddingTop="13rem"
          position="absolute"
          right="0px"
        >
          <Image src={signInImage} alt="Segun Adebayo" />
        </Box>
        <Flex
          alignItems="center"
          justifyContent="start"
          style={{ userSelect: "none" }}
          w={{ base: "100%", md: "50%", lg: "42%" }}
        >
          <Flex
            direction="column"
            w="100%"
            background="transparent"
            p="48px"
            mt={{ md: "150px", lg: "80px" }}
          >
            <Heading color={titleColor} fontSize="32px" mb="10px">
              Attendance Portal
            </Heading>
            <form>
              <Text
                mb="36px"
                ms="4px"
                color={textColor}
                fontWeight="bold"
                fontSize="14px"
              >
                Enter your email and password to log in
              </Text>
              <FormControl>
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  Email
                </FormLabel>
                <Input
                  borderRadius="15px"
                  mb="24px"
                  fontSize="sm"
                  type="text"
                  id="email"
                  placeholder="Your email adress"
                  size="lg"
                />
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  Password
                </FormLabel>
                <Input
                  borderRadius="15px"
                  mb="20px"
                  fontSize="sm"
                  id="pass"
                  type="password"
                  placeholder="Your password"
                  size="lg"
                />
                <Flex
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  maxW="100%"
                  mt="0px"
                >
                  <Text color="red" id="result">
                  </Text>
                </Flex>
                <Button
                  fontSize="1rem"
                 
                  bg="orange.300"
                  w="100%"
                  h="45"
                  mb="20px"
                  color="white"
                  mt="15px"
                  _hover={{
                    bg: "orange.200",
                  }}
                  _active={{
                    bg: "orange.400",
                  }}
                  id="login_btn"
                  onClick={()=>{passcheck();}}
                >
                  SIGN IN
                </Button>
                
                <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Error!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <h1 >Incorrect password entered</h1> 
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Retry
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
              </FormControl>
            </form>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default SignIn;
