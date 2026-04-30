import { ReactNode } from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
} from "@chakra-ui/react";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";

import {
  FiScissors,
  FiClipboard,
  FiSettings,
  FiMenu,
} from "react-icons/fi";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IconType } from "react-icons";

import Link from "next/link";

interface LinkItemProps {
  name: string;
  icon: IconType;
  route: string;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Dashboard", icon: HiOutlineDocumentReport, route: "/report/cliente" },
  { name: "Agendar", icon: FiScissors, route: "/dashboard/cliente" },
  { name: "Minha Conta", icon: FiSettings, route: "/profile/cliente" },
];

export function Sidebarcli({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  

  return (
    <Box minH="100vh" bg="barber.900" color="white">

      {/* SIDEBAR DESKTOP */}

        <SidebarContent
        onClose={onClose}
        display={{ base: "none", md: "block" }}
      />


      {/* MOBILE */}
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        size="full"
      >
        <DrawerContent bg="barber.900">
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>

      {/* NAV MOBILE */}
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />

      {/* CONTENT */}
      <Box ml={{ base: 0, md: 60 }} p={4}>
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
 

  return (
    <Box
      bg="barber.800"
      borderRight="1px solid #2A2A2A"
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      {/* LOGO */}
      <Flex
        h="20"
        alignItems="center"
        justifyContent="space-between"
        px="6"
      >
        <Link href="/dashboard">
          <Flex cursor="pointer" align="center">
            <Text fontSize="xl" fontWeight="bold">
              AraBarber
            </Text>
            <Text fontSize="xl" fontWeight="bold" color="#D4AF37" ml={1}>
              PRO 
            </Text>
          </Flex>
        </Link>

        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>

      {/* MENU */}
  

        <Flex direction="column" mt={4}>
        {LinkItems.map((link) => (
          <NavItem key={link.name} icon={link.icon} route={link.route}>
            {link.name}
          </NavItem>
        ))}
      </Flex>
  
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactNode;
  route: string;
}

const NavItem = ({ icon, children, route, ...rest }: NavItemProps) => {
  return (
    <Link href={route} style={{ textDecoration: "none" }}>
      <Flex
        align="center"
        mx="4"
        my={1}
        px="4"
        py="3"
        borderRadius="xl"
        cursor="pointer"
        transition="0.2s"
        _hover={{
          bg: "rgba(212,175,55,0.1)",
        }}
        {...rest}
      >
        <Icon as={icon} mr={3} fontSize="18" color="#D4AF37" />
        <Text fontSize="sm">{children}</Text>
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      px={4}
      height="16"
      alignItems="center"
      bg="barber.800"
      borderBottom="1px solid #2A2A2A"
      {...rest}
    >
      <IconButton
        onClick={onOpen}
        aria-label="Abrir menu"
        icon={<FiMenu />}
        variant="ghost"
        color="white"
      />

      <Flex ml={4}>
        <Text fontSize="lg" fontWeight="bold">
          AraBarber
        </Text>
        <Text fontSize="lg" fontWeight="bold" color="#D4AF37" ml={1}>
          PRO
        </Text>
      </Flex>
    </Flex>
  );
};