import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { MdHome, MdFactCheck } from "react-icons/md";
import { Link } from "react-router-dom";

export const Nav = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      position="sticky"
      top="0"
      zIndex={2}
      bg="#0077b6"
      m="auto"
      w="100%"
      p={4}
      color="white"
    >
      <Flex align={"center"} justify="center">
        <HamburgerIcon w={6} h={6} ml={1} mr={3} onClick={onOpen} />
        <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">
              <CloseIcon w={4} h={4} ml={1} mr={3} onClick={onClose} />
            </DrawerHeader>
            <DrawerBody>
              {/* <IconButton icon={<Mdsetting />}>Home</IconButton> */}
              <Link to="/">
                <Button w={200} onClick={onClose}>
                  <MdHome /> Home
                </Button>
              </Link>
              <br />
              <Link to="/dashbord">
                <Button mt={2} w={200} onClick={onClose}>
                  <MdFactCheck /> Dashboard
                </Button>
              </Link>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <Spacer />
        <Text fontSize="xl">Kaizen App</Text>
      </Flex>
    </Box>
  );
};
