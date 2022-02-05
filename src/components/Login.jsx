import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import Axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
// import process from "dotenv/config";
// import env from "react-dotenv";

export const Login = () => {
  const [login, setLogin] = useState({});

  const [err, setErr] = useState(false);

  const navigate = useNavigate();

  // const c = useContext(AuthContext);
  // console.log("c:", c);

  const handleChange = ({ target: { name, value } }) => {
    setLogin({
      ...login,
      [name]: value,
    });
    setErr(false);
  };
  const { handleToken } = useContext(AuthContext);
  const handleClick = () => {
    Axios(
      `https://kapoorkartik.herokuapp.com/login/${login.username}/${login.password}`
    )
      .then(({ data: { token }, status }) => {
        handleToken(token);
        navigate(-1);
      })

      .catch((e) => {
        setErr(true);
      });

    // if (login.username === "rajni" && login.password === "rajni") {
    //   // handleToken("secret");
    //   // navigate("/dashbord");
    //   //handleToken("asdkjf");
    //   handleToken("1");
    //   navigate(-1);
    // } else {
    //   console.log("err");
    // }
  };

  return (
    <>
      {err == true ? (
        <Alert status="error" position="sticky" top="65px" zIndex={2}>
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
            placeholder="secret@123"
            name="password"
            onChange={handleChange}
          />
        </FormControl>
        <Button
          mt="10px"
          w="20%"
          color="white"
          bg="#0077b6"
          onClick={() => handleClick()}
        >
          Log In
        </Button>
      </Box>
    </>
  );
};
