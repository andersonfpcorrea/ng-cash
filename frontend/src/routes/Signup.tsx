import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  FormErrorMessage,
} from "@chakra-ui/react";
import { ReactElement, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import validator from "../utils/validator";
import { requestSignup } from "../services/requests/auth";
import { IAuthErrorResponse, ISignupResponse } from "../interfaces";
import { AxiosError } from "axios";

export default function Signup(): ReactElement {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleInput = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    // Upon writing into the inputs the input validation error messages are hidden
    setUsernameError("");
    setPasswordError("");
    const { value, type } = target;
    type === "email" ? setUsername(value) : setPassword(value);
  };

  const handleSubmit = async ({
    target,
  }: React.FormEvent<HTMLButtonElement>): Promise<void> => {
    // 1. Activate the loading spinner
    setIsLoading(true);
    // 2. Validate inputs
    const { usernameIsWrong, passwordIsWrong, messageUser, messagePassword } =
      validator.validateUserData({ username, password });
    if (usernameIsWrong) setUsernameError(messageUser);
    if (passwordIsWrong) setPasswordError(messagePassword);
    // 3. If all inputs are correct, it is made a POST request to the api
    try {
      const response = await requestSignup({ username, password });
      const userData = response.data as ISignupResponse;
      setIsLoading(false);
      // The tolken is stored in the session storage and the user is redirected to the dashboard page
      sessionStorage.setItem("token", userData.token);
      navigate(`/dashboard/${userData.data.user.id}`);
    } catch (err) {
      // In case of failure, the user sees the error message on an alert window
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
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up now
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            and start enjoying your account 💰
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl
              id="email"
              isRequired
              isInvalid={usernameError !== ""}
              className="relative"
            >
              <FormLabel>Username</FormLabel>
              <Input
                type="email"
                value={username}
                onChange={handleInput}
                isRequired
              />
              <FormErrorMessage
                className="absolute top-0 right-0 italic"
                fontSize={12}
              >
                {usernameError}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              id="password"
              isRequired
              isInvalid={passwordError !== ""}
              className="relative"
            >
              <FormLabel>Password</FormLabel>
              <FormErrorMessage
                className="absolute top-[-10px] right-[-15px] italic"
                fontSize={12}
                width={"48"}
              >
                {passwordError}
              </FormErrorMessage>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handleInput}
                  isInvalid={passwordError !== ""}
                  isRequired
                />

                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                isLoading={isLoading}
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleSubmit}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link color={"blue.400"} as={RouterLink} to="/login">
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
