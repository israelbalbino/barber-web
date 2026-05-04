import { useState } from "react";
import Head from "next/head";
import {
  Flex,
  Box,
  Input,
  Button,
  Text,
  Heading,
  Center,
  Alert,
  AlertIcon,
  InputGroup,
  InputRightElement,
  IconButton,
  PinInput,
  PinInputField,
  HStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { api } from "@/services/apiClient";
import { Router, useRouter } from "next/router";

const MotionBox = motion(Box);

export default function Recovery() {
  const [step, setStep] = useState<"email" | "code" | "reset">("email");

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSendEmail() {
    setError("");
    if (!email) return setError("Digite seu email");

    try {
      setLoading(true);

      await api.post("/forgot-password",
        {
         
            email:email 
          
        }
      );

      setStep("code");
      console.log("ok",step)
    } catch {
      setError("Erro ao enviar email");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyCode() {
    setError("");
  
    if (code.length < 6) {
      return setError("Código inválido");
    }
  
    try {
      setLoading(true);
  
      await api.post("/verify-reset-code", {
        email,
        token: code,
      });
  
      // ✅ só entra se backend validar
      setStep("reset");
  
    } catch (err: any) {
      setError("Código inválido ou expirado");
    } finally {
      setLoading(false);
    }
  }
  async function handleResetPassword() {
    setError("");
    if (!password) return setError("Digite a nova senha");

    try {
      setLoading(true);

      await api.post("/reset-password", {
        email,
        token: code,
        password,
      });

      setStep("email");
      setEmail("");
      setCode("");
      setPassword("");

      alert("Senha alterada com sucesso");
      router.push("/login")
    } catch {
      setError("Erro ao redefinir senha");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Recuperar senha - AraBarberPRO</title>
      </Head>

      <Flex
        minH="100vh"
        align="center"
        justify="center"
        bg="radial-gradient(circle at top, #111 0%, #000 100%)"
      >
        <MotionBox
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          w="100%"
          maxW="400px"
          p={8}
          borderRadius="2xl"
          bg="rgba(255,255,255,0.03)"
          backdropFilter="blur(20px)"
          border="1px solid rgba(255,255,255,0.08)"
          boxShadow="0 20px 60px rgba(0,0,0,0.8)"
        >
          {/* LOGO */}
          <Center mb={6}>
            <Heading size="lg">
              AraBarber
              <Text as="span" color="#D4AF37">
                PRO
              </Text>
            </Heading>
          </Center>

          {/* ERROR */}
          {error && (
            <Alert color="#000" status="error" mb={4} borderRadius="lg">
              <AlertIcon />
              {error}
            </Alert>
          )}

          {/* STEP 1 - EMAIL */}
          {step === "email" && (
            <>
              <Heading size="md" mb={2}>
                Recuperar senha
              </Heading>

              <Text fontSize="sm" color="gray.400" mb={4}>
                Digite seu email para receber o código
              </Text>

              <Input
                placeholder="seu@email.com"
                size="lg"
                mb={4}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                bg="rgba(255,255,255,0.05)"
              />

              <Button
                isLoading={loading}
                w="100%"
                size="lg"
                bg="#D4AF37"
                color="black"
                _hover={{
                  bg: "#f5d76e",
                  transform: "translateY(-2px)",
                }}
                onClick={handleSendEmail}
              >
                Enviar código
              </Button>
            </>
          )}

          {/* STEP 2 - CODE */}
          {step === "code" && (
            <>
              <Heading size="md" mb={2}>
                Código de verificação
              </Heading>

              <Text fontSize="sm" color="gray.400" mb={6}>
                Verifique seu email
              </Text>

              <Center mb={6}>
                <HStack>
                  <PinInput onChange={setCode}>
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                  </PinInput>
                </HStack>
              </Center>

              <Button
  isLoading={loading}
  w="100%"
  size="lg"
  bg="#D4AF37"
  color="black"
  _hover={{ transform: "translateY(-2px)" }}
  onClick={handleVerifyCode}
>
  Validar código
</Button>
            </>
          )}

          {/* STEP 3 - RESET */}
          {step === "reset" && (
            <>
              <Heading size="md" mb={2}>
                Nova senha
              </Heading>

              <Text fontSize="sm" color="gray.400" mb={4}>
                Crie uma nova senha segura
              </Text>

              <InputGroup mb={6}>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Nova senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  bg="rgba(255,255,255,0.05)"
                />

                <InputRightElement>
                  <IconButton
                    aria-label="toggle"
                    variant="ghost"
                    icon={showPassword ? <FiEyeOff /> : <FiEye />}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </InputRightElement>
              </InputGroup>

              <Button
                isLoading={loading}
                w="100%"
                size="lg"
                bg="#D4AF37"
                color="black"
                onClick={handleResetPassword}
              >
                Redefinir senha
              </Button>
            </>
          )}
        </MotionBox>
      </Flex>
    </>
  );
}