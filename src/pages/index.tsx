import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Stack,
  SimpleGrid,
  Link,
  Flex,
  Avatar,
} from "@chakra-ui/react";

import { keyframes } from "@emotion/react";
import Image from "next/image";
import Router from "next/router";

import fundo from "../../public/images/fundo.jpeg";
import fund from "../../public/images/fund.jpeg";
import { FaWhatsapp } from "react-icons/fa";

const shine = keyframes`
  0% { transform: translateX(-100%) skewX(-20deg); }
  100% { transform: translateX(200%) skewX(-20deg); }
`;

export default function LandingPage() {
  function handlePlanos() {
    Router.push("/login");
  }

  return (
    <Box bg="#050505" color="white" minH="100vh">
      {/* NAVBAR */}
      <Flex
        as="nav"
        position="fixed"
        top={0}
        w="100%"
        zIndex={100}
        bg="rgba(0,0,0,0.7)"
        backdropFilter="blur(20px)"
        borderBottom="1px solid rgba(255,255,255,0.05)"
        py={4}
      >
        <Flex
          px={6}
          w="100%"
          justify="space-between"
          align="center"
          maxW="7xl"
          mx="auto"
        >
          <Link
            href="/"
            _hover={{ textDecoration: "none" }}
            display="flex"
            alignItems="center"
          >
            <Heading
              color="white"
              fontSize="26px"
              fontWeight="black"
              letterSpacing="tight"
            >
              AraBarber
            </Heading>

            <Heading
              color="brand.gold"
              fontSize="26px"
              fontWeight="black"
            >
              PRO
            </Heading>
          </Link>

        </Flex>
      </Flex>

      {/* HERO */}
      <Box
        position="relative"
        overflow="hidden"
        bg="radial-gradient(circle at top, rgba(212,175,55,0.18), #050505 60%)"
        pt={{ base: 36, md: 44 }}
        pb={{ base: 20, md: 32 }}
      >
        <Box
          position="absolute"
          inset={0}
          bg="rgba(0,0,0,0.65)"
          zIndex={1}
        />

        <Box
          position="absolute"
          top="-120px"
          left="50%"
          transform="translateX(-50%)"
          w="500px"
          h="500px"
          bg="rgba(212,175,55,0.15)"
          filter="blur(140px)"
          borderRadius="full"
          zIndex={1}
        />

        <Container
          maxW="7xl"
          position="relative"
          zIndex={2}
        >
          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            spacing={16}
            alignItems="center"
          >
            {/* TEXTO */}
            <Box>
              <Text
                color="brand.gold"
                fontWeight="bold"
                letterSpacing="widest"
                mb={4}
                fontSize="sm"
              >
                A NOVA ERA DAS BARBEARIAS
              </Text>

              <Heading
                color="white"
                lineHeight="0.95"
                fontSize={{ base: "48px", md: "78px" }}
                mb={6}
                fontWeight="black"
                letterSpacing="tight"
              >
                Sua Barbearia
                <Text as="span" color="brand.gold">
                  {" "}
                  lotada{" "}
                </Text>
                e organizada todos os dias.
              </Heading>

              <Text
                color="gray.300"
                fontSize={{ base: "lg", md: "2xl" }}
                maxW="700px"
                mb={8}
              >
                Controle filas em tempo real, impressione clientes
                e transforme sua barbearia em uma experiência premium.
              </Text>

              <Flex gap={4} wrap="wrap">
             

<Button
  as="a"
  href="https://wa.me/5582999106277?text=Ol%C3%A1%20AraBarberPRO,%20quero%20mais%20informa%C3%A7%C3%B5es!"
  target="_blank"
  rel="noopener noreferrer"
  leftIcon={<FaWhatsapp size={24} />}
  size="lg"
  h="72px"
  px={10}
  rounded="2xl"
  bg="#25D366"
  color="white"
  fontWeight="black"
  fontSize="18px"
  boxShadow="0 0 30px rgba(37,211,102,0.5)"
  transition="0.3s"
  _hover={{
    transform: "translateY(-4px) scale(1.03)",
    boxShadow: "0 0 50px rgba(37,211,102,0.8)",
    bg: "#1ebe5d",
  }}
>
  CHAMAR NO WHATSAPP
</Button>

                <Button
                  size="lg"
                  h="72px"
                  px={10}
                  rounded="2xl"
                  bg="whiteAlpha.100"
                  border="1px solid rgba(255,255,255,0.1)"
                  color="white"
                  _hover={{
                    bg: "whiteAlpha.200",
                  }}
                >
                  VER DEMONSTRAÇÃO
                </Button>
              </Flex>

              <Flex mt={8} align="center" gap={4} wrap="wrap">
                <Text color="gray.400">
                  +120 barbeiros usando
                </Text>

                <Text color="brand.gold">
                  ★★★★★
                </Text>

                <Text color="gray.400">
                  4.9 de avaliação
                </Text>
              </Flex>
            </Box>

            {/* MOCKUP */}
            <Flex justify="center" position="relative">
              <Box
                position="absolute"
                w="350px"
                h="350px"
                bg="rgba(212,175,55,0.2)"
                filter="blur(120px)"
                borderRadius="full"
              />

              <Box
                position="relative"
                borderRadius="40px"
                p="8px"
                bg="linear-gradient(145deg, #2a2a2a, #080808)"
                boxShadow="0 40px 100px rgba(0,0,0,0.9)"
              >
            

                <Box
                  bg="#000"
                  borderRadius="34px"
                  overflow="hidden"
                  w={{ base: "300px", md: "360px" }}
                  h={{ base: "600px", md: "720px" }}
                  position="relative"
                >
                  <Image
                    src={fundo}
                    alt="AraBarberPRO"
                    fill
                    style={{ objectFit: "cover" }}
                  />

                
                </Box>
              </Box>
            </Flex>
          </SimpleGrid>
        </Container>
      </Box>

      {/* DOR */}
      <Box py={24} bg="#050505">
        <Container maxW="6xl">
          <Text
            textAlign="center"
            color="brand.gold"
            fontWeight="bold"
            mb={3}
          >
            SUA BARBEARIA SOFRE COM ISSO?
          </Text>

          <Heading
            textAlign="center"
            color="white"
            mb={14}
            fontSize={{ base: "3xl", md: "5xl" }}
            fontWeight="black"
          >
            Chega de perder clientes.
          </Heading>

          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            spacing={8}
          >
            {[
              "Clientes indo embora pela demora",
              "Fila bagunçada todos os dias",
              "Clientes perguntando quanto tempo falta",
              "Falta de controle financeiro",
              "Barbearia sem experiência premium",
              "Atendimento desorganizado",
            ].map((item) => (
              <Flex
                key={item}
                align="center"
                p={6}
                rounded="2xl"
                bg="rgba(255,255,255,0.03)"
                border="1px solid rgba(255,255,255,0.08)"
              >
                <Text
                  color="red.400"
                  fontWeight="bold"
                  mr={4}
                  fontSize="2xl"
                >
                  ✕
                </Text>

                <Text color="gray.300">
                  {item}
                </Text>
              </Flex>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* FEATURES */}
      <Box
        id="recursos"
        py={24}
        position="relative"
        bgGradient="linear(to-br, #0b0b0b, #1a1a1a)"
        overflow="hidden"
      >
        <Box
          position="absolute"
          top="-120px"
          left="-120px"
          w="350px"
          h="350px"
          bg="rgba(251,169,49,0.15)"
          filter="blur(120px)"
          borderRadius="full"
        />

        <Container maxW="6xl" position="relative">
          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            spacing={16}
            alignItems="center"
          >
            <Box position="relative" overflow="hidden">
              <Box
                position="absolute"
                top={0}
                left={0}
                w="50%"
                h="100%"
                bg="linear-gradient(120deg, transparent, rgba(255,255,255,0.15), transparent)"
                animation={`${shine} 4s infinite`}
              />

              <Text
                color="brand.gold"
                mb={2}
                fontWeight="bold"
                letterSpacing="wide"
              >
                EXPERIÊNCIA MOBILE PREMIUM
              </Text>

              <Heading
                mb={4}
                color="white"
                fontSize="4xl"
                fontWeight="black"
              >
                Web App Exclusivo
              </Heading>

              <Text mb={6} color="gray.300" fontSize="lg">
                Sem downloads. Seu cliente acompanha tudo em tempo real.
              </Text>
            </Box>

            <Flex justify="center">
              <Box
                borderRadius="30px"
                p="6px"
                bg="linear-gradient(145deg, #2a2a2a, #0d0d0d)"
                boxShadow="0 20px 60px rgba(0,0,0,0.8)"
              >
                <Box
                  bg="#000"
                  borderRadius="25px"
                  overflow="hidden"
                  w="260px"
                  h="520px"
                  position="relative"
                >
                  <Image
                    src={fund}
                    alt="App Preview"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </Box>
              </Box>
            </Flex>
          </SimpleGrid>
        </Container>
      </Box>

      {/* PLANOS */}
      <Box
        id="planos"
        py={24}
        bgGradient="linear(to-b, #050505, #111)"
      >
        <Container maxW="6xl">
          <Heading
            color="white"
            textAlign="center"
            mb={16}
            fontSize={{ base: "3xl", md: "5xl" }}
            fontWeight="black"
          >
            Planos para crescer
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
            {/* BASIC */}
            <Box
              p={8}
              borderRadius="2xl"
              bg="rgba(255,255,255,0.03)"
              border="1px solid rgba(255,255,255,0.08)"
            >
              <Text color="gray.400" mb={2}>
                Para começar
              </Text>

              <Heading color="white" size="md">
                Plano Basic
              </Heading>

              <Text
                fontSize="5xl"
                fontWeight="black"
                my={6}
                color="white"
              >
                R$ 0
              </Text>

              <Stack spacing={4} color="gray.300">
                <Text>✓ Dashboard personalizado</Text>
                <Text>✓ Cadastro de serviços</Text>
                <Text>✓ Web App clientes</Text>
              </Stack>

              <Button
                as="a"
                href="https://wa.me/5582999106277?text=Ol%C3%A1%20AraBarberPRO,%20quero%20mais%20informa%C3%A7%C3%B5es!"
                target="_blank"
                rel="noopener noreferrer"
                mt={8}
                w="100%"
                variant="outline"
                borderColor="gray.600"
                color="white"
              >
                Começar grátis
              </Button>
            </Box>

            {/* PRO */}
            <Box
              p={10}
              borderRadius="2xl"
              position="relative"
              bg="linear-gradient(145deg, #1a1a1a, #0a0a0a)"
              border="1px solid rgba(212,175,55,0.4)"
              boxShadow="0 20px 60px rgba(0,0,0,0.8)"
            >
              <Box
                position="absolute"
                top="-12px"
                left="50%"
                transform="translateX(-50%)"
                bg="brand.gold"
                color="black"
                px={4}
                py={1}
                borderRadius="full"
                fontSize="xs"
                fontWeight="bold"
              >
                MAIS POPULAR
              </Box>

              <Text color="brand.gold" mb={2}>
                Para quem quer crescer
              </Text>

              <Heading color="white" size="md">
                Plano PRO
              </Heading>

              <Flex align="end" gap={2} my={6}>
                <Heading
                  color="white"
                  fontSize="6xl"
                  fontWeight="black"
                >
                  7
                </Heading>

                <Text
                  color="brand.gold"
                  fontSize="2xl"
                  fontWeight="bold"
                  mb={3}
                >
                  dias grátis
                </Text>
              </Flex>

              <Text color="gray.400" mb={8}>
                Depois apenas R$ 49,90/mês
              </Text>

              <Stack spacing={4} color="gray.200">
                <Text>✓ Tudo do Basic</Text>
                <Text>✓ Relatórios completos</Text>
                <Text>✓ Web App clientes</Text>
                <Text>✓ Fila em tempo real</Text>
                <Text>✓ AraButtonPRO</Text>
              </Stack>

              <Button
                as="a"
                href="https://wa.me/5582999106277?text=Ol%C3%A1%20AraBarberPRO,%20quero%20mais%20informa%C3%A7%C3%B5es!"
                target="_blank"
                rel="noopener noreferrer"
                mt={8}
                w="100%"
                bg="brand.gold"
                color="black"
                size="lg"
                rounded="xl"
                fontWeight="black"
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "0 0 25px rgba(212,175,55,0.6)",
                }}
              >
                COMEÇAR AGORA
              </Button>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* DEPOIMENTOS */}
      <Box py={24} bg="#050505">
        <Container maxW="6xl">
          <Heading
            textAlign="center"
            color="white"
            mb={16}
            fontSize={{ base: "3xl", md: "5xl" }}
            fontWeight="black"
          >
            Quem usa AraBarberPRO
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            {[
              {
                name: "Carlos Silva",
                role: "Barbeiro",
                text: "Minha barbearia ficou muito mais organizada.",
              },
              {
                name: "Rafael Santos",
                role: "Empresário",
                text: "Os clientes adoram acompanhar a fila.",
              },
              {
                name: "Lucas Oliveira",
                role: "Empresário",
                text: "Aumentei meu faturamento e organização.",
              },
            ].map((item) => (
              <Box
                key={item.name}
                p={6}
                rounded="2xl"
                bg="rgba(255,255,255,0.03)"
                border="1px solid rgba(255,255,255,0.08)"
              >
                <Text color="brand.gold" mb={3}>
                  ★★★★★
                </Text>

                <Text color="gray.300" mb={6}>
                  {item.text}
                </Text>

                <Flex align="center">
                  <Avatar name={item.name} mr={3} />

                  <Box>
                    <Text color="white" fontWeight="bold">
                      {item.name}
                    </Text>

                    <Text fontSize="sm" color="gray.400">
                      {item.role}
                    </Text>
                  </Box>
                </Flex>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* CTA FINAL */}
      <Box
        py={24}
        bg="radial-gradient(circle at center, rgba(212,175,55,0.15), #050505 60%)"
        textAlign="center"
      >
        <Container maxW="5xl">
          <Heading
            color="white"
            fontSize={{ base: "3xl", md: "6xl" }}
            mb={6}
            lineHeight="1"
            fontWeight="black"
          >
            Sua barbearia nunca mais será a mesma.
          </Heading>

          <Text
            color="gray.300"
            fontSize={{ base: "lg", md: "2xl" }}
            mb={10}
          >
            Entre agora para o AraBarberPRO e transforme sua experiência.
          </Text>

          <Button
            onClick={handlePlanos}
            h="80px"
            px={16}
            rounded="2xl"
            bg="brand.gold"
            color="black"
            fontSize="22px"
            fontWeight="black"
            boxShadow="0 0 60px rgba(212,175,55,0.5)"
            _hover={{
              transform: "translateY(-4px) scale(1.04)",
              boxShadow: "0 0 80px rgba(212,175,55,0.8)",
            }}
          >
            COMEÇAR AGORA
          </Button>
        </Container>
      </Box>

      {/* FOOTER */}
      <Box
        bg="#050505"
        color="gray.400"
        pt={20}
        pb={10}
        borderTop="1px solid rgba(255,255,255,0.05)"
      >
        <Container maxW="6xl">
          <Flex
            justify="space-between"
            align="center"
            direction={{ base: "column", md: "row" }}
            gap={6}
          >
            <Heading size="md" color="white">
              AraBarber
              <Text as="span" color="brand.gold">
                PRO
              </Text>
            </Heading>

            <Text fontSize="sm">
              © {new Date().getFullYear()} AraBarberPRO. Todos os direitos reservados.
            </Text>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
}