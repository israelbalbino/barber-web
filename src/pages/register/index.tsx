import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Head from "next/head";
import {
  Flex,
  Text,
  Center,
  Input,
  Button,
  RadioGroup,
  Stack,
  Radio,
  Box,
  Image as ChakraImage,
} from "@chakra-ui/react";

import Link from "next/link";
import { canSSRGuest } from "@/utils/canSSRGuest";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300"],
});

const poppins700 = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [client, setClient] = useState("barbeiro");

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const { signUp } = useContext(AuthContext);

  // 🔥 Upload Cloudinary (robusto)
  async function uploadImage(file: File){
    const formData = new FormData();
  
    formData.append("image", file); // ✅ correto
    formData.append("key", "55ea3578fbff56e09afa8253d6beb6af"); // 👈 sua key
  
    const response = await fetch(
      "https://api.imgbb.com/1/upload",
      {
        method: "POST",
        body: formData,
      }
    );
  
    if (!response.ok) {
      throw new Error("Erro ao enviar imagem");
    }
  
    const data = await response.json();
  
  
    // ✅ aqui estava errado antes
    return {
      url: data.data.url,
      deleteUrl: data.data.delete_url,
    };
  }

  async function handleRegister() {
    if (!name || !email || !password || !file) {
      alert("Preencha todos os campos");
      return;
    }

    try {
      setLoading(true);

      let avatarUrl = "";

      // 🔥 envia imagem primeiro
      if (file) {
      const avatarUrl = await uploadImage(file);
         // 🔥 envia pro backend já com URL
      await signUp({
        name,
        email,
        password,
        client,
        avatar: avatarUrl.url,
        delete_avatar_url: avatarUrl.deleteUrl
      });
      }

     
    } catch (err) {
      console.log(err);
      alert("Erro ao cadastrar usuário");
    } finally {
      setLoading(false);
    }
  }

  function handleFile(e: any) {
    const image = e.target.files[0];
    if (!image) return;

    // 🔥 valida tipo
    if (!image.type.startsWith("image/")) {
      alert("Selecione uma imagem válida");
      return;
    }

    setFile(image);
    setPreview(URL.createObjectURL(image));
  }

  return (
    <>
      <Head>
        <title>AraBarberPRO - Crie sua conta</title>
      </Head>

      <Flex
        background="barber.900"
        height="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <Flex maxW="90%" color="#FFF" direction="column" rounded={8}>
          <Center p={4}>
            <Text fontSize={40} fontWeight="bold">
              AraBarber
            </Text>
            <Text fontSize={40} fontWeight="extrabold" color="#D4AF37">
              PRO
            </Text>
          </Center>

          {/* 🔥 Upload Avatar */}
          <Flex direction="column" align="center" mt={4}>
            <input
              type="file"
              accept="image/*"
              id="avatar"
              style={{ display: "none" }}
              onChange={handleFile}
            />

            <label htmlFor="avatar">
              <Flex
                cursor="pointer"
                w="300px"
                h="110px"
                borderRadius="3xl"
                border="2px dashed #D4AF37"
                align="center"
                justify="center"
                overflow="hidden"
                transition="0.2s"
                _hover={{
                  transform: "scale(1.05)",
                  borderColor: "#f5d76e",
                }}
              >
                {preview ? (
                  <ChakraImage
                    src={preview}
                    objectFit="cover"
                    w="100%"
                    h="100%"
                  />
                ) : (
                  <Flex direction="column" align="center">
                    <Text fontSize="2xl">📸</Text>
                    <Text fontSize="xs" color="gray.400" mt={1}>
                      Clique para adicionar uma imagem
                    </Text>
                  </Flex>
                )}
              </Flex>
            </label>
          </Flex>

          {/* Tipo usuário */}
          <RadioGroup mt={3} onChange={setClient} value={client}>
            <Stack direction={{ base: "column", md: "row" }} spacing={2}>
              {[
                { id: "barbeiro", title: "Barbeiro" },
                { id: "cliente", title: "Cliente" },
              ].map((item) => (
                <Box
                  key={item.id}
                  flex="1"
                  p={4}
                  borderWidth="1px"
                  borderRadius="lg"
                  cursor="pointer"
                  borderColor={
                    client === item.id ? "yellow.400" : "gray.600"
                  }
                  bg={client === item.id ? "gray.700" : "gray.800"}
                  onClick={() => setClient(item.id)}
                >
                  <Radio value={item.id} colorScheme="yellow">
                    <Text fontWeight="bold">{item.title}</Text>
                  </Radio>
                </Box>
              ))}
            </Stack>
          </RadioGroup>

          {/* Nome */}
          <Input
            mt={4}
            background="barber.400"
            variant="filled"
            size="lg"
            placeholder={
              client === "barbeiro"
                ? "Nome da Barbearia"
                : "Nome do cliente"
            }
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Email */}
          <Input
            mt={3}
            background="barber.400"
            variant="filled"
            size="lg"
            placeholder="seu@email.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Senha */}
          <Input
            mt={3}
            background="barber.400"
            variant="filled"
            size="lg"
            placeholder="******"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Botão */}
          <Button
            mt={6}
            onClick={handleRegister}
            isLoading={loading}
            background="#D4AF37"
            color="gray.900"
            size="lg"
            _hover={{ bg: "#D4AF37" }}
          >
            Cadastrar
          </Button>

          {/* Login */}
          <Center mt={4}>
            <Link href="/login">
              <Text cursor="pointer">
                Já possui uma conta? <strong>Faça login</strong>
              </Text>
            </Link>
          </Center>
        </Flex>
      </Flex>
    </>
  );
}

export const getServerSideProps = canSSRGuest(async () => {
  return {
    props: {},
  };
});