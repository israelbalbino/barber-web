"use client";

import { useSearchParams } from "next/navigation";
import { useContext, useRef, useState } from "react";

import {
  Box,
  Text,
  Button,
  Flex,
  Badge,
  IconButton,
  Spinner,
} from "@chakra-ui/react";

import {
  LuArrowBigLeft,
  LuArrowBigRight,
  LuScissors,
} from "react-icons/lu";

import { AuthContext } from "../../../../context/AuthContext";
import { api } from "@/services/apiClient";
import Router from "next/router";

type Service = {
  id: string;
  name: string;
  price: number;
  image?: string;
  popular?: boolean;
};


export default function CheckinPage() {
  const searchParams = useSearchParams();
  const barberId = searchParams.get("barberId");

  const { user } = useContext(AuthContext);

  const [services, setServices] = useState<Service[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  async function dadoshaircut() {
    if (!barberId) return;

    setLoading(true);

    try {
      const res = await api.get(
        `${process.env.NEXT_PUBLIC_API_URL}/haircut/client?user_id=${barberId}&status=true`
      );

      setServices(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  function scroll(direction: "left" | "right") {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });
  }


  async function handleRegister() {
    if (!selected) return;

    await api.post(
      `${process.env.NEXT_PUBLIC_API_URL}/haircut/client/service`,
      {
        customer: user?.name,
        user_id: barberId,
        haircut_id: selected,
        avatar:user?.avatar,
      }
    );

    Router.push("/report/cliente");
  }

  return (
    <Box
      minH="100vh"
      bg="linear-gradient(180deg, #0f0f0f 0%, #1a1a1a 100%)"
      px={5}
      py={8}
    >
      {/* HEADER */}
      <Flex
        justify="space-between"
        align="center"
        mb={10}
      >
        <Box>
          <Flex align="center" gap={1}>
            <Text
              fontSize="3xl"
              fontWeight="black"
              color="white"
              letterSpacing="tight"
            >
              AraBarber
            </Text>

            <Text
              fontSize="3xl"
              fontWeight="black"
              color="#D4AF37"
              letterSpacing="tight"
            >
              PRO
            </Text>
          </Flex>

          <Text
            color="gray.400"
            fontSize="sm"
            mt={1}
          >
            Escolha seu estilo premium
          </Text>
        </Box>

        <Box
          bg="rgba(255,255,255,0.06)"
          border="1px solid rgba(255,255,255,0.08)"
          p={3}
          borderRadius="2xl"
          backdropFilter="blur(10px)"
        >
          <LuScissors size={22} color="#D4AF37" />
        </Box>
      </Flex>

      {/* BOTÃO CARREGAR */}
      <Button
        onClick={dadoshaircut}
        isLoading={loading}
        loadingText="Carregando"
        w="100%"
        h="60px"
        borderRadius="2xl"
        fontSize="md"
        fontWeight="bold"
        bg="linear-gradient(90deg, #D4AF37 0%, #F7D774 100%)"
        color="black"
        mb={8}
        _hover={{
          transform: "translateY(-2px)",
          boxShadow: "0 10px 30px rgba(212,175,55,0.3)",
        }}
        transition="0.3s"
      >
        Carregar modelos
      </Button>

      {/* TOP BAR */}
      <Flex
        justify="space-between"
        align="center"
        mb={4}
      >
        <Box>
          <Text
            color="white"
            fontSize="2xl"
            fontWeight="bold"
          >
            Cortes disponíveis
          </Text>

          <Text
            color="gray.500"
            fontSize="sm"
          >
            Selecione o modelo desejado
          </Text>
        </Box>

        <Flex gap={2}>
          <IconButton
            aria-label="left"
            icon={<LuArrowBigLeft />}
            onClick={() => scroll("left")}
            borderRadius="full"
            bg="rgba(255,255,255,0.06)"
            color="white"
            _hover={{
              bg: "rgba(255,255,255,0.12)",
            }}
          />

          <IconButton
            aria-label="right"
            icon={<LuArrowBigRight />}
            onClick={() => scroll("right")}
            borderRadius="full"
            bg="rgba(255,255,255,0.06)"
            color="white"
            _hover={{
              bg: "rgba(255,255,255,0.12)",
            }}
          />
        </Flex>
      </Flex>

      {/* LOADING */}
      {loading && (
        <Flex justify="center" py={10}>
          <Spinner
            size="xl"
            color="#D4AF37"
            thickness="4px"
          />
        </Flex>
      )}

     {/* CARROSSEL */}
<Box
  ref={scrollRef}
  display="flex"
  overflowX="auto"
  gap={4}
  pb={4}
  sx={{
    scrollSnapType: "x mandatory",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  }}
>
  {services.map((service, index) => (
    <Box
      key={service.id}
      minW="100%"
      maxW="100%"
      flexShrink={0}
      scrollSnapAlign="center"
      borderRadius="24px"
      overflow="hidden"
      cursor="pointer"
      position="relative"
      bg="rgba(255,255,255,0.04)"
      border={
        selected === service.id
          ? "2px solid #D4AF37"
          : "1px solid rgba(255,255,255,0.08)"
      }
      backdropFilter="blur(14px)"
      transition="0.35s"
      transform={
        selected === service.id
          ? "scale(0.95)"
          : "scale(1)"
      }
      _hover={{
        transform: "translateY(-4px)",
      }}
      onClick={() => setSelected(service.id)}
    >
      {/* TOPO */}
      <Box
        h="130px"
        bg="linear-gradient(135deg, #1f1f1f 0%, #2c2c2c 100%)"
        position="relative"
      >
        <Flex
          h="100%"
          align="center"
          justify="center"
          direction="column"
        >
          <Box
            bg="rgba(255,255,255,0.06)"
            p={3}
            borderRadius="full"
            mb={2}
          >
            <LuScissors
              size={24}
              color="#D4AF37"
            />
          </Box>

          <Text
            color="white"
            fontWeight="bold"
            fontSize="md"
          >
            Corte Premium
          </Text>
        </Flex>

        {(service.popular || index === 0) && (
          <Badge
            position="absolute"
            top={3}
            right={3}
            px={2}
            py={1}
            borderRadius="full"
            bg="#D4AF37"
            color="black"
            fontWeight="bold"
            fontSize="10px"
          >
            🔥 Popular
          </Badge>
        )}
      </Box>

      {/* CONTEÚDO */}
      <Box p={4}>
        <Flex
          justify="space-between"
          align="center"
        >
          <Text
            color="white"
            fontSize="md"
            fontWeight="bold"
            noOfLines={1}
          >
            {service.name}
          </Text>

          {selected === service.id && (
            <Box
              w="10px"
              h="10px"
              borderRadius="full"
              bg="#D4AF37"
              boxShadow="0 0 10px #D4AF37"
            />
          )}
        </Flex>

        <Text
          mt={2}
          color="#D4AF37"
          fontWeight="black"
          fontSize="xl"
        >
          R$ {service.price}
        </Text>

        <Text
          mt={1}
          color="gray.400"
          fontSize="xs"
          noOfLines={2}
        >
          Corte moderno com acabamento premium.
        </Text>
      </Box>
    </Box>
  ))}
</Box>

      {/* BOTÃO FINAL */}
      <Button
        mt={10}
        w="100%"
        h="65px"
        borderRadius="2xl"
        bg={
          selected
            ? "linear-gradient(90deg, #D4AF37 0%, #F7D774 100%)"
            : "gray.700"
        }
        color={selected ? "black" : "gray.400"}
        fontSize="lg"
        fontWeight="black"
        onClick={handleRegister}
        isDisabled={!selected}
        transition="0.3s"
        _hover={{
          transform: selected
            ? "translateY(-2px)"
            : "none",
          boxShadow: selected
            ? "0 12px 35px rgba(212,175,55,0.35)"
            : "none",
        }}
      >
        Confirmar serviço
      </Button>
    </Box>
  );
}


