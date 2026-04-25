import Head from "next/head";
import {
  Button,
  Flex,
  Heading,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";

import { Sidebar } from "../../../components/sidebar";
import { canSSRAuth } from "../../../utils/canSSRAuth";
import { setupAPIClient } from "../../../services/api";

interface PlanosProps {
  premium: boolean;
}

export default function Planos({ premium }: PlanosProps) {
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const handleSubscribe = async () => {
    if (premium) return;

    try {
      const apiClient = setupAPIClient();
      const response = await apiClient.post("/subscribe");

      window.location.href = response.data.url;
    } catch (error) {
      console.log(error);
    }
  };

  async function handleCreatePortal() {
    try {
      if (!premium) return;

      const apiClient = setupAPIClient();
      const response = await apiClient.post("/create-portal");

      window.location.href = response.data.url;
    } catch (err: any) {
      console.log(err.message);
    }
  }

  return (
    <>
      <Head>
        <title>AraBarberPRO - Planos</title>
      </Head>

      <Sidebar>
        <Flex direction="column" p={2}>

          {/* HEADER */}
          <Heading color="white" fontSize="2xl" mb={6}>
            Planos
          </Heading>

          {/* CONTAINER */}
          <Flex
            gap={6}
            direction={isMobile ? "column" : "row"}
            maxW="900px"
            w="100%"
          >
            {/* PLANO GRATIS */}
            <Flex
              flex={1}
              p={6}
              rounded="2xl"
              bg="barber.800"
              border="1px solid #2A2A2A"
              direction="column"
            >
              <Heading mb={4} color="gray.300" fontSize="xl">
                Plano Gratuito
              </Heading>

              <Text color="gray.400" mb={2}>
                • Registrar serviços
              </Text>
              <Text color="gray.400" mb={2}>
                • Até 3 modelos de corte
              </Text>
              <Text color="gray.400" mb={2}>
                • Editar perfil
              </Text>
            </Flex>

            {/* PLANO PREMIUM */}
            <Flex
              flex={1}
              p={6}
              rounded="2xl"
              bg="barber.800"
              border="1px solid #D4AF37"
              direction="column"
              position="relative"
            >
              {/* BADGE */}
              <Text
                position="absolute"
                top="-10px"
                right="20px"
                bg="#D4AF37"
                color="black"
                px={3}
                py={1}
                rounded="full"
                fontSize="sm"
                fontWeight="bold"
              >
                MAIS VENDIDO
              </Text>

              <Heading mb={4} color="#D4AF37" fontSize="xl">
                Premium
              </Heading>

              <Text color="gray.300" mb={2}>
                • Serviços ilimitados
              </Text>
              <Text color="gray.300" mb={2}>
                • Relatórios completos
              </Text>
              <Text color="gray.300" mb={2}>
                • Modelos ilimitados
              </Text>
              <Text color="gray.300" mb={2}>
                • Editar cortes
              </Text>
              <Text color="gray.300" mb={2}>
                • Atualizações futuras
              </Text>

              <Heading color="#D4AF37" mt={4} mb={4}>
                R$99,90 / mês
              </Heading>

              {/* BOTÃO PRINCIPAL */}
              <Button
                size="lg"
                bg="#D4AF37"
                color="black"
                rounded="full"
                _hover={{
                  bg: "#c59b2f",
                  transform: "scale(1.03)",
                }}
                onClick={handleSubscribe}
                disabled={premium}
              >
                {premium ? "Você já é Premium" : "Virar Premium"}
              </Button>

              {/* GERENCIAR */}
              {premium && (
                <Button
                  mt={3}
                  variant="outline"
                  borderColor="#D4AF37"
                  color="#D4AF37"
                  rounded="full"
                  _hover={{ bg: "rgba(212,175,55,0.1)" }}
                  onClick={handleCreatePortal}
                >
                  Gerenciar assinatura
                </Button>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Sidebar>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  try {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get("/me");

    return {
      props: {
        premium:
          response.data?.subscriptions?.status === "active" ? true : false,
      },
    };
  } catch (err) {
    return {
      redirect: {
        destination: "/dashboard/barbeiro",
        permanent: false,
      },
    };
  }
});