import { ReactNode } from "react";
import { Box, Flex, Text, Icon } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";
import { motion } from "framer-motion";

import {
  FiScissors,
  FiUsers,
  FiCalendar,
  FiDollarSign,
  FiGrid,
  FiFileText, 
  FiUser, 
  FiCreditCard
} from "react-icons/fi";

const MotionFlex = motion(Flex);
const MotionBox = motion(Box);

interface LinkItemProps {
  name: string;
  icon: IconType;
  route: string;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Dashboard", icon: FiGrid, route: "/report/barbeiro" },
  { name: "Serviços", icon: FiUsers, route: "/dashboard/barbeiro" },
  { name: "Modelos", icon: FiScissors, route: "/haircuts" },
  { name: "Relátorio", icon: FiFileText, route: "/relat/barbeiro" },
  { name: "QrCode", icon: FiGrid, route: "/dashboard/barbeiro/qrcode" },
  { name: "Perfil", icon: FiUser, route: "/profile/barbeiro" },
];

export function Sidebar({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const activeIndex = Math.max(
    0,
    LinkItems.findIndex((item) => pathname === item.route)
  );

  const itemWidthPercent = 100 / LinkItems.length;

  return (
    <Box minH="100vh" bg="#020617" color="white" pb="90px">
      {/* CONTENT */}
      <Box p={4}>{children}</Box>

      {/* NAV CONTAINER */}
      <Flex
        position="fixed"
        bottom={0}
        left={0}
        right={0}
        width="100%"
        maxW="100%"
        bg="rgba(15,23,42,0.6)"
        backdropFilter="blur(20px)"
        borderTopLeftRadius="2xl"
        borderTopRightRadius="2xl"
        border="1px solid rgba(255,255,255,0.08)"
        px={4} py={2}
        justify="space-between"
        align="center"
        boxShadow="0 20px 40px rgba(0,0,0,0.5)"
      >
      

        {LinkItems.map((item) => {
          const isActive = pathname === item.route;

          return (
            <Link key={item.name} href={item.route}>
              <MotionFlex
                direction="column"
                align="center"
                justify="center"
                flex={1}
                py={1}
                cursor="pointer"
                color={isActive ? "#D4AF37" : "gray.400"}
                whileTap={{ scale: 0.85 }}
                whileHover={{ scale: 1.08 }}
                animate={{ y: isActive ? -4 : 0 }}
                transition={{ type: "spring", stiffness: 300 }}
                zIndex={1}
              >
                <MotionBox
                  animate={{ rotate: isActive ? [0, -10, 10, 0] : 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Icon as={item.icon} fontSize="22px" />
                </MotionBox>

                <Text fontSize="xs" mt={1}>
                  {item.name}
                </Text>
              </MotionFlex>
            </Link>
          );
        })}
      </Flex>
    </Box>
  );
}
