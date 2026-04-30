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
import { FiCamera } from "react-icons/fi";

interface Userprops {
  id: string;
  avatar: string;
  delete_avatar_url: string;
  name: string;
  email: string;
  endereco: string | null;
}

interface ProfileProps {
  user: Userprops;
  premium: boolean;
}

export default function Edit({ user, premium }: ProfileProps) {
  const { handleUpdate } = useContext(AuthContext);
  const router = useRouter();

  const [name, setName] = useState(user?.name);
  const [endereco, setEndereco] = useState(user?.endereco || "");

  const [avatar, setAvatar] = useState(user?.avatar);
  const [file, setFile] = useState<File | null>(null);

  function handleCancel() {
    router.push("/profile/barbeiro");
  }

  async function uploadImage(file: File) {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("key", "55ea3578fbff56e09afa8253d6beb6af");

    const res = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    return {
      url: data.data.url,
      deleteUrl: data.data.delete_url,
    };
  }

  async function handleFile(e: any) {
    const image = e.target.files[0];
    if (!image) return;

    if (!image.type.startsWith("image/")) {
      alert("Arquivo inválido");
      return;
    }

    setFile(image);
    setAvatar(URL.createObjectURL(image));
  }

  async function handleUpdateData() {
    if (!name) return;

    try {
      if (file) {
        const avatarUpload = await uploadImage(file);

        await handleUpdate({
          name,
          endereco,
          avatar: avatarUpload.url,
          delete_avatar_url: avatarUpload.deleteUrl,
        });
      } else {
        await handleUpdate({
          name,
          endereco,
          avatar: user?.avatar,
          delete_avatar_url: user?.delete_avatar_url,
        });
      }

      // 🔥 Redireciona após salvar
      router.push("/report/barbeiro");

    } catch (err) {
      console.log(err);
      alert("Erro ao atualizar");
    }
  }

  return (
    <>
      <Head>
        <title>AraBarberPRO - Minha Conta</title>
      </Head>

      <Sidebar>
        <Flex direction="column">
          <Heading color="white" mb={6}>
            Editar Perfil
          </Heading>

          <Flex
            w="100%"
            maxW="500px"
            rounded="2xl"
            bg="barber.800"
            direction="column"
          >
            {/* AVATAR */}
            <Flex justify="center" mb={6}>
              <input
                type="file"
                accept="image/*"
                id="avatar"
                style={{ display: "none" }}
                onChange={handleFile}
              />

              <label htmlFor="avatar">
              <Flex justify="center" mb={6}>
  <Box position="relative">

    {/* INPUT escondido */}
    <input
      type="file"
      accept="image/*"
      id="avatar"
      style={{ display: "none" }}
      onChange={handleFile}
    />

    {/* AVATAR */}
    <label htmlFor="avatar">
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
    </label>

    {/* ÍCONE UPLOAD */}
    <Box
      position="absolute"
      bottom="5px"
      right="5px"
      bg="#D4AF37"
      borderRadius="full"
      p={2}
      cursor="pointer"
      border="2px solid #1A202C"
      _hover={{ transform: "scale(1.1)" }}
      transition="0.2s"
    >
      <label htmlFor="avatar" style={{ cursor: "pointer" }}>
        <FiCamera color="black" />
      </label>
    </Box>

  </Box>
            </Flex>
              </label>
            </Flex>

            <Text color="gray.400" mb={2}>
              Nome da barbearia
            </Text>

            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              mb={4}
              bg="barber.900"
              color="#FFF"
              borderColor="gray.800"
            />

            <Text color="gray.400" mb={2}>
              Endereço
            </Text>

            <Input
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              mb={6}
              bg="barber.900"
              color="white"
              borderColor="gray.800"
            />

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
                <Box
                  color="#000"
                  borderRadius="5px"
                  p={2}
                  bg="brand.gold"
                  cursor="pointer"
                >
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
              Salvar alterações
            </Button>

            
            {/* CANCELAR */}
            <Button
              mb={2}
              variant="outline"
              color="gray.300"
              borderColor="gray.600"
              _hover={{ bg: "gray.700" }}
              onClick={handleCancel}
            >
              Cancelar
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
      delete_avatar_url: response.data?.delete_avatar_url,
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
}, ["barbeiro"]);