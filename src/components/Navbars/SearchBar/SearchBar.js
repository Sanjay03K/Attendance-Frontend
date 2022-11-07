import React from "react";
import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
  InputRightElement,
  Button,
  handleClick,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
export function SearchBar(props) {
  // Pass the computed styles into the `__css` prop
  const { variant, children, ...rest } = props;
  // Chakra Color Mode
  const mainorange = useColorModeValue("orange.300", "orange.300");
  const searchIconColor = useColorModeValue("gray.700", "gray.200");
  const inputBg = useColorModeValue("white", "gray.800");

  return (
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
      <InputLeftElement
        children={
          <IconButton
            bg="inherit"
            borderRadius="inherit"
            _hover="none"
            _active={{
              bg: "inherit",
              transform: "none",
              borderColor: "transparent",
            }}
            _focus={{
              boxShadow: "none",
            }}
            icon={<SearchIcon color={searchIconColor} w="15px" h="15px" />}
          ></IconButton>
        }
      />
      <InputRightElement width="5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          Search
        </Button>
      </InputRightElement>
      <Input
        fontSize="xs"
        py="11px"
        placeholder="Type here..."
        borderRadius="inherit"
      />
    </InputGroup>
  );
}
