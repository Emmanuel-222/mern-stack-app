import { Container, Flex, Text, HStack, Button, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { BsPlusSquare } from "react-icons/bs";
import { IoIosMoon } from "react-icons/io";
import { IoSunnyOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxW={"1140px"} px={4} bg={useColorModeValue("gray.100", "gray.900")}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
        >
          <Link to={"/"}>Product Store 🛒</Link>
        </Text>

        <HStack spacing={2} alignItems={"center"}>
            <Link to={"/create"}>
                <Button>
                    <BsPlusSquare />
                </Button>
            </Link>
            <Button onClick={toggleColorMode}>
                {
                    colorMode === "light" ? <IoIosMoon size={20}/> : <IoSunnyOutline size={20}/>
                }
            </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
