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
  const [display, setDisplay] = useState("");

  const formatBRL = (value: number) => {
    return value.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value;

    // remove tudo que não é número
    const digits = raw.replace(/\D/g, "");

    if (digits === "") {
      setPrice(null);
      setDisplay("");
      return;
    }

    // transforma em centavos → depois divide
    const numericValue = Number(digits) / 100;

    setPrice(numericValue);
    setDisplay(formatBRL(numericValue));
  };

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

      <Flex direction="column" >

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
            placeholder="Ex: Cabelo Degradê..."
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
            type="text"
            bg="barber.900"
            border="1px solid #2A2A2A"
            color="white"
            mb={6}
            value={display}
            onChange={handleChange}
            _focus={{
              borderColor: "#D4AF37",
              boxShadow: "0 0 0 1px #D4AF37",
            }}
          />

          {/* BOTÃO */}
          <Button
   
    bgGradient="linear(to-r, #D4AF37, #f5d76e)"
    color="black"
    fontWeight="bold"
    px={6}
    py={5}
    rounded="full"
    boxShadow="0 4px 14px rgba(212, 175, 55, 0.4)"
    transition="all 0.25s ease"
    _hover={{
      bgGradient: "linear(to-r, #c59b2f, #e6c65c)",
      transform: "translateY(-2px) scale(1.04)",
      boxShadow: "0 6px 20px rgba(212, 175, 55, 0.6)",
    }}
    _active={{
      transform: "scale(0.98)",
    }}
  >
   Cadastrar corte
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