import { Sidebar } from "@/components/sidebar";
import {
  Flex,
  Text,
  Heading,
  Button,
  useMediaQuery,
  Input,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { FiChevronLeft } from "react-icons/fi";

import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupAPIClient } from "@/services/api";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";

interface NewHaircutProps {
  subscription: boolean;
  count: number;
}

export default function NewHaircut({
  subscription,
  count,
}: NewHaircutProps) {
  const [isMobile] = useMediaQuery("(max-width:768px)");
  const { handleNewHaircut } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | null>(null);

  async function handleHaircut() {
    if (!name || !price) return;

    await handleNewHaircut({
      name,
      price,
    });
  }

  return (
    <Sidebar>
      <Head>
        <title>AraBarberPRO - Novo Corte</title>
      </Head>

      <Flex direction="column" p={6}>

        {/* HEADER */}
        <Flex align="center" mb={6} gap={3}>
          <Link href="/haircuts">
            <Flex
              p={2}
              rounded="full"
              bg="barber.800"
              cursor="pointer"
              _hover={{ bg: "barber.700" }}
            >
              <FiChevronLeft color="#D4AF37" />
            </Flex>
          </Link>

          <Heading color="white" fontSize="2xl">
            Novo Corte
          </Heading>
        </Flex>

        {/* CARD FORM */}
        <Flex
          w="100%"
          maxW="500px"
          p={8}
          rounded="2xl"
          bg="barber.800"
          border="1px solid #2A2A2A"
          boxShadow="lg"
          direction="column"
        >
          {/* INPUT NOME */}
          <Text color="gray.400" mb={2}>
            Nome do corte
          </Text>

          <Input
            placeholder="Ex: Degradê, Social..."
            size="lg"
            bg="barber.900"
            border="1px solid #2A2A2A"
            color="white"
            mb={4}
            value={name}
            onChange={(e) => setName(e.target.value)}
            _focus={{
              borderColor: "#D4AF37",
              boxShadow: "0 0 0 1px #D4AF37",
            }}
          />

          {/* INPUT PREÇO */}
          <Text color="gray.400" mb={2}>
            Valor do corte
          </Text>

          <Input
            placeholder="Ex: 59.90"
            size="lg"
            type="number"
            bg="barber.900"
            border="1px solid #2A2A2A"
            color="white"
            mb={6}
            value={price ?? ""}
            onChange={(e) => setPrice(Number(e.target.value))}
            _focus={{
              borderColor: "#D4AF37",
              boxShadow: "0 0 0 1px #D4AF37",
            }}
          />

          {/* BOTÃO */}
          <Button
            size="lg"
            bg="#D4AF37"
            color="black"
            rounded="full"
            _hover={{
              bg: "#c59b2f",
              transform: "scale(1.03)",
            }}
            disabled={!subscription && count >= 3}
            onClick={handleHaircut}
          >
            Cadastrar Corte
          </Button>

          {/* ALERTA PREMIUM */}
          {!subscription && count >= 3 && (
            <Flex
              mt={6}
              p={4}
              rounded="xl"
              bg="rgba(255,255,255,0.03)"
              border="1px solid #2A2A2A"
              direction="column"
              align="center"
            >
              <Text color="gray.300" textAlign="center">
                Você atingiu o limite de cortes gratuitos.
              </Text>

              <Link href="/planos">
                <Text
                  mt={2}
                  color="#D4AF37"
                  fontWeight="bold"
                  cursor="pointer"
                  _hover={{ textDecoration: "underline" }}
                >
                  Tornar-se Premium
                </Text>
              </Link>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Sidebar>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  try {
    const apiClient = setupAPIClient(ctx);

    const response = await apiClient.get("/haircut/check");
    const count = await apiClient.get("/haircut/count");

    return {
      props: {
        subscription:
          response.data?.subscriptions?.status === "active" ? true : false,
        count: count.data,
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