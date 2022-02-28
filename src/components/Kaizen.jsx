import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Alert,
  AlertIcon,
  Text,
  CircularProgress,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { Sucess } from "./Sucess";

import axios from "axios";

export const Kaizen = () => {
  const [form, setForm] = useState({
    name: "",
    department: "",
    suggested_department: "",
    suggested_line: "",
    suggested_title: "",
    result: "",
    present_problem: "",
    suggestion: "",
    image: "",
    email_id: "",
    implement: "",
  });

  const [err, setErr] = useState(false);

  const fileRef = useRef();

  const [isLoading, setIsLoading] = useState(false);

  const [sucess, setSucess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("handle");
    // console.log("form:", form);
    if (form.image === "") {
      return setErr(true);
    }
    setData();
  };
  const handleChange = (e) => {
    // console.log("e:", e);
    const { name, value, type } = e.target;

    // console.log("******************", value);
    if (type === "file") {
      const fd = new FormData();
      fd.append("file", fileRef.current.files[0]);
      fd.append("upload_preset", "my-uploads");

      axios
        .post("https://api.cloudinary.com/v1_1/kartikcloud/image/upload", fd)
        .then(({ data }) => {
          setErr(false);
          // console.log("imageurl", data.secure_url);
          setForm({ ...form, [name]: data.secure_url });
        });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };
  // not used only for reference purpose i write this fxn here
  /*
  const getUrl = () => {
    const fd = new FormData();
    fd.append("file", fileRef.current.files[0]);
    fd.append("upload_preset", "my-uploads");

    axios
      .post("https://api.cloudinary.com/v1_1/kartikcloud/image/upload", fd)
      .then(({ data }) => {
        console.log("imageurl", data.secure_url);
      });
  };
  */

  const setData = () => {
    setIsLoading(true);
    fetch("https://kapoorkartik.herokuapp.com/kaizenapp", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "content-type": "application/json",
      },
    }).then(() => {
      setIsLoading(false);
      setSucess(true);
      setTimeout(() => {
        // this is the time for circular loading
        setSucess(false);
      }, 2000);
      setForm({
        name: "",
        department: "",
        suggested_department: "",
        suggested_line: "",
        suggested_title: "",
        result: "",
        present_problem: "",
        suggestion: "",
        image: "",
        email_id: "",
        implement: "",
      });
    });
  };

  return (
    <>
      <Box m="auto" w="100%">
        {sucess ? (
          // changed loading to sucess alert 'pending'
          //<CircularProgress isIndeterminate color="green.300" />
          <Sucess />
        ) : (
          <Box m="auto" w="95%" p={4}>
            {err === true ? (
              <Alert status="error" position="sticky" top="65px" zIndex={2}>
                <AlertIcon />
                Please upload the image
              </Alert>
            ) : null}
            <form onSubmit={handleSubmit}>
              <FormControl isRequired onSubmit={handleSubmit}>
                <FormLabel as="legend">Name</FormLabel>
                <Input
                  isRequired
                  focusBorderColor="lime"
                  placeholder="write your name"
                  name="name"
                  onChange={handleChange}
                  value={form.name}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel mt="10px">Email Id</FormLabel>
                <Input
                  isRequired
                  focusBorderColor="lime"
                  placeholder="a@a.com"
                  name="email_id"
                  onChange={handleChange}
                  value={form.email_id}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel mt="10px">Select Your Depatment </FormLabel>
                <Select
                  placeholder="Select Your Depatment"
                  mt="10px"
                  onChange={handleChange}
                  name="department"
                  value={form.department}
                >
                  <option value="Quality">Quality</option>
                  <option value="Production">Production</option>
                  <option value="Dispatch">Dispatch</option>
                  <option value="5 S">5 S</option>
                  <option value="Safety">Safety</option>
                  <option value="Store">Store</option>
                  <option value="IT">IT</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel mt="10px">Suggestion for Department</FormLabel>
                <Select
                  onChange={handleChange}
                  placeholder="Select suggested department"
                  mt="10px"
                  name="suggested_department"
                  value={form.suggested_department}
                >
                  <option value="Quality">Quality</option>
                  <option value="Production">Production</option>
                  <option value="Dispatch">Dispatch</option>
                  <option value="5 S">5 S</option>
                  <option value="Safety">Safety</option>
                  <option value="Store">Store</option>
                  <option value="IT">IT</option>
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel mt="10px">Suggestion for Line/Section</FormLabel>
                <Input
                  focusBorderColor="lime"
                  placeholder="Write the specific line/section"
                  name="suggested_line"
                  onChange={handleChange}
                  value={form.suggested_line}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel mt="10px">Suggestion Title/Theme</FormLabel>
                <Input
                  focusBorderColor="lime"
                  placeholder="Write your title"
                  name="suggested_title"
                  onChange={handleChange}
                  value={form.suggested_title}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel mt="10px">Present Problem/Root Cause</FormLabel>
                <Textarea
                  focusBorderColor="lime"
                  placeholder="Write the root cause/problem"
                  name="present_problem"
                  onChange={handleChange}
                  value={form.present_problem}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel mt="10px">Suggestion</FormLabel>
                <Textarea
                  focusBorderColor="lime"
                  placeholder="Write your suggestion "
                  name="suggestion"
                  onChange={handleChange}
                  value={form.suggestion}
                />

                <Box p={2} my="20px" border="1px" borderColor="gray.200">
                  <Text mb={2}>Select the image</Text>
                  <input
                    type="file"
                    name="image"
                    accept="image/png, image/jpeg"
                    ref={fileRef}
                    onChange={handleChange}
                  />
                </Box>
              </FormControl>
              <FormControl isRequired>
                <FormLabel mt="10px">Result</FormLabel>
                <Select
                  focusBorderColor="lime"
                  placeholder="Improvement in "
                  name="result"
                  onChange={handleChange}
                  value={form.result}
                >
                  <option value="Productivity Improvement">
                    Productivity Improvement
                  </option>
                  <option value="Quality Improvement">
                    Quality Improvement
                  </option>
                  <option value="Delivery ">Delivery </option>
                  <option value="5 S">5 S</option>
                  <option value="Safety">Safety</option>
                  <option value="Cost Reduction">Cost Reduction</option>
                  <option value="Space Saved">Space Saved</option>
                  <option value="Manpower/ Man-hours saved ">
                    Manpower/ Man-hours saved{" "}
                  </option>
                  <option value="Changeover time Improved">
                    Changeover time Improved
                  </option>
                  <option value="Other">Other</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel mt="10px">Self Implement</FormLabel>
                <Select
                  focusBorderColor="lime"
                  placeholder="Select best option for you"
                  name="implement"
                  onChange={handleChange}
                  value={form.implement}
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Select>
              </FormControl>
              {isLoading === true ? (
                <CircularProgress
                  mt="20px"
                  ml="45%"
                  isIndeterminate
                  color="#0077b6"
                />
              ) : (
                <Button mt={4} color="white" bg="#0077b6" type="submit">
                  Submit
                </Button>
              )}
            </form>
          </Box>
        )}
      </Box>
    </>
  );
};
