// components/SplashScreen.tsx
import { Flex, Text, Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionFlex = motion(Flex);
const MotionBox = motion(Box);

export function SplashScreen() {
  return (
    <MotionFlex
      h="100vh"
      w="100%"
      align="center"
      justify="center"
      bg="linear-gradient(180deg, #050505, #0d0d0d)"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6 }}
      position="relative"
      overflow="hidden"
    >
      {/* GLOW DINÂMICO */}
      <MotionBox
        position="absolute"
        w="350px"
        h="350px"
        borderRadius="full"
        bg="rgba(212,175,55,0.2)"
        filter="blur(120px)"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* LOGO */}
      <MotionFlex
        direction="column"
        align="center"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        position="relative"
      >
        <Flex cursor="pointer" align="center">
            <Text fontSize="42px" fontWeight="bold">
              AraBarber
            </Text>
            <Text fontSize="42px" fontWeight="bold" color="#D4AF37" ml={1}>
              PRO 
            </Text>
          </Flex>

        {/* SHINE PASSANDO */}
        <MotionBox
          position="absolute"
          top={0}
          left="-120%"
          w="120%"
          h="100%"
          bgGradient="linear(to-r, transparent, rgba(255,255,255,0.25), transparent)"
          transform="skewX(-20deg)"
          animate={{ left: ["-120%", "120%"] }}
          transition={{
            duration: 1.5,
            delay: 0.5,
          }}
        />
      </MotionFlex>
    </MotionFlex>
  );
}