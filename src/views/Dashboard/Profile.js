/** @format */

//Student Profile

import React, { useState, useEffect } from "react";
import change_pass from "../../controller/changepassword";
// Chakra imports
import {
  Box,
  Button,
  Flex,
  SimpleGrid,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Portal,
  Tr,
  Td,
  Input,
  Text,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { SettingsIcon, EditIcon } from "@chakra-ui/icons";

import axios from "axios";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
// Assets
import ProfileBgImage from "assets/img/ProfileBackground.png";

import { server_URL } from "controller/urls_config";

function Profile() {
  function validation() {
    document.getElementById("pass-success").style.display = "none";
    var oldpass = document.getElementById("old-pass").value;
    var newpass = document.getElementById("new-pass").value;
    var repass = document.getElementById("re-pass").value;
    var numbers = /[0-9]/g;
    var lowercase = /[a-z]/g;
    var uppercase = /[A-Z]/g;
    var symbol = /[!@#$%^&*]/g;
    var checknum = newpass.match(numbers);
    var checklower = newpass.match(lowercase);
    var checkupper = newpass.match(uppercase);
    var checksymbol = newpass.match(symbol);
    var passlen = newpass.length;
    // var repass = document.getElementById("repassword").value;
    if (
      oldpass == newpass ||
      passlen < 8 ||
      checknum == null ||
      checklower == null ||
      checkupper == null ||
      checksymbol == null ||
      passlen >= 15 ||
      newpass !== repass
    ) {
      if (oldpass == newpass) {
        document.getElementById("pass-same").style.display = "block";
      } else {
        document.getElementById("pass-same").style.display = "none";
      }

      if (passlen < 8) {
        document.getElementById("pass-len").style.display = "block";
      } else {
        document.getElementById("pass-len").style.display = "none";
      }

      if (checknum == null) {
        document.getElementById("pass-num").style.display = "block";
      } else {
        document.getElementById("pass-num").style.display = "none";
      }

      if (checklower == null) {
        document.getElementById("pass-lower").style.display = "block";
      } else {
        document.getElementById("pass-lower").style.display = "none";
      }

      if (checkupper == null) {
        document.getElementById("pass-upper").style.display = "block";
      } else {
        document.getElementById("pass-upper").style.display = "none";
      }

      if (checksymbol == null) {
        document.getElementById("pass-symbol").style.display = "block";
      } else {
        document.getElementById("pass-symbol").style.display = "none";
      }

      if (passlen <= 15) {
        document.getElementById("pass-valid").style.display = "none";
      } else {
        document.getElementById("pass-valid").style.display = "block";
      }

      if (newpass == repass) {
        document.getElementById("pass-equal").style.display = "none";
      } else {
        document.getElementById("pass-equal").style.display = "block";
      }
    } else {
      document.getElementById("pass-same").style.display = "none";
      document.getElementById("pass-len").style.display = "none";
      document.getElementById("pass-num").style.display = "none";
      document.getElementById("pass-lower").style.display = "none";
      document.getElementById("pass-upper").style.display = "none";
      document.getElementById("pass-symbol").style.display = "none";
      document.getElementById("pass-valid").style.display = "none";
      document.getElementById("pass-equal").style.display = "none";
      change_pass();
    }
  }
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const bgProfile = useColorModeValue(
    "hsla(0,0%,100%,.8)",
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)"
  );
  const borderProfileColor = useColorModeValue(
    "white",
    "rgba(255, 255, 255, 0.31)"
  );
  const emailColor = useColorModeValue("gray.400", "gray.300");
  const [data, setData] = useState([]);

  return (
    <Flex direction="column">
    <Box
      mb={{ sm: "70px" }}
      borderRadius="15px"
      px="0px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      align="center"
    >
      <Box
        bgImage={ProfileBgImage}
        bgSize="cover"
        w="100%"
        h="250px"
        borderRadius="25px"
        bgPosition="50%"
        bgRepeat="no-repeat"
        position="relative"
        display="flex"
        justifyContent="center"
      >
        <Flex
          direction={{ sm: "column", md: "row" }}
          mt={{ sm: "3em", md: "0em" }}
          maxH="330px"
          w={{ sm: "90%", xl: "95%" }}
          justifyContent={{ sm: "space-between" }}
          align="center"
          backdropFilter="saturate(200%) blur(50px)"
          position="absolute"
          boxShadow="0px 2px 5.5px rgba(0, 0, 0, 0.02)"
          border="2px solid"
          borderColor={borderProfileColor}
          bg={bgProfile}
          p="24px"
          borderRadius="20px"
          transform={{
            sm: "translateY(45%)",
            md: "translateY(120%)",
            lg: "translateY(120%)",
          }}
        >
          <Flex
            align="center"
            mb={{ sm: "10px", md: "0px" }}
            direction={{ sm: "column", md: "row" }}
            w={{ sm: "100%" }}
            textAlign={{ sm: "center", md: "start" }}
          >
            <Flex direction="column" maxWidth="100%" my={{ sm: "14px" }}>
              <Text
                fontSize={{ sm: "lg", lg: "xl" }}
                color={textColor}
                fontWeight="bold"
                ms={{ sm: "8px", md: "0px" }}
              >
                {localStorage.getItem("name")}
              </Text>
              <Text
                fontSize={{ sm: "sm", md: "md" }}
                color={emailColor}
                fontWeight="semibold"
              >
                {localStorage.getItem("email")}
              </Text>
            </Flex>
          </Flex>
          <Popover placement="auto">
            <PopoverTrigger>
              <Button
                minWidth="-moz-fit-content"
                leftIcon={<SettingsIcon />}
                colorScheme="orange"
              >
                Settings
              </Button>
            </PopoverTrigger>
            <Portal>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Available Settings</PopoverHeader>
                <PopoverBody>
                  <Button onClick={onOpen} leftIcon={<EditIcon />}>
                    Change Password
                  </Button>
                </PopoverBody>
              </PopoverContent>
            </Portal>
          </Popover>
          <Modal size="xl" isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Change Password</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Tr>
                  <Td>
                    <Text width={{ sm: "7em", md: "10em" }} ms="1em" mb="2em">
                      Enter old Password
                    </Text>
                  </Td>
                  <Td>
                    <Input
                      ms="1em"
                      width={{ sm: "16em", md: "23em" }}
                      borderRadius="5px"
                      fontSize="sm"
                      type="password"
                      placeholder="Enter Old Password"
                      id="old-pass"
                    />
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <Text width={{ sm: "7em", md: "10em" }} ms="1em" mb="2em">
                      Enter new Password
                    </Text>
                  </Td>
                  <Td>
                    <Input
                      ms="1em"
                      width={{ sm: "16em", md: "23em" }}
                      borderRadius="5px"
                      fontSize="sm"
                      type="password"
                      placeholder="Enter New Password"
                      id="new-pass"
                    />
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <Text width={{ sm: "7em", md: "10em" }} ms="1em">
                      Re enter new Password
                    </Text>
                  </Td>
                  <Td>
                    <Input
                      ms="1em"
                      width={{ sm: "16em", md: "23em" }}
                      borderRadius="5px"
                      fontSize="sm"
                      type="password"
                      placeholder="Re-Enter New Password"
                      id="re-pass"
                    />
                  </Td>
                </Tr>
                <SimpleGrid marginLeft="auto" width="fit-content" gap={5}>
                  <Button
                    m="1em"
                    colorScheme="orange"
                    variant="solid"
                    id="pass-button"
                    onClick={validation}
                  >
                    Change Password
                  </Button>
                </SimpleGrid>
                <Text
                  color="red"
                  id="pass-mis"
                  display="none"
                  style={{ textAlign: "center" }}
                >
                  Passwords Don't Match
                </Text>
                <Text
                  color="red"
                  id="pass-fail"
                  display="none"
                  style={{ textAlign: "center" }}
                >
                  Incorrect Old Password or Username or Invalid User
                </Text>
                <Text
                  color="red"
                  id="server-fail"
                  display="none"
                  style={{ textAlign: "center" }}
                >
                  Server Error. Try again after some time
                </Text>
                <Text
                  color="green"
                  id="pass-success"
                  display="none"
                  style={{ textAlign: "center" }}
                >
                  Password Changed Successfully
                </Text>
                <Text
                  color="red"
                  id="pass-same"
                  display="none"
                  style={{ textAlign: "center" }}
                >
                  New password cannot be same as the old password
                </Text>
                <Text
                  color="red"
                  id="pass-num"
                  display="none"
                  style={{ textAlign: "center" }}
                >
                  Your new password should contain atleast 1 number
                </Text>
                <Text
                  color="red"
                  id="pass-len"
                  display="none"
                  style={{ textAlign: "center" }}
                >
                  Your password should be atleast 8 characters
                </Text>
                <Text
                  color="red"
                  id="pass-lower"
                  display="none"
                  style={{ textAlign: "center" }}
                >
                  Your password should conatin at least 1 lowercase character
                </Text>
                <Text
                  color="red"
                  id="pass-upper"
                  display="none"
                  style={{ textAlign: "center" }}
                >
                  Your password should conatin at least 1 uppercase character
                </Text>
                <Text
                  color="red"
                  id="pass-symbol"
                  display="none"
                  style={{ textAlign: "center" }}
                >
                  Your password should conatin at least 1 special
                  character.Allowed special characters(!,@,#,$,%,^,&,*)
                </Text>
                <Text
                  color="red"
                  id="pass-valid"
                  display="none"
                  style={{ textAlign: "center" }}
                >
                  Your password should be between 8 and 15 characters
                </Text>
                <Text
                  color="red"
                  id="pass-equal"
                  display="none"
                  style={{ textAlign: "center" }}
                >
                  Re entered password and new password dosen't match
                </Text>
              </ModalBody>
            </ModalContent>
          </Modal>

          <Flex
            direction={{ sm: "column", lg: "row" }}
            w={{ sm: "100%", md: "50%", lg: "auto" }}
          ></Flex>
        </Flex>
      </Box>
    </Box>
  </Flex>
  );
}

export default Profile;