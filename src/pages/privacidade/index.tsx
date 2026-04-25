import {
    Box,
    Container,
    Heading,
    Text,
    Stack,
    Flex,
    Link
  } from "@chakra-ui/react";
  
  export default function Privacidade() {
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
            Política de Privacidade — <span style={{ color: "#D4AF37" }}>AraBarberPRO</span>
          </Heading>
  
          <Text mb={10} color="gray.400">
            Última atualização: 09 de abril de 2026
          </Text>
  
          <Stack spacing={8}>
  
            <Box>
              <Heading size="md" color="white" mb={2}>
                1. Introdução
              </Heading>
              <Text>
                Esta Política de Privacidade descreve como coletamos, usamos e protegemos
                os dados dos usuários do AraBarberPRO, em conformidade com a Lei Geral de
                Proteção de Dados (LGPD - Lei nº 13.709/2018).
              </Text>
            </Box>
  
            <Box>
              <Heading size="md" color="white" mb={2}>
                2. Dados Coletados
              </Heading>
              <Text>
                Podemos coletar os seguintes dados:
                <br />• Nome, e-mail e telefone
                <br />• Informações de uso da plataforma
                <br />• Dados de clientes cadastrados pelo usuário
              </Text>
            </Box>
  
            <Box>
              <Heading size="md" color="white" mb={2}>
                3. Finalidade do Uso dos Dados
              </Heading>
              <Text>
                Os dados são utilizados para:
                <br />• Operação e melhoria da plataforma
                <br />• Comunicação com o usuário
                <br />• Geração de relatórios e funcionalidades do sistema
              </Text>
            </Box>
  
            <Box>
              <Heading size="md" color="white" mb={2}>
                4. Compartilhamento de Dados
              </Heading>
              <Text>
                Não vendemos dados pessoais. Podemos compartilhar informações apenas quando
                necessário para funcionamento do sistema ou por obrigação legal.
              </Text>
            </Box>
  
            <Box>
              <Heading size="md" color="white" mb={2}>
                5. Armazenamento e Segurança
              </Heading>
              <Text>
                Adotamos medidas técnicas e organizacionais para proteger os dados contra
                acessos não autorizados, perdas ou vazamentos.
              </Text>
            </Box>
  
            <Box>
              <Heading size="md" color="white" mb={2}>
                6. Direitos do Usuário (LGPD)
              </Heading>
              <Text>
                O usuário pode, a qualquer momento:
                <br />• Solicitar acesso aos seus dados
                <br />• Corrigir informações incorretas
                <br />• Solicitar exclusão dos dados
                <br />• Revogar consentimentos
              </Text>
            </Box>
  
            <Box>
              <Heading size="md" color="white" mb={2}>
                7. Cookies
              </Heading>
              <Text>
                Podemos utilizar cookies para melhorar a experiência do usuário e análise
                de uso da plataforma.
              </Text>
            </Box>
  
            <Box>
              <Heading size="md" color="white" mb={2}>
                8. Retenção de Dados
              </Heading>
              <Text>
                Os dados serão mantidos enquanto necessários para a prestação do serviço
                ou conforme exigido por lei.
              </Text>
            </Box>
  
            <Box>
              <Heading size="md" color="white" mb={2}>
                9. Alterações nesta Política
              </Heading>
              <Text>
                Esta política pode ser atualizada a qualquer momento. Recomendamos revisão
                periódica.
              </Text>
            </Box>
  
            <Box>
              <Heading size="md" color="white" mb={2}>
                10. Contato
              </Heading>
              <Text>
                Em caso de dúvidas ou solicitações relacionadas aos seus dados:
                <br />📧 suporte@arabarberpro.com
              </Text>
            </Box>
  
          </Stack>
        </Container>
      </Box>
    );
  }