import {
  Alert,
  AlertIcon,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import Axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export const Login = () => {
  const [login, setLogin] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [err, setErr] = useState(false);

  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setLogin({
      ...login,
      [name]: value,
    });
    setErr(false);
  };
  const { handleToken } = useContext(AuthContext);
  const handleClick = () => {
    setIsLoading(true);
    Axios(
      `https://kapoorkartik.herokuapp.com/login/${login.username}/${login.password}`
    )
      .then(({ data: { token } }) => {
        setIsLoading(false);
        handleToken(token);
        navigate(-1);
      })

      .catch((e) => {
        setIsLoading(false);
        setErr(true);
      });
  };

  return (
    <>
      {err === true ? (
        <Alert
          status="error"
          position="sticky"
          top="65px"
          zIndex={2}
          variant="solid"
        >
          <AlertIcon />
          Wrong Username or Password
        </Alert>
      ) : null}

      <Box w="90%" m="auto">
        <FormControl isRequired>
          <FormLabel mt="10px">User Name</FormLabel>
          <Input
            isRequired
            focusBorderColor="lime"
            placeholder="username"
            name="username"
            onChange={handleChange}
          />
        </FormControl>{" "}
        <FormControl isRequired>
          <FormLabel mt="10px">Password</FormLabel>
          <Input
            isRequired
            type="password"
            focusBorderColor="lime"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
        </FormControl>
        {isLoading === true ? (
          <CircularProgress
            mt="20px"
            ml="45%"
            isIndeterminate
            color="#0077b6"
          />
        ) : (
          <Button
            mt="10px"
            w="20%"
            ml="45%"
            color="white"
            bg="#0077b6"
            onClick={() => handleClick()}
          >
            Log In
          </Button>
        )}
      </Box>
    </>
  );
};
