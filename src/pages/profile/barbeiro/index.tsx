import { Sidebar } from "@/components/sidebar";
import {
  Heading,
  Flex,
  Text,
  Box,
  Input,
  Button,
  Image,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { setupAPIClient } from "@/services/api";
import { useRouter } from "next/router";

interface Userprops {
  id: string;
  avatar: string;
  delete_avatar_url:string;
  name: string;
  email: string;
  endereco: string | null;
}

interface ProfileProps {
  user: Userprops;
  premium: boolean;
}

export default function Profile({ user, premium }: ProfileProps) {
  const { logoutUser } = useContext(AuthContext);

  const [name, setName] = useState(user?.name);
  const [endereco, setEndereco] = useState(user?.endereco || "");

  const [avatar, setAvatar] = useState(user?.avatar);
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();



  async function handleUpdateData() {
   router.push("/profile/barbeiro/edit")
  }

  async function handleLogout() {
    await logoutUser()
  }

  return (
    <>
      <Head>
        <title>AraBarberPRO - Minha Conta</title>
      </Head>

      <Sidebar>
        <Flex direction="column">

          <Heading color="white" mb={6}>
            Minha Conta
          </Heading>

          <Flex
            w="100%"
            maxW="500px"
            rounded="2xl"
            bg="barber.800"
            direction="column"
          >
            {/* 🔥 AVATAR EDITÁVEL */}
            <Flex justify="center" mb={6}>
             
                <Box
                  cursor="pointer"
                  borderRadius="full"
                  overflow="hidden"
                  border="3px solid #D4AF37"
                  _hover={{ transform: "scale(1.05)" }}
                  transition="0.2s"
                >
                  <Image
                    src={
                      avatar ||
                      "https://ui-avatars.com/api/?name=User&background=D4AF37&color=000"
                    }
                    objectFit="cover"
                    w="150px"
                    h="150px"
                  />
                </Box>
           
            </Flex>

            <Text color="gray.400" mb={2}>
              Nome da barbearia
            </Text>

            <Text
              mb={6}
              fontSize={18}
            >{name}</Text>

            <Text color="gray.400" mb={2}>
              Endereço
            </Text>

            <Text
              mb={6}
              fontSize={18}
            >{endereco}</Text>

            {/* PLANO */}
            <Flex
              p={4}
              mb={6}
              rounded="xl"
              bg="barber.900"
              justify="space-between"
            >
              <Text color={premium ? "#D4AF37" : "gray.400"}>
                Plano {premium ? "Premium" : "Gratuito"}
              </Text>

              <Link href="/planos/barbeiro">
                <Box color="#000" borderRadius="5px" p={2} bg="brand.gold" cursor="pointer">
                  {premium ? "Gerenciar" : "Upgrade"}
                </Box>
              </Link>
            </Flex>

            {/* SALVAR */}
            <Button
              mb={4}
              onClick={handleUpdateData}
              bg="#D4AF37"
              color="black"
            >
              Editar informações
            </Button>

            {/* LOGOUT */}
            <Button
              variant="outline"
              color="red.500"
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
      avatar: response.data.avatar,
      name: response.data.name,
      email: response.data.email,
      endereco: response.data?.endereco,
      delete_avatar_url: response.data?.delete_avatar_url
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
},["barbeiro"]);