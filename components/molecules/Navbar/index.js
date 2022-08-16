import Link from "next/link";
import React from "react";

import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  VisuallyHidden,
  HStack,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
  Avatar,
} from "@chakra-ui/react";
import { AiOutlineMenu } from "react-icons/ai";

export default function Gslr(props) {
  const user = props.user;

  const bg = useColorModeValue("white", "gray.800");
  const mobileNav = useDisclosure();

  return (
    <React.Fragment>
      <chakra.header
        bg={bg}
        w="full"
        px={{ base: 2, sm: 4 }}
        py={4}
        shadow="md"
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <Flex>
            <chakra.a
              href="/"
              title="Choc Home Page"
              display="flex"
              alignItems="center"
            >
              <VisuallyHidden>Choc</VisuallyHidden>
            </chakra.a>
            <chakra.h1 fontSize="xl" fontWeight="medium" ml="2">
              Unklab URL Shortener
            </chakra.h1>
          </Flex>
          <HStack display="flex" alignItems="center" spacing={1}>
            <HStack
              spacing={1}
              mr={1}
              color="brand.500"
              display={{ base: "none", md: "inline-flex" }}
            >
              {/* {user === null && (
                <>
                  <Link href="/login">
                    <a>
                      <Button variant="ghost">Masuk</Button>
                    </a>
                  </Link>
                  <Link href="/register">
                    <a>
                      <Button variant="ghost">Mendaftar</Button>
                    </a>
                  </Link>
                </>
              )}
              {user !== null && (
                <>
                  <Link href="/panel">
                    <a>
                      <Avatar
                        size={"sm"}
                        name={`${user.first_name} ${user.last_name}`}
                        // src="https://bit.ly/broken-link"
                      />
                    </a>
                  </Link>
                </>
              )} */}
            </HStack>
            <Box display={{ base: "inline-flex", md: "none" }}>
              <IconButton
                display={{ base: "flex", md: "none" }}
                aria-label="Open menu"
                fontSize="20px"
                color={useColorModeValue("gray.800", "inherit")}
                variant="ghost"
                icon={<AiOutlineMenu />}
                onClick={mobileNav.onOpen}
              />

              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? "flex" : "none"}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bg={bg}
                spacing={3}
                rounded="sm"
                shadow="sm"
              >
                <CloseButton
                  aria-label="Close menu"
                  onClick={mobileNav.onClose}
                />
                {/* {user === null && (
                  <>
                    <Link href="/login">
                      <a>
                        <Button w="full" variant="ghost">
                          Masuk
                        </Button>
                      </a>
                    </Link>
                    <Link href="/register">
                      <a>
                        <Button w="full" variant="ghost">
                          Mendaftar
                        </Button>
                      </a>
                    </Link>
                  </>
                )}
                {user !== null && (
                  <>
                    <Link href="/akun">
                      <a>
                        <Avatar
                          size={"xs"}
                          name={`${user.first_name} ${user.last_name}`}
                          // src="https://bit.ly/broken-link"
                        />{" "}
                        Profil
                      </a>
                    </Link>
                  </>
                )} */}
              </VStack>
            </Box>
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  );
}
