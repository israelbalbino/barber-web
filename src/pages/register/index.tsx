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
  InputGroup,
  InputRightElement,
  IconButton,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

import { FiEye, FiEyeOff } from "react-icons/fi";
import Link from "next/link";
import { canSSRGuest } from "@/utils/canSSRGuest";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["300"] });
const poppins700 = Poppins({ subsets: ["latin"], weight: ["700"] });

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [client, setClient] = useState("barbeiro");

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const { signUp } = useContext(AuthContext);

  async function uploadImage(file: File) {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("key", "55ea3578fbff56e09afa8253d6beb6af");

    const response = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    return {
      url: data.data.url,
      deleteUrl: data.data.delete_url,
    };
  }

  async function handleRegister() {
    setError("");

    if (!name || !email || !password || !file) {
      setError("Preencha todos os campos");
      return;
    }

    try {
      setLoading(true);

      const avatar = await uploadImage(file);

      await signUp({
        name,
        email,
        password,
        client,
        avatar: avatar.url,
        delete_avatar_url: avatar.deleteUrl,
      });
    } catch (err) {
      setError("Erro ao criar conta. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  function handleFile(e: any) {
    const image = e.target.files[0];
    if (!image) return;

    if (!image.type.startsWith("image/")) {
      setError("Selecione uma imagem válida");
      return;
    }

    setFile(image);
    setPreview(URL.createObjectURL(image));
  }

  return (
    <>
      <Head>
        <title>AraBarberPRO - Criar Conta</title>
      </Head>

      <Flex
        minH="100vh"
        align="center"
        justify="center"
        bg="radial-gradient(circle at top, #111 0%, #000 100%)"
      >
        {/* CARD */}
        <Flex
          w="100%"
          maxW="420px"
          p={8}
          direction="column"
          borderRadius="2xl"
          backdropFilter="blur(20px)"
          bg="rgba(255,255,255,0.03)"
          border="1px solid rgba(255,255,255,0.08)"
          boxShadow="0 20px 60px rgba(0,0,0,0.8)"
        >
          {/* LOGO */}
          <Center mb={6}>
            <Text fontSize="3xl" fontWeight="bold">
              AraBarber
              <Text as="span" color="#D4AF37">PRO</Text>
            </Text>
          </Center>

          {/* ERROR */}
          {error && (
            <Alert bg="red.900" status="error" mb={4} borderRadius="lg">
              <AlertIcon />
              {error}
            </Alert>
          )}

          {/* UPLOAD */}
          <Flex justify="center" w="100%" mb={5}>
            <input
              type="file"
              accept="image/*"
              id="avatar"
              hidden
              onChange={handleFile}
              
            />

<label htmlFor="avatar" style={{ width: "100%" }}>
              <Box
                cursor="pointer"
                w="100%"
                h="110px"
                borderRadius="3xl"
                border="2px dashed #D4AF37"
                overflow="hidden"
                transition="0.3s"
                _hover={{ transform: "scale(1.05)" }}
              >
                {preview ? (
                  <ChakraImage
                    src={preview}
                    objectFit="cover"
                    w="100%"
                    h="100%"
                  />
                ) : (
                  <Center h="100%">
                    <Text fontSize="xs" color="gray.400">
                      Clique e adicione uma imagem
                    </Text>
                  </Center>
                )}
              </Box>

              </label>
          
          </Flex>

          {/* TYPE */}
          <RadioGroup value={client} onChange={setClient}>
            <Stack direction="row" mb={4}>
              {["barbeiro", "cliente"].map((type) => (
                <Box
                  key={type}
                  flex="1"
                  p={3}
                  borderRadius="xl"
                  textAlign="center"
                  cursor="pointer"
                  border="1px solid"
                  borderColor={client === type ? "#D4AF37" : "gray.700"}
                  bg={client === type ? "rgba(212,175,55,0.1)" : "transparent"}
                  onClick={() => setClient(type)}
                >
                  <Radio value={type} colorScheme="yellow">
                    {type}
                  </Radio>
                </Box>
              ))}
            </Stack>
          </RadioGroup>

          {/* INPUTS */}
          <Input
            placeholder="Nome e sobrenome"
            mb={3}
            size="lg"
            bg="rgba(255,255,255,0.05)"
            border="1px solid rgba(255,255,255,0.08)"
            _focus={{ borderColor: "#D4AF37" }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            placeholder="Email"
            mb={3}
            size="lg"
            bg="rgba(255,255,255,0.05)"
            border="1px solid rgba(255,255,255,0.08)"
            _focus={{ borderColor: "#D4AF37" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* SENHA */}
          <InputGroup mb={4}>
  <Input
    background="barber.400"
    variant="filled"
    size="lg"
    placeholder="******"
    type={showPassword ? "text" : "password"}
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    border={error ? "1px solid #FF4D4F" : "1px solid transparent"}
    _focus={{
      border: error ? "1px solid #FF4D4F" : "1px solid #D4AF37",
      boxShadow: "none",
    }}
    sx={{
      "&::-ms-reveal": { display: "none" },
      "&::-ms-clear": { display: "none" },
    }}
  />

  <InputRightElement height="100%">
    <IconButton
      aria-label="Mostrar senha"
      variant="ghost"
      size="sm"
      onClick={() => setShowPassword(!showPassword)}
      icon={showPassword ? <FiEyeOff color="#FFF" /> : <FiEye color="#FFF" />}
      _hover={{ bg: "transparent" }}
    />
  </InputRightElement>
</InputGroup>

          {/* BUTTON */}
          <Button
            isLoading={loading}
            loadingText="Criando..."
            bg="#D4AF37"
            color="black"
            size="lg"
            borderRadius="xl"
            _hover={{
              bg: "#f5d76e",
              transform: "translateY(-2px)",
              boxShadow: "0 10px 25px rgba(212,175,55,0.4)",
            }}
            onClick={handleRegister}
          >
            Criar conta
          </Button>

          {/* LOGIN */}
          <Center mt={5}>
            <Link href="/login">
              <Text fontSize="sm" color="gray.400" cursor="pointer">
                Já tem conta? <strong>Entrar</strong>
              </Text>
            </Link>
          </Center>
        </Flex>
      </Flex>
    </>
  );
}

export const getServerSideProps = canSSRGuest(async () => {
  return { props: {} };
});