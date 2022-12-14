import { ReactElement } from "react";
import {
  Box,
  Flex,
  Button,
  Link,
  useColorModeValue,
  Stack,
  useColorMode,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export default function NavBar({ user }: { user: string }): ReactElement {
  const { colorMode, toggleColorMode } = useColorMode();
  const handleLogout = (): void => {
    sessionStorage.removeItem("token");
  };
  return (
    <>
      <Box bg={useColorModeValue("blue.400", "gray.900")} p={4} w="full">
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box className="font-bold text-2xl text-white">Welcome, {user}</Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
              <Link as={RouterLink} to={"/login"}>
                <Button
                  aria-label="logout"
                  color={"white"}
                  _hover={{
                    bg: "red.400",
                  }}
                  bg={useColorModeValue("blue.400", "gray.900")}
                  onClick={handleLogout}
                >
                  Log-out
                </Button>
              </Link>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
