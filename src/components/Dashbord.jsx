import {
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Tr,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";
import axios from "axios";

export const Dashbord = () => {
  const { token } = useContext(AuthContext);

  const [data, setData] = useState();

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = () => {
    axios("https://kapoorkartik.herokuapp.com/kaizenapp").then(({ data }) => {
      // console.log("log:", data);
      setData(data);
    });
  };
  return !token ? (
    <Navigate to="/login" />
  ) : (
    <>
      <Box align="center">
        <b>Welcome to Dashbord</b>
      </Box>
      {data?.map((e, i) => {
        return (
          <Box my={2} key={i}>
            <Grid border="1px solid black" templateColumns="30% 70%" rowGap={1}>
              <GridItem bg="#EFEFEF">Name</GridItem>
              <GridItem bg="#EFEFEF">{e.name}</GridItem>

              <GridItem bg="#EFEFEF">Email Id</GridItem>
              <GridItem bg="#EFEFEF">{e.email_id}</GridItem>

              <GridItem bg="#EFEFEF">Deartment</GridItem>
              <GridItem bg="#EFEFEF">{e.department}</GridItem>

              <GridItem bg="#EFEFEF">Title</GridItem>
              <GridItem bg="#EFEFEF">{e.suggested_title}</GridItem>
              <GridItem bg="#EFEFEF">Suggestion for department</GridItem>
              <GridItem bg="#EFEFEF">{e.suggested_department}</GridItem>

              <GridItem bg="#EFEFEF">Problem</GridItem>
              <GridItem bg="#EFEFEF">{e.present_problem}</GridItem>

              <GridItem bg="#EFEFEF">Suggestion</GridItem>
              <GridItem bg="#EFEFEF">{e.suggestion}</GridItem>

              <GridItem bg="#EFEFEF">Image</GridItem>
              <GridItem bg="#EFEFEF">
                <img src={e.image} alt="before image" />
              </GridItem>

              <GridItem bg="#EFEFEF">Result</GridItem>
              <GridItem bg="#EFEFEF">{e.result}</GridItem>

              <GridItem bg="#EFEFEF">Self implementation</GridItem>
              <GridItem bg="#EFEFEF">{e.implement}</GridItem>

              <GridItem bg="#EFEFEF">Problem</GridItem>
              <GridItem bg="#EFEFEF">{e.present_problem}</GridItem>
            </Grid>
          </Box>
        );
      })}
    </>
  );
};
