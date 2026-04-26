import Head from "next/head";
import {
  Flex,
  Text,
  Heading,
  Button,
  useMediaQuery,
  Input,
  Switch,
} from "@chakra-ui/react";
import { Sidebar } from "@/components/sidebar";
import Link from "next/link";
import { FiChevronLeft } from "react-icons/fi";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupAPIClient } from "@/services/api";
import { useContext, useState } from "react";

import { AuthContext } from "../../context/AuthContext";

interface HaircutProps {
  id: string;
  name: string;
  price: number | string;
  status: boolean;
  user_id: string;
}

interface SubscriptionsProps {
  id: string;
  status: string;
}

interface EditHaircutProps {
  haircut: HaircutProps;
  subscription: SubscriptionsProps | null;
}

export default function EditHaircut({
  subscription,
  haircut,
}: EditHaircutProps) {
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const { handleUpdateHaircut } = useContext(AuthContext);

  const [name, setName] = useState(haircut?.name);
  const [price, setPrice] = useState<number | string>(haircut?.price);
  const [status, setStatus] = useState(haircut?.status);

  function handleToggle() {
    setStatus(!status);
  }

  async function handleUpdate() {
    if (!name || !price) return;

    await handleUpdateHaircut({
      haircut_id: haircut?.id,
      name,
      price: Number(price),
      status,
    });
  }

  return (
    <>
      <Head>
        <title>AraBarberPRO - Editar Corte</title>
      </Head>

      <Sidebar>
        <Flex direction="column">

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
              Editar Corte
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
            {/* NOME */}
            <Text color="gray.400" mb={2}>
              Nome do corte
            </Text>

            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              size="lg"
              bg="barber.900"
              border="1px solid #2A2A2A"
              color="white"
              mb={4}
              _focus={{
                borderColor: "#D4AF37",
                boxShadow: "0 0 0 1px #D4AF37",
              }}
            />

            {/* PREÇO */}
            <Text color="gray.400" mb={2}>
              Valor do corte
            </Text>

            <Input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              size="lg"
              bg="barber.900"
              border="1px solid #2A2A2A"
              color="white"
              mb={6}
              _focus={{
                borderColor: "#D4AF37",
                boxShadow: "0 0 0 1px #D4AF37",
              }}
            />

            {/* SWITCH STATUS */}
            <Flex
              align="center"
              justify="space-between"
              mb={6}
              p={3}
              rounded="xl"
              bg="barber.900"
              border="1px solid #2A2A2A"
            >
              <Text color="gray.300">
                {status ? "Corte ativo" : "Corte desativado"}
              </Text>

              <Switch
                colorScheme="yellow"
                isChecked={status}
                onChange={handleToggle}
              />
            </Flex>

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
   disabled={subscription?.status !== "active"}
   onClick={handleUpdate}
   _active={{
     transform: "scale(0.98)",
   }}
 >
  Salvar alterações
 </Button>

            {/* AVISO PREMIUM */}
            {subscription?.status !== "active" && (
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
                  Atualize para o plano premium para editar cortes.
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
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const { id } = ctx.params;

  try {
    const apiClient = setupAPIClient(ctx);

    const check = await apiClient.get("/haircut/check");

    const response = await apiClient.get("/haircut/details", {
      params: {
        haircut_id: id,
      },
    });

    return {
      props: {
        haircut: response.data,
        subscription: check.data?.subscriptions,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/haircuts",
        permanent: false,
      },
    };
  }
},["barbeiro"]);