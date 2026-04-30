import { Box, Container, Heading, Text, Button, Stack, SimpleGrid, Icon, Link,Flex, Avatar } from '@chakra-ui/react'
import theme from '@/theme'
import { FiMenu } from 'react-icons/fi'
import { keyframes } from "@emotion/react";
import Image from 'next/image';
import fundo from '../../public/images/fundo.jpeg'
import fund from '../../public/images/fund.jpeg'
import Router  from 'next/router';

const shine = keyframes`
  0% { transform: translateX(-100%) skewX(-20deg); }
  100% { transform: translateX(200%) skewX(-20deg); }
`;



export default function LandingPage() {


  function handlePlanos(){

   const route = Router.push('/login')

  }


  return (
    <Box bg="barber.700" color="white" minH="100vh">
      {/* Navbar - Componente fixo com blur */}
      <Flex bg="#000" as="nav" position="fixed" w="100%" zIndex={50} backdropFilter="blur(10px)" py={4}>
        <Flex ml={4} mr={4} w="100%"  display="flex" justifyContent="space-between" flexDirection="row" alignItems="center">
          <Link textDecoration="none" _hover={{textDecoration:"none"}} href="/" display="flex">
            <Heading fontSize={20} color="#FFF">AraBarber</Heading>
          <Heading color="brand.gold" size="md">PRO</Heading>
          </Link>
         <Flex>
         <Link  borderBottom="1px solid #000" href='/login' rounded={5} textDecoration="none" _hover={{textDecoration:"none"}} display="flex" justifyContent="center" alignItems="center" w={100} h={30} variant="outline" bg="brand.gold" color="#000">Entrar</Link>
         </Flex>
        </Flex>
      </Flex>

      {/* Hero Section */}
      <Box
       bg="rgba(0, 0, 0, 0.6)" // Overlay preto com 50% opacidade
       bgBlendMode="darken" // Mescla o fundo com a imagem
       bgSize="cover"
       p={4}
      color="white"
      bgImage={`url("/images/planodefundo.png")`}  pt={32} textAlign="center">

        <Container>

          <Text border="1px solid" rounded={10} color="brand.gold"  letterSpacing="widest" mb={4}>
            A EXCELÊNCIA EM GESTÃO
          </Text>

          <Heading fontStyle="italic" fontSize={60} mb={6}>Domine sua Barbearia com o </Heading>
          <Heading fontStyle="italic"  mb={4} fontSize={40} color="brand.gold">AraBarberPRO</Heading>

          <Text fontSize="xl" opacity={0.8} mb={8}>

            Gestão completa para o barbeiro moderno. Transforme seu atelier em uma máquina de precisão.
          </Text>

          <Button onClick={handlePlanos} bg="brand.gold" size="lg" px={10}>Começar Agora</Button>

        </Container>
      </Box>

     {/* Web App Feature Section */}
     <Box
     id='recursos'
      py={24}
      position="relative"
      bgGradient="linear(to-br, #0b0b0b, #1a1a1a)"
      overflow="hidden"
    >
      {/* Glow dourado */}
      <Box
        position="absolute"
        top="-120px"
        left="-120px"
        w="350px"
        h="350px"
        bg="rgba(251,169,49,0.15)"
        filter="blur(120px)"
        borderRadius="full"
      />

      {/* Textura */}
      <Box
        position="absolute"
        inset={0}
        opacity={0.05}
        bgImage="url('https://www.transparenttextures.com/patterns/asfalt-dark.png')"
      />

      <Container  maxW="6xl" position="relative">
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacing={16}
          alignItems="center"
        >
          {/* TEXTO */}
          <Box position="relative" overflow="hidden">
            {/* Efeito de luz passando */}
            <Box
              position="absolute"
              top={0}
              left={0}
              w="50%"
              h="100%"
              bg="linear-gradient(120deg, transparent, rgba(255,255,255,0.15), transparent)"
              animation={`${shine} 4s infinite`}
            />

            <Box w="60px" h="3px" bg="brand.gold" mb={4} borderRadius="full" />

            <Text
              color="brand.gold"
              mb={2}
              fontWeight="bold"
              letterSpacing="wide"
            >
              EXPERIÊNCIA MOBILE PREMIUM
            </Text>

            <Heading mb={4} color="white" fontSize="3xl">
              Web App Exclusivo
            </Heading>

            <Text mb={6} color="gray.300">
              Sem downloads. Você faz tudo de forma rápida e prática.
            </Text>

          </Box>

          {/* MOCKUP CELULAR */}
          <Box position="relative" display="flex" justifyContent="center">
            {/* Glow atrás do celular */}
            <Box
              position="absolute"
              w="250px"
              h="250px"
              bg="rgba(251,169,49,0.2)"
              filter="blur(100px)"
              borderRadius="full"
            />

            {/* Celular */}
            <Box
              borderRadius="30px"
              p="6px"
              bg="linear-gradient(145deg, #2a2a2a, #0d0d0d)"
              boxShadow="0 20px 60px rgba(0,0,0,0.8)"
            >
              <Box
                bg="#000"
                borderRadius="25px"
                overflow="hidden"
                w="260px"
                h="520px"
              >
                <Image
                   // 🔥 coloque print do seu sistema aqui
                  src={fundo}
                  alt="App Preview"
                  objectFit="cover"
                />
              </Box>
            </Box>
          </Box>
        </SimpleGrid>
      </Container>

      
    </Box>

    <Box>

      {/* Web App Feature Section */}
     <Box
     id='recursos'
      py={24}
      position="relative"
      bgGradient="linear(to-br, #0b0b0b, #1a1a1a)"
      overflow="hidden"
    >
      {/* Glow dourado */}
      <Box
        position="absolute"
        top="-120px"
        left="-120px"
        w="350px"
        h="350px"
        bg="rgba(251,169,49,0.15)"
        filter="blur(120px)"
        borderRadius="full"
      />

      {/* Textura */}
      <Box
        position="absolute"
        inset={0}
        opacity={0.05}
        bgImage="url('https://www.transparenttextures.com/patterns/asfalt-dark.png')"
      />

      <Container  maxW="6xl" position="relative">
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacing={16}
          alignItems="center"
        >
          {/* TEXTO */}
          <Box position="relative" overflow="hidden">
            {/* Efeito de luz passando */}
            <Box
              position="absolute"
              top={0}
              left={0}
              w="50%"
              h="100%"
              bg="linear-gradient(120deg, transparent, rgba(255,255,255,0.15), transparent)"
              animation={`${shine} 4s infinite`}
            />

            <Box w="60px" h="3px" bg="brand.gold" mb={4} borderRadius="full" />

            <Text
              color="brand.gold"
              mb={2}
              fontWeight="bold"
              letterSpacing="wide"
            >
              Chega de filas
            </Text>

            <Heading mb={4} color="white" fontSize="3xl">
              Web App clientes
            </Heading>

            <Text mb={6} color="gray.300">
              Propocione ao seu cliente um aplicativo para que ele tenha acesso a fila da sua barbearia.
            </Text>

          </Box>

          {/* MOCKUP CELULAR */}
          <Box position="relative" display="flex" justifyContent="center">
            {/* Glow atrás do celular */}
            <Box
              position="absolute"
              w="250px"
              h="250px"
              bg="rgba(251,169,49,0.2)"
              filter="blur(100px)"
              borderRadius="full"
            />

            {/* Celular */}
            <Box
              borderRadius="30px"
              p="6px"
              bg="linear-gradient(145deg, #2a2a2a, #0d0d0d)"
              boxShadow="0 20px 60px rgba(0,0,0,0.8)"
            >
              <Box
                bg="#000"
                borderRadius="25px"
                overflow="hidden"
                w="260px"
                h="520px"
              >
                <Image
                   // 🔥 coloque print do seu sistema aqui
                  src={fund}
                  alt="App Preview"
                  objectFit="cover"
                />
              </Box>
            </Box>
          </Box>
        </SimpleGrid>
      </Container>

      
    </Box>
    
    </Box>

    <Box
  py={24}
  position="relative"
  bgGradient="linear(to-br, #050505, #111)"
  overflow="hidden"
>
  {/* GLOW PREMIUM */}
  <Box
    position="absolute"
    top="-120px"
    right="-120px"
    w="350px"
    h="350px"
    bg="rgba(212,175,55,0.15)"
    filter="blur(120px)"
    borderRadius="full"
  />

  <Container maxW="6xl" position="relative">
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={16} alignItems="center">

      {/* LADO ESQUERDO - TEXTO */}
      <Box>
        <Text color="brand.gold" fontWeight="bold" mb={2}>
          EXCLUSIVO AraBarberPRO
        </Text>

        <Heading color="white" fontSize="4xl" mb={4}>
          AraButtonPRO
        </Heading>

          {/* CARD DO PRODUTO */}
          <Box
          borderRadius="30px"
          w="100%"
          bg="linear-gradient(145deg, #2a2a2a, #0d0d0d)"
          boxShadow="0 25px 80px rgba(0,0,0,0.9)"
        >
          <Box
            borderRadius="25px"
            overflow="hidden"
            w="100%"
            h="380px"
            position="relative"
          >
            <Image
              src="/images/arabutton.jpeg"
              alt="AraButtonPRO"
              fill
              style={{ objectFit: "cover" }}
            />

            {/* OVERLAY GRADIENT */}
            <Box
              position="absolute"
              inset={0}
              bgGradient="linear(to-t, rgba(0,0,0,0.7), transparent)"
            />

           
          </Box>
        </Box>

        <Text mt={10} color="gray.300" mb={6} fontSize="lg">
          Um botão físico inteligente que transforma sua barbearia em uma experiência moderna.
          Com apenas um toque, você organiza sua fila automaticamente e impressiona seus clientes.
        </Text>

        <Stack spacing={4} mb={8}>
          <Text color="gray.300">✔ Atendimento mais rápido e organizado</Text>
          <Text color="gray.300">✔ Clientes acompanham a fila em tempo real</Text>
          <Text color="gray.300">✔ Experiência premium dentro da barbearia</Text>
          <Text color="gray.300">✔ Integração total com o sistema</Text>
        </Stack>

       
      </Box>

     
    </SimpleGrid>
  </Container>
</Box>


    

    <Box
      py={24}
      position="relative"
      bgGradient="linear(to-b, #050505, #111)"
      overflow="hidden"
    >
      {/* Glow fundo */}
      <Box
        position="absolute"
        top="-100px"
        left="-100px"
        w="300px"
        h="300px"
        bg="rgba(251,169,49,0.15)"
        filter="blur(120px)"
        borderRadius="full"
      />

      <Container id='depoimentos' maxW="6xl" position="relative">
        <Heading
          textAlign="center"
          color="white"
          mb={16}
          fontSize={{ base: "2xl", md: "4xl" }}
        >
          Quem usa AraBarberPRO
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
          
          {/* CARD 1 */}
          <Box
            
            p={6}
            borderRadius="2xl"
            bg="rgba(255,255,255,0.03)"
            backdropFilter="blur(10px)"
            border="1px solid rgba(255,255,255,0.08)"
            transition="0.3s"
            _hover={{
              transform: "translateY(-8px)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.6)"
            }}
          >
            <Text color="brand.gold" mb={3}>★★★★★</Text>

            <Text color="gray.300" mb={6}>
              “Depois que comecei a usar o sistema, minha barbearia ficou muito mais organizada. A fila em tempo real impressiona os clientes.”
            </Text>

            <Flex align="center">
              <Avatar name="Carlos Silva" mr={3} />
              <Box>
                <Text color="white" fontWeight="bold">Carlos Silva</Text>
                <Text fontSize="sm" color="gray.400">Barbeiro</Text>
              </Box>
            </Flex>
          </Box>

          {/* CARD 2 */}
          <Box
            p={6}
            borderRadius="2xl"
            bg="rgba(255,255,255,0.03)"
            backdropFilter="blur(10px)"
            border="1px solid rgba(255,255,255,0.08)"
            transition="0.3s"
            _hover={{
              transform: "translateY(-8px)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.6)"
            }}
          >
            <Text color="brand.gold" mb={3}>★★★★★</Text>

            <Text color="gray.300" mb={6}>
              “O Web App é surreal. Meus clientes adoram acompanhar a fila sem precisar ficar perguntando.”
            </Text>

            <Flex align="center">
              <Avatar name="Rafael Santos" mr={3} />
              <Box>
                <Text color="white" fontWeight="bold">Rafael Santos</Text>
                <Text fontSize="sm" color="gray.400">Dono de Barbearia</Text>
              </Box>
            </Flex>
          </Box>

          {/* CARD 3 */}
          <Box
            p={6}
            borderRadius="2xl"
            bg="linear-gradient(145deg, #1a1a1a, #0a0a0a)"
            border="1px solid rgba(212,175,55,0.4)"
            position="relative"
            transition="0.3s"
            _hover={{
              transform: "translateY(-10px)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.8)"
            }}
          >
            {/* Glow interno */}
            <Box
              position="absolute"
              inset={0}
              borderRadius="2xl"
              bg="rgba(212,175,55,0.08)"
              filter="blur(40px)"
            />

            <Text color="brand.gold" mb={3}>★★★★★</Text>

            <Text color="gray.200" mb={6}>
              “Aumentei meu faturamento porque consigo atender melhor e organizar o fluxo. Vale cada centavo.”
            </Text>

            <Flex align="center">
              <Avatar name="Lucas Oliveira" mr={3} />
              <Box>
                <Text color="white" fontWeight="bold">Lucas Oliveira</Text>
                <Text fontSize="sm" color="gray.400">Empresário</Text>
              </Box>
            </Flex>
          </Box>

        </SimpleGrid>
      </Container>
    </Box>
    
    <Box
      id="planos"
      py={24}
      position="relative"
      bgGradient="linear(to-b, #050505, #111)"
      overflow="hidden"
    >
      {/* Glow fundo */}
      <Box
        position="absolute"
        bottom="-120px"
        right="-120px"
        w="350px"
        h="350px"
        bg="rgba(251,169,49,0.15)"
        filter="blur(120px)"
        borderRadius="full"
      />

      <Container   maxW="6xl" position="relative">
        <Heading
          mt={4}
          color="white"
          textAlign="center"
          mb={16}
          fontSize={{ base: "2xl", md: "4xl" }}
        >
          Planos para cada fase do seu sucesso
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          {/* BASIC */}
          <Box
            p={8}
            borderRadius="2xl"
            bg="rgba(255,255,255,0.03)"
            backdropFilter="blur(10px)"
            border="1px solid rgba(255,255,255,0.08)"
            transition="0.3s"
            _hover={{
              transform: "translateY(-8px)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.6)"
            }}
          >
            <Text color="gray.400" mb={2}>
              Para começar
            </Text>

            <Heading color="white" size="md">
              Plano Basic
            </Heading>

            <Text fontSize="4xl" fontWeight="bold" my={6} color="white">
              R$ 0{" "}
              <Text as="span" fontSize="sm" color="gray.400">
                /mês
              </Text>
            </Text>

            <Stack spacing={4} color="gray.300">
              <Text>✓ Dashboard personalizado</Text>
              <Text>✓ 3 Modelos de cortes</Text>
              <Text>✓ Cadastro de serviços</Text>
              <Text>✓ webApp clientes</Text>
            </Stack>

            <Button
            onClick={handlePlanos}
              mt={8}
              w="100%"
              variant="outline"
              borderColor="gray.600"
              color="white"
              _hover={{
                bg: "whiteAlpha.100"
              }}
            >
              Começar grátis
            </Button>
          </Box>

          {/* PRO */}
          <Box
            p={10}
            borderRadius="2xl"
            position="relative"
            bg="linear-gradient(145deg, #1a1a1a, #0a0a0a)"
            border="1px solid rgba(212,175,55,0.4)"
            transform={{ md: "scale(1.05)" }}
            boxShadow="0 20px 60px rgba(0,0,0,0.8)"
          >
            {/* Badge */}
            <Box
              position="absolute"
              top="-12px"
              left="50%"
              transform="translateX(-50%)"
              bg="brand.gold"
              color="black"
              px={4}
              py={1}
              borderRadius="full"
              fontSize="xs"
              fontWeight="bold"
              boxShadow="0 0 20px rgba(212,175,55,0.6)"
            >
              MAIS POPULAR
            </Box>

            {/* Glow interno */}
            <Box
              position="absolute"
              inset={0}
              borderRadius="2xl"
              bg="rgba(212,175,55,0.08)"
              filter="blur(40px)"
            />

            <Text color="brand.gold" mb={2}>
              Para quem quer crescer
            </Text>

            <Heading color="white" size="md">
              Plano PRO
            </Heading>

            <Text fontSize="4xl" fontWeight="bold" my={6} color="white">
              R$ 99,90{" "}
              <Text as="span" fontSize="sm" color="gray.400">
                /mês
              </Text>
            </Text>

            <Stack spacing={4} color="gray.200">
              <Text>✓ Tudo do Basic</Text>
              <Text>✓ Relatórios completos</Text>
              <Text>✓ Web App para clientes</Text>
              <Text>✓ Botão elétronico</Text>
              <Text>✓ Fila em tempo real</Text>
            </Stack>

            <Button
            onClick={handlePlanos}
              mt={8}
              w="100%"
              bg="brand.gold"
              color="black"
              size="lg"
              _hover={{
                bg: "#ffbe55",
                transform: "translateY(-2px)",
                boxShadow: "0 0 25px rgba(212,175,55,0.6)"
              }}
            >
              Escolher PRO
            </Button>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>

    <Box
      bg="#050505"
      color="gray.400"
      pt={20}
      pb={10}
      position="relative"
      overflow="hidden"
    >
      {/* Glow topo */}
      <Box
        position="absolute"
        top="0"
        left="50%"
        transform="translateX(-50%)"
        w="80%"
        h="1px"
        bg="linear-gradient(90deg, transparent, #D4AF37, transparent)"
      />

      <Container maxW="6xl">
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={10}>
          
          {/* LOGO + DESCRIÇÃO */}
          <Stack spacing={4}>
            <Heading size="md" color="white">
              AraBarber<span style={{ color: "#D4AF37" }}>PRO</span>
            </Heading>

            <Text fontSize="sm">
              Sistema completo para barbearias que querem crescer, organizar e faturar mais.
            </Text>
          </Stack>

          {/* LINKS */}
          <Stack>
            <Text color="white" fontWeight="bold">Produto</Text>
            <Link href='#recursos' _hover={{ color: "brand.gold" }}>Recursos</Link>
            <Link href='#planos' _hover={{ color: "brand.gold" }}>Planos</Link>
            <Link href='#depoimentos' _hover={{ color: "brand.gold" }}>Depoimentos</Link>
          </Stack>

          {/* SUPORTE */}
          <Stack>
            <Text color="white" fontWeight="bold">Suporte</Text>
            <Link _hover={{ color: "brand.gold" }}>Ajuda</Link>
            <Link _hover={{ color: "brand.gold" }}>Contato</Link>
            <Link href='/termos' _hover={{ color: "brand.gold" }}>Termos de uso</Link>
          </Stack>

          {/* CONTATO */}
          <Stack>
            <Text color="white" fontWeight="bold">Contato</Text>
            <Text fontSize="sm">📧 suporte@arabarberpro.com</Text>
            <Text fontSize="sm">📱 (82) 99910-6277</Text>
          </Stack>

        </SimpleGrid>

        {/* Linha inferior */}
        <Flex
          mt={16}
          pt={6}
          borderTop="1px solid rgba(255,255,255,0.08)"
          justify="space-between"
          direction={{ base: "column", md: "row" }}
          align="center"
          gap={4}
        >
          <Text fontSize="sm">
            © {new Date().getFullYear()} AraBarberPRO. Todos os direitos reservados.
          </Text>

          <Flex gap={6}>
            <Link href='/privacidade' _hover={{ color: "brand.gold" }}>Privacidade</Link>
            <Link href='/termos' _hover={{ color: "brand.gold" }}>Termos</Link>
          </Flex>
        </Flex>
      </Container>
    </Box>


    </Box>
  )
}
