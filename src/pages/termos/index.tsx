import {
    Box,
    Container,
    Heading,
    Text,
    Stack,
    Flex,
    Link
  } from "@chakra-ui/react";
  
  export default function Termos() {
    return (
      <Box bg="#050505" color="gray.300" py={20}>

<Flex top={0} bg="#000" as="nav" position="fixed" w="100%" zIndex={50} backdropFilter="blur(10px)" py={4}>
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

        <Container maxW="4xl">
          
          <Heading color="white" mb={6}>
            Termos de Uso — <span style={{ color: "#D4AF37" }}>AraBarberPRO</span>
          </Heading>
  
          <Text mb={10} color="gray.400">
            Última atualização: 09 de abril de 2026
          </Text>
  
          <Stack spacing={8}>
  
            <Box>
              <Heading size="md" color="white" mb={2}>
                1. Sobre a Plataforma
              </Heading>
              <Text>
                O AraBarberPRO é um sistema online voltado para gestão de barbearias,
                permitindo o controle de atendimentos, clientes, serviços e relatórios.
              </Text>
            </Box>
  
            <Box>
              <Heading size="md" color="white" mb={2}>
                2. Aceitação dos Termos
              </Heading>
              <Text>
                Ao utilizar a plataforma, você declara que leu e concorda com estes termos.
              </Text>
            </Box>
  
            <Box>
              <Heading size="md" color="white" mb={2}>
                3. Cadastro e Responsabilidade
              </Heading>
              <Text>
                O usuário é responsável por manter suas informações atualizadas e proteger
                seus dados de acesso.
              </Text>
            </Box>
  
            <Box>
              <Heading size="md" color="white" mb={2}>
                4. Planos e Pagamentos
              </Heading>
              <Text>
                O sistema pode oferecer planos gratuitos e pagos. Em caso de inadimplência,
                o acesso poderá ser suspenso.
              </Text>
            </Box>
  
            <Box>
              <Heading size="md" color="white" mb={2}>
                5. Uso Permitido
              </Heading>
              <Text>
                É proibido utilizar a plataforma para atividades ilegais ou que prejudiquem
                o funcionamento do sistema.
              </Text>
            </Box>
  
            <Box>
              <Heading size="md" color="white" mb={2}>
                6. Dados dos Clientes
              </Heading>
              <Text>
                O usuário é responsável pelos dados cadastrados no sistema. O AraBarberPRO
                adota medidas de segurança, mas não garante proteção absoluta.
              </Text>
            </Box>
  
            <Box>
              <Heading size="md" color="white" mb={2}>
                7. Disponibilidade
              </Heading>
              <Text>
                O sistema pode sofrer interrupções para manutenção ou falhas técnicas.
              </Text>
            </Box>
  
            <Box>
              <Heading size="md" color="white" mb={2}>
                8. Cancelamento
              </Heading>
              <Text>
                O usuário pode cancelar sua conta a qualquer momento. Contas que violem
                os termos poderão ser suspensas.
              </Text>
            </Box>
  
            <Box>
              <Heading size="md" color="white" mb={2}>
                9. Limitação de Responsabilidade
              </Heading>
              <Text>
                Não nos responsabilizamos por perdas financeiras ou uso indevido da plataforma.
              </Text>
            </Box>
  
            <Box>
              <Heading size="md" color="white" mb={2}>
                10. Alterações
              </Heading>
              <Text>
                Estes termos podem ser atualizados a qualquer momento.
              </Text>
            </Box>
  
            <Box>
              <Heading size="md" color="white" mb={2}>
                11. Contato
              </Heading>
              <Text>
                📧 suporte@arabarberpro.com
              </Text>
            </Box>
  
            <Box>
              <Heading size="md" color="white" mb={2}>
                12. Legislação
              </Heading>
              <Text>
                Este termo é regido pelas leis brasileiras.
              </Text>
            </Box>
  
          </Stack>
        </Container>
      </Box>
    );
  }