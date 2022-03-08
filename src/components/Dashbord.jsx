import {
  Alert,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertIcon,
  Box,
  Button,
  CircularProgress,
  Grid,
  GridItem,
  Image,
} from "@chakra-ui/react";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";
import axios from "axios";

export const Dashbord = () => {
  const { token } = useContext(AuthContext);

  const [data, setData] = useState([]);

  const [deleteProgress, setDeleteProgress] = useState(false);

  const [empty, setEmpty] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  useEffect(() => {
    getDetails();
  }, []);

  const handleDelete = (id) => {
    // console.log(id._id);
    onClose();
    setDeleteProgress(true);
    axios
      .delete(`https://kapoorkartik.herokuapp.com/kaizenapp/${id._id}`)
      .then(() => {
        setDeleteProgress(false);
        getDetails();
      });
  };

  const getDetails = () => {
    setIsLoading(true);
    setEmpty(false);
    axios("https://kapoorkartik.herokuapp.com/kaizenapp").then(({ data }) => {
      // console.log("log:", data.length);
      setIsLoading(false);
      data.length === 0 ? setEmpty(true) : null;
      setData(data);
    });
  };
  // console.log("empty:", empty);
  return !token ? (
    <Navigate to="/login" />
  ) : (
    <>
      <Box align="center">
        <b>Welcome to Dashbord</b>
      </Box>

      {isLoading === true ? (
        <CircularProgress mt="20px" ml="45%" isIndeterminate color="#0077b6" />
      ) : null}
      {empty === true ? (
        <Alert status="warning">
          <AlertIcon />
          Seems like there is no observations yet
        </Alert>
      ) : null}
      {data?.map((e, i) => {
        return (
          <Box my={2} key={i}>
            <Grid
              border="1px solid black"
              templateColumns="30% 70%"
              rowGap={1}
              pl={2}
            >
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
                {deleteProgress === true ? (
                  <CircularProgress
                    mt="20px"
                    ml="45%"
                    isIndeterminate
                    color="red"
                  />
                ) : (
                  <>
                    <Button
                      colorScheme="red"
                      ml="40%"
                      onClick={() => setIsOpen(true)}
                    >
                      Delete
                    </Button>
                    <AlertDialog
                      isOpen={isOpen}
                      leastDestructiveRef={cancelRef}
                      onClose={onClose}
                    >
                      <AlertDialogOverlay>
                        <AlertDialogContent>
                          <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete
                          </AlertDialogHeader>

                          <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                          </AlertDialogBody>

                          <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                              Cancel
                            </Button>
                            <Button
                              colorScheme="red"
                              onClick={() => handleDelete(e)}
                              ml={3}
                            >
                              Delete
                            </Button>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialogOverlay>
                    </AlertDialog>
                  </>
                )}
              </GridItem>
            </Grid>
          </Box>
        );
      })}
    </>
  );
};
/**
 * function AlertDialogExample() {
  const [isOpen, setIsOpen] = React.useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = React.useRef()

  return (
    <>
      <Button colorScheme='red' onClick={() => setIsOpen(true)}>
        Delete Customer
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={onClose} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
 */
