import {
  Flex,
  Heading,
  Text,
  useMediaQuery,
  Box,
  Link,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import Head from "next/head";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { Sidebarcli } from "@/components/sidebarland";
import { setupAPIClient } from "@/services/api";
import { useContext, useState, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { api } from "@/services/apiClient";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

interface ServiceProps {
  totalServicos: ServicesProps[];
}

export interface ServicesProps {
  id: string;
  name: string;
  client: string; // "barbeiro" | "cliente"
  subscriptions: {
    id: string;
    status: boolean;
  } | null;
}

export default function Cliente({ totalServicos }: ServiceProps) {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const { user } = useContext(AuthContext);

  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [totalEmAndamento, setTotalEmAndamento] = useState(0);
  const [isPremiumView, setIsPremiumView] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const scrollRef = useRef<HTMLDivElement>(null);

  // 🔥 FILTRO: só barbeiros
  const barbearias = totalServicos.filter(
    (item) => item.client === "barbeiro"
  );

  async function handleSelectBarbearia(service: ServicesProps) {
    try {
      setSelected(service.id);
      onOpen();

      const clientePremium = !!user?.subscriptions?.status;
      const barbeariaPremium = !!service.subscriptions?.status;

      const podeVer = clientePremium || barbeariaPremium;

      setIsPremiumView(podeVer);

      if (!podeVer) return;

      setLoading(true);

      const response = await api.get(
        `${process.env.NEXT_PUBLIC_API_URL}list/user`,
        {
        params:{
          user_id:service.id
        }
        }
      );

      setTotalEmAndamento(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>AraBarberPRO - Cliente</title>
      </Head>

      <Sidebarcli>
        <Flex direction="column" p={4}>

          {/* HEADER */}
          <Flex mb={10} direction="column">
            <Text color="gray.400">Bem-vindo de volta 👋</Text>
            <Heading bgGradient="linear(to-r, white, gray.400)" bgClip="text">
              {user?.name}
            </Heading>
          </Flex>

          {/* TITULO */}
          <Box mb={6}>
            <Heading color="white" size="md">
              Movimento das barbearias
            </Heading>

            <Text mt={2} color="gray.400">
              {user?.subscriptions?.status
                ? "Você é premium 👑 — veja todas as filas"
                : "Clique para ver a fila (premium desbloqueia tudo)"}
            </Text>
          </Box>

          {/* CARROSSEL */}
          <Box
            ref={scrollRef}
            display="flex"
            overflowX="auto"
            gap={5}
            pb={2}
            sx={{
              scrollSnapType: "x mandatory",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {barbearias.map((service) => {
              const barbeariaPremium = !!service.subscriptions?.status;

              return (
                <Box
                  key={service.id}
                  minW="260px"
                  p={6}
                  borderRadius="2xl"
                  cursor="pointer"
                  scrollSnapAlign="start"
                  onClick={() => handleSelectBarbearia(service)}
                  transition="0.3s"
                  transform={selected === service.id ? "scale(0.95)" : "scale(1)"}
                  bg="linear-gradient(145deg, #1a1a1a, #0a0a0a)"
                  border={
                    selected === service.id
                      ? "1px solid #D4AF37"
                      : "1px solid rgba(255, 225, 0, 0.3)"
                  }
                  _hover={{
                    transform: "translateY(-6px)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
                  }}
                >
                  <Flex direction="column" align="center" gap={3}>
                    <Heading size="md" color="white">
                      {service.name}
                    </Heading>

                    <Text
                      fontSize="sm"
                      color={barbeariaPremium ? "green.400" : "gray.500"}
                    >
                      {barbeariaPremium
                        ? "Barbearia Premium"
                        : "Barbearia Comum"}
                    </Text>
                  </Flex>
                </Box>
              );
            })}
          </Box>
        </Flex>

        {/* MODAL */}
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay backdropFilter="blur(6px)" />

          <ModalContent
            w="90%"
            borderRadius="2xl"
            border="1px solid #D4AF37"
            bg="linear-gradient(145deg, #1a1a1a, #0a0a0a)"
            color="white"
          >
            <ModalHeader>Movimento da Barbearia</ModalHeader>
            <ModalCloseButton />

            <ModalBody pb={6}>
              {loading ? (
                <Flex justify="center">
                  <Spinner />
                </Flex>
              ) : !isPremiumView ? (
                <Flex direction="column" align="center" gap={4}>
                  <Heading size="md" color="red.400">
                    Conteúdo Premium 🔒
                  </Heading>

                  <Text textAlign="center" color="gray.300">
                    Apenas clientes premium podem ver todas as filas.
                  </Text>

                  <Link
                    href="/planos/cliente"
                    bg="brand.gold"
                    color="black"
                    px={6}
                    py={2}
                    rounded="full"
                  >
                    Virar Premium
                  </Link>
                </Flex>
              ) : (
                <Flex direction="column" align="center" gap={4}>
                  <Heading size="2xl" color="brand.gold">
                    {totalEmAndamento}
                  </Heading>

                  <Text color="gray.300">
                    pessoas aguardando agora
                  </Text>
                </Flex>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      </Sidebarcli>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  try {
    const apiClient = setupAPIClient(ctx);

    const serv = await apiClient.get("/list/users");

    return {
      props: {
        totalServicos: serv.data,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/dashboard/cliente",
        permanent: false,
      },
    };
  }
}, ["cliente"]);