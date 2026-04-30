"use client";

import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import {
  Box,
  Text,
  Button,
  Flex,
  IconButton,
  Badge,
} from "@chakra-ui/react";
import { AuthContext } from "../../context/AuthContext";
import { api } from "@/services/apiClient";
import Router from "next/router";

import { LuArrowBigRight,LuArrowBigLeft } from "react-icons/lu";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupAPIClient } from "@/services/api";

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

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!barberId) return;

    api
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/haircut/client?user_id=${barberId}&status=true`
      )
      .then((res) => setServices(res.data));
  }, [barberId]);

  function scroll(direction: "left" | "right") {
    if (!scrollRef.current) return;

    const amount = 250;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  }

  async function handleRegister() {
    if (!selected) return;

    await api.post(`${process.env.NEXT_PUBLIC_API_URL}/notification/new`,{
      user_id:barberId,
      title:`${user?.name}`,
      message:"Realizou um agendamento"

    })

    await api.post(
      `${process.env.NEXT_PUBLIC_API_URL}/haircut/client/service`,
      {
        customer: user?.name,
        user_id: barberId,
        haircut_id: selected,
      }
    );
  
    

    Router.push("/report/cliente");
  }

  return (
    <Box minH="100vh" bg="barber.900" p={6}>
      {/* Logo */}
      <Flex mt={6} justify="center">
        <Text fontSize={30} fontWeight="extrabold" color="#FFF">
          AraBarber
        </Text>
        <Text fontSize={30} fontWeight="extrabold" color="brand.gold">
          PRO
        </Text>
      </Flex>

      <Text
        
        color="brand.gold"
        fontSize="xl"
        fontWeight="bold"
        mt={6}
        mb={4}
      >
        Escolha seu corte
      </Text>

     

      {/* 🔥 CARROSSEL PREMIUM */}
      <Box
        ref={scrollRef}
        display="flex"
        overflowX="auto"
        gap={4}
        pb={2}
        sx={{
          scrollSnapType: "x mandatory",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {services.map((service, index) => (
          <Box
            key={service.id}
            minW="260px"
            flexShrink={0}
            scrollSnapAlign="start"
            borderRadius="2xl"
            overflow="hidden"
            cursor="pointer"
            onClick={() => setSelected(service.id)}
            transition="0.3s"
            transform={selected === service.id ? "scale(0.9)" : "scale(1)"}
            boxShadow={
              selected === service.id
                ? "0 0 0 2px #fbbf24"
                : "0 4px 20px rgba(0,0,0,0.4)"
            }
          >
        

            <Box p={6} bg="#FFF">
              <Flex justify="space-between" align="center">
                <Text color="#000" fontWeight="bold">{service.name}</Text>

                {/* 🔥 Badge */}
                {(service.popular || index === 0) && (
                  <Badge colorScheme="yellow">🔥 Popular</Badge>
                )}
              </Flex>

              <Text mt={2} fontWeight="bold" color="gray.700">
                R$ {service.price}
              </Text>
            </Box>
          </Box>
        ))}
      </Box>

      {/* botão */}
      <Button
        mt={8}
        w="100%"
        bg="yellow.400"
        color="black"
        onClick={handleRegister}
        isDisabled={!selected}
      >
        Confirmar serviço
      </Button>
    </Box>
  );
}

export const getServerSideProps = canSSRAuth(
  async (ctx) => {
    return {
      props: {
        
      }
    };
  },
  ["cliente"]
);