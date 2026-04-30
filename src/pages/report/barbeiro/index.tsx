import {
  Flex,
  Heading,
  Text,
  Button,
  Link as ChakraLink,
  useMediaQuery,
  Box,
  Image,
} from "@chakra-ui/react";
import Head from "next/head";

import { canSSRAuth } from "@/utils/canSSRAuth";
import { Sidebar } from "@/components/sidebar";
import { IoMdPerson } from "react-icons/io";
import { FiScissors, FiTrendingUp, FiUsers } from "react-icons/fi";

import { setupAPIClient } from "@/services/api";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { FaBell } from "react-icons/fa";
import { api } from "@/services/apiClient";
import { io } from "socket.io-client";

interface ServiceProps {
  totalModelos: number;
  totalServicos: number;
  ValorService: number;
  servicosRealizados: ServicesProps[];
  notifications: number;
}

export interface ServicesProps {
  id: string;
  customer: string;
  haircut: {
    id: string;
    name: string;
    price: number | string;
  };
}

export default function Barbeiro({
  totalModelos,
  totalServicos,
  ValorService,
  servicosRealizados,
  notifications
}: ServiceProps) {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const { user } = useContext(AuthContext);

  const [notificationCount, setNotificationCount] = useState(notifications);


  const [services] = useState(totalModelos);
const [totalservicos] = useState(totalServicos);
const [listService] = useState(servicosRealizados);


  useEffect(() => {
  

    // 🔥 SOCKET IO
    const socket = io("http://localhost:3333", {
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("Socket conectado");
    });

    // 👀 evento novo serviço
    socket.on("nova_notification", (data) => {
      console.log("Novo serviço recebido:", data);

      setNotificationCount((prev) => prev + 1);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <Head>
        <title>AraBarberPRO - Dashboard</title>
      </Head>

      <Sidebar>
        <Flex direction="column" gap={6}>

          {/* HEADER */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Flex direction="column">
              <Text color="gray.500" fontSize="sm">
                Bem-vindo de volta,
              </Text>
              <Heading size="lg" color="white">
                {user?.name}
              </Heading>
              <Flex mt={2} w={50} h={1} bg="#D4AF37" />
            </Flex>

            {/* 🔔 NOTIFICAÇÃO */}
            <ChakraLink href="/report/barbeiro/notification" position="relative">
              <FaBell size={20} />

              {notificationCount > 0 && (
                <Flex
                  position="absolute"
                  top="-6px"
                  right="-6px"
                  bg="red.500"
                  color="white"
                  fontSize="10px"
                  w="18px"
                  h="18px"
                  borderRadius="full"
                  align="center"
                  justify="center"
                >
                  {notificationCount}
                </Flex>
              )}
            </ChakraLink>
          </Box>

           {/* FATURAMENTO */}
        <Flex
          p={6}
          borderRadius="2xl"
          bg="linear-gradient(135deg, #0f172a, #020617)"
          border="1px solid rgba(255,255,255,0.05)"
          boxShadow="0 10px 30px rgba(0,0,0,0.4)"
          align="center"
          justify="space-between"
        >
          <Box>
            <Text color="gray.400">FATURAMENTO</Text>
            <Heading color="green.400" mt={2}>
              R$ {ValorService}
            </Heading>
           
          </Box>

          <Box
            bg="rgba(34,197,94,0.15)"
            p={3}
            borderRadius="xl"
            color="green.400"
          >
            <FiTrendingUp size={22} />
          </Box>
        </Flex>

        {/* STATS */}
        <Flex gap={4} direction={isMobile ? "row" : "row"}>
          <Flex
            flex={1}
            p={6}
            borderRadius="2xl"
            bg="#0f172a"
            border="1px solid rgba(255,255,255,0.05)"
            direction="row"
            align="center"
           
          >
            <Flex p={2} mb={10} rounded={10} border="1px solid #D4AF37">
            <FiUsers color="#D4AF37"/>
            </Flex>
            <Flex ml={4} flex={1} direction="column"align="left">
            <Text color="gray.400">SERVIÇOS</Text>
            <Heading mt={2}>{totalservicos}</Heading>
            </Flex>
            
          </Flex>

          <Flex
            flex={1}
            p={6}
            borderRadius="2xl"
            bg="#0f172a"
            border="1px solid rgba(255,255,255,0.05)"
            direction="row"
            align="center"
          >
             <Flex p={2} mb={10} rounded={10} border="1px solid #D4AF37">
            <FiScissors color="#D4AF37"/>
            </Flex>
            <Flex ml={4} flex={1} direction="column"align="left">
            <Text color="gray.400">MODELOS</Text>
            <Heading mt={2}>{services}</Heading>
            </Flex>
            
          </Flex>
        </Flex>

        {/* LISTA */}
        <Flex
          p={2}
          borderRadius="2xl"
          bg="#020617"
          border="1px solid rgba(255,255,255,0.05)"
          direction="column"
         
        >
          <Flex p={4} justify="space-between" mb={4}>
            <Heading fontWeight="hairline" color="gray.400" size="sm">Serviços recentes</Heading>

            <ChakraLink href="/servicos">
              <Button
                size="sm"
                bg="transparent"
                border="1px solid #D4AF37"
                color="#D4AF37"
                _hover={{
                  bg: "#D4AF37",
                  color: "black",
                }}
              >
                VER TODOS
              </Button>
            </ChakraLink>
          </Flex>

          {listService.map((item) => (
            <Flex
              key={item.id}
              p={4}
              mb={3}
              borderRadius="xl"
              bg="#0f172a"
              border="1px solid rgba(255,255,255,0.04)"
              justify="space-between"
              align="center"
              _hover={{
                transform: "translateY(-2px)",
                bg: "#111827",
              }}
            >
              <Flex align="center" gap={3}>
                <Box bg="#D4AF37" p={2} borderRadius="full">
                  <IoMdPerson size={18} color="#000" />
                </Box>

                <Text>{item.customer}</Text>
              </Flex>

              <Text color="green.400" fontWeight="bold">
                R$ {item.haircut?.price}
              </Text>
            </Flex>
          ))}
        </Flex>

        </Flex>
      </Sidebar>
    </>
  );
}
  
  export const getServerSideProps = canSSRAuth(async (ctx) => {
    try {
      const apiClient = setupAPIClient(ctx);
  
      const response = await apiClient.get("/haircut/count");
      const serv = await apiClient.get("/service/count");
      const totalServicos = await apiClient.get("/service/total", {
        params: { status: false },
      });
      const servicosRealizados = await apiClient.get("/service", {
        params: { status: false, data:new Date()},
      });

      const notification = await apiClient.get("/notification/count")
      
  
      return {
        props: {
          totalModelos: response.data,
          totalServicos: serv.data,
          ValorService: totalServicos.data,
          servicosRealizados: servicosRealizados.data,
          notifications:notification.data
         
        },
      };
    } catch (error) {
      return {
        redirect: {
          destination: "/dashboard/barbeiro",
          permanent: false,
        },
      };
    }
  },["barbeiro"]);