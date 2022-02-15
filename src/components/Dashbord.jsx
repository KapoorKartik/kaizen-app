import { Box, Button, Grid, GridItem, Image } from "@chakra-ui/react";
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

  const handleDelete = (id) => {
    console.log(id._id);
    axios
      .delete(`https://kapoorkartik.herokuapp.com/kaizenapp/${id._id}`)
      .then(() => {
        getDetails();
      });
  };

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
              <GridItem bg="#EFEFEF">S No</GridItem>
              <GridItem bg="#EFEFEF">0{i + 1}</GridItem>

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
                <Image
                  my={2}
                  boxSize="200px"
                  src={e.image}
                  alt="before image"
                />
              </GridItem>

              <GridItem bg="#EFEFEF">Result</GridItem>
              <GridItem bg="#EFEFEF">{e.result}</GridItem>

              <GridItem bg="#EFEFEF">Self implementation</GridItem>
              <GridItem bg="#EFEFEF">{e.implement}</GridItem>

              <GridItem bg="#EFEFEF">Problem</GridItem>
              <GridItem bg="#EFEFEF">{e.present_problem}</GridItem>

              <GridItem bg="#EFEFEF" colSpan={2} my={1}>
                <Button
                  size="md"
                  height="30px"
                  width="120px"
                  border="1px"
                  bg="red"
                  ml="30%"
                  onClick={() => handleDelete(e)}
                >
                  Delete
                </Button>
              </GridItem>
            </Grid>
          </Box>
        );
      })}
    </>
  );
};
