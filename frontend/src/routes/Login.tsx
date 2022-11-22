import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactElement, useState } from "react";
import { requestLogin } from "../services/requests/auth";
import { IAuthErrorResponse, ISignupResponse } from "../interfaces";
import { AxiosError } from "axios";

export default function Login(): ReactElement {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInput = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, type } = target;
    type === "email" ? setUsername(value) : setPassword(value);
  };

  const handleSubmit = async ({
    target,
  }: React.FormEvent<HTMLButtonElement>): Promise<void> => {
    setIsLoading(true);

    try {
      console.log(username, password);

      const response = await requestLogin({ username, password });
      const userData = response.data as ISignupResponse;
      sessionStorage.setItem("token", userData.token);
      navigate(`/dashboard/${userData.data.user.id}`);
    } catch (err) {
      const error = err as AxiosError;
      const data = error.response?.data as IAuthErrorResponse;
      alert(data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type="email"
                value={username}
                required
                onChange={handleInput}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                required
                value={password}
                onChange={handleInput}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={"blue.400"} as={RouterLink} to="/tbd">
                  Forgot password?
                </Link>
              </Stack>
              <Button
                bg={"blue.400"}
                isLoading={isLoading}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleSubmit}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
