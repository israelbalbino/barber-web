import { useState, useContext, useEffect } from "react";
import Head from "next/head";
import {
  Flex,
  Text,
  Input,
  Button,
  Box,
  InputGroup,
  InputRightElement,
  IconButton,
  useMediaQuery,
  Spinner,
  useToast
} from "@chakra-ui/react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Link from "next/link";
import { AuthContext } from "../../context/AuthContext";
import { canSSRGuest } from "../../utils/canSSRGuest";
import { Poppins } from "next/font/google";
import { keyframes } from "@emotion/react";
import { SplashScreen } from "@/components/splash";
import { AnimatePresence, motion } from "framer-motion";
const poppins = Poppins({ subsets: ["latin"], weight: ["300"] });
const poppins700 = Poppins({ subsets: ["latin"], weight: ["700"] });


const shine = keyframes`
  0% { left: -50%; }
  100% { left: 150%; }
`;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const [loading,setLoading] = useState(false)
  const toast = useToast();

  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  

  const [showSplash,setShowSplash] = useState(true);


  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1800);
  
    return () => clearTimeout(timer);
  }, []);
  
  async function handleLogin() {
    setErrorEmail(false);
    setErrorPassword(false);
  
    if (!email) {
      setErrorEmail(true);
  
      toast({
        title: "Email obrigatório",
        description: "Digite seu email para continuar",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
  
      return;
    }
  
    if (!password) {
      setErrorPassword(true);
  
      toast({
        title: "Senha obrigatória",
        description: "Digite sua senha",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
  
      return;
    }
  
    try {
      setLoading(true);
  
      await signIn({
        email,
        password,
      });
  
    } catch (err: any) {
      // ERRO DO BACKEND (login inválido)
      setErrorEmail(true);
      setErrorPassword(true);
  
      toast({
        title: "Erro ao entrar",
        description: "Email ou senha inválidos",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
  
    } finally {
      setLoading(false);
    }
  }

  if (showSplash) {
    return <SplashScreen />;
  }
  return (
    <>
      <Head>
        <title>AraBarberPRO - Login</title>
      </Head>

      <Flex
        minH="100vh"
        align="center"
        justify="center"
        bg="linear-gradient(180deg, #050505, #0d0d0d)"
        position="relative"
        overflow="hidden"
      >
        {/* GLOW BACKGROUND */}
        <Box
          position="absolute"
          top="-150px"
          left="-150px"
          w="350px"
          h="350px"
          bg="rgba(212,175,55,0.15)"
          filter="blur(120px)"
          borderRadius="full"
        />

        {/* CARD LOGIN */}
        <Box
          w="100%"
          maxW={isMobile ? "90%" : "30%"}
          p={8}
          borderRadius="2xl"
          bg="rgba(255,255,255,0.03)"
          backdropFilter="blur(20px)"
          border="1px solid rgba(255,255,255,0.08)"
          boxShadow="0 20px 60px rgba(0,0,0,0.8)"
        >
          {/* LOGO */}
          <Flex mb={8} justify="center" align="center">
            <Text fontSize="32px" fontWeight="bold" color="white">
              AraBarber
            </Text>
            <Text fontSize="32px" fontWeight="extrabold" color="#D4AF37" ml={1}>
              PRO
            </Text>
          </Flex>

          {/* EMAIL */}
          <Input
  background="barber.400"
  variant="filled"
  size="lg"
  placeholder="seu@email.com"
  type="email"
  mb={2}
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  border={errorEmail ? "1px solid #FF4D4F" : "1px solid transparent"}
  _focus={{
    border: errorEmail ? "1px solid #FF4D4F" : "1px solid #D4AF37",
    boxShadow: "none",
  }}
/>

{errorEmail && (
  <Text fontSize="xs" color="#FF4D4F" mb={3}>
    Email inválido ou obrigatório
  </Text>
)}

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
    border={errorPassword ? "1px solid #FF4D4F" : "1px solid transparent"}
    _focus={{
      border: errorPassword ? "1px solid #FF4D4F" : "1px solid #D4AF37",
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

{errorPassword && (
  <Text fontSize="xs" color="#FF4D4F" mb={4}>
    Senha inválida ou obrigatória
  </Text>
)}

          {/* BOTÃO */}
          <Button
  w="100%"
  mb={2}
  h="56px"
  borderRadius="xl"
  position="relative"
  overflow="hidden"
  bgGradient="linear(to-r, #D4AF37, #F6D365)"
  color="black"
  fontWeight="bold"
  fontSize="md"
  letterSpacing="wide"
  onClick={handleLogin}
  isDisabled={loading}
  _hover={{
    transform: "translateY(-2px)",
    boxShadow: "0 10px 30px rgba(212,175,55,0.4)",
  }}
  _active={{
    transform: "scale(0.97)",
  }}
  transition="all 0.25s ease"
>
  {/* CONTEÚDO */}
  <Flex align="center" justify="center" gap={2}>
    {loading ? (
      <>
        {/* SPINNER PREMIUM */}
        <Spinner
          size="sm"
          thickness="3px"
          speed="0.6s"
          color="black"
        />

        <Text>Entrando...</Text>
      </>
    ) : (
      "Acessar"
    )}
  </Flex>

  {/* SHINE ANIMADO */}
  {!loading && (
    <Box
      position="absolute"
      top={0}
      left="-50%"
      w="50%"
      h="100%"
      bgGradient="linear(to-r, transparent, rgba(255,255,255,0.3), transparent)"
      transform="skewX(-20deg)"
      animation="shine 3s infinite"
    />
  )}
</Button>

          {/* LINK */}
          <Text textAlign="center" color="gray.400" fontSize="sm">
            Ainda não possui conta?{" "}
            <Link href="/register">
              <Text as="span" color="#D4AF37" cursor="pointer">
                Criar conta
              </Text>
            </Link>
          </Text>
        </Box>
      </Flex>
    </>
  );
}

export const getServerSideProps = canSSRGuest(async () => {
  return { props: {} };
});