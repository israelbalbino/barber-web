import { Sidebar } from "@/components/sidebar";
import {
  Heading,
  Flex,
  Text,
  Box,
  Input,
  Button,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { setupAPIClient } from "@/services/api";

interface Userprops {
  id: string;
  name: string;
  email: string;
  endereco: string | null;
}

interface ProfileProps {
  user: Userprops;
  premium: boolean;
}

export default function Profile({ user, premium }: ProfileProps) {
  const { logoutUser, handleUpdate } = useContext(AuthContext);

  const [name, setName] = useState(user?.name);
  const [endereco, setEndereco] = useState(user?.endereco || "");

  async function handleLogout() {
    await logoutUser();
  }

  async function handleUpdateData() {
    if (!name) return;

    await handleUpdate({
      name,
      endereco,
    });
  }

  return (
    <>
      <Head>
        <title>AraBarberPRO - Minha Conta</title>
      </Head>

      <Sidebar>
        <Flex direction="column" alignItems="flex-start" p={2}>

          {/* HEADER */}
          <Heading color="white" fontSize="2xl" mb={6}>
            Minha Conta
          </Heading>

          {/* CARD */}
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
              Nome da barbearia
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

            {/* ENDEREÇO */}
            <Text color="gray.400" mb={2}>
              Endereço
            </Text>

            <Input
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
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

            {/* PLANO */}
            <Flex
              p={4}
              mb={6}
              rounded="xl"
              bg="barber.900"
              border="1px solid #2A2A2A"
              align="center"
              justify="space-between"
            >
              <Text color={premium ? "#D4AF37" : "gray.400"}>
                Plano {premium ? "Premium" : "Gratuito"}
              </Text>

              <Link href="/planos/barbeiro">
                <Box
                  px={3}
                  py={1}
                  rounded="full"
                  bg={premium ? "transparent" : "#D4AF37"}
                  color={premium ? "#D4AF37" : "black"}
                  border={premium ? "1px solid #D4AF37" : "none"}
                  cursor="pointer"
                  _hover={{ opacity: 0.8 }}
                >
                  {premium ? "Gerenciar" : "Upgrade"}
                </Box>
              </Link>
            </Flex>

            {/* BOTÃO SALVAR */}
            <Button
              size="lg"
              bg="#D4AF37"
              color="black"
              rounded="full"
              _hover={{
                bg: "#c59b2f",
                transform: "scale(1.03)",
              }}
              mb={4}
              onClick={handleUpdateData}
            >
              Salvar alterações
            </Button>

            {/* LOGOUT */}
            <Button
              size="lg"
              variant="outline"
              borderColor="red.500"
              color="red.500"
              rounded="full"
              _hover={{
                bg: "rgba(255,0,0,0.05)",
              }}
              onClick={handleLogout}
            >
              Sair da conta
            </Button>
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

    const user = {
      id: response.data.id,
      name: response.data.name,
      email: response.data.email,
      endereco: response.data?.endereco,
    };

    return {
      props: {
        user,
        premium:
          response.data?.subscriptions?.status === "active" ? true : false,
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
});