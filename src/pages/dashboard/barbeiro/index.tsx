import {
  Flex,
  Heading,
  Text,
  Button,
  Link as ChakraLink,
  useMediaQuery,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import Head from "next/head";

import { canSSRAuth } from "@/utils/canSSRAuth";
import { Sidebar } from "@/components/sidebar";
import Link from "next/link";
import { IoMdPerson } from "react-icons/io";
import { setupAPIClient } from "@/services/api";
import { useState,useEffect } from "react";
import { ModalInfo } from "@/components/modal";


import { io } from "socket.io-client";
import { FiPlus } from "react-icons/fi";

const socket = io(`${process.env.NEXT_PUBLIC_API_URL}`);

interface ServiceProps {
  service: ServicesProps[];
}

export interface ServicesProps {
  id: string;
  customer: string;
  status: boolean | string;
  haircut: {
    id: string;
    name: string;
    price: number | string;
    status: boolean;
    user_id: string;
  };
}

export default function Dashboard({ service }: ServiceProps) {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [listService, setListService] = useState(service);
  const [services, setServices] = useState<ServicesProps>();

  

  function handleOpenModal(item: ServicesProps) {
    setServices(item);
    onOpen();
  }

  async function listaDados() {

    const apiClient = setupAPIClient();

    const response = await apiClient.get("/service", {
      params: {
        status: true,
      },
    });

    setListService(response.data)
    
  }


  useEffect(() => {

    socket.on("novo_servico", (data)=>{
      listaDados()
    })

    socket.on("servicos_atualizados", (data) => {
      listaDados()
      
    });

   
  
    
  }, []);




  async function handleFinish(id: string) {
    try {
      const apiClient = setupAPIClient();

      await apiClient.delete("/service/delet", {
        params: {
          schedule_id: id,
        },
      });

      const filterItem = listService.filter((item) => item.id !== id);
      setListService(filterItem);
      onClose();
    } catch (err) {
      console.log(err);
      onClose();
      alert("Erro ao finalizar este serviço");
    }
  }

  return (
    <>
      <Head>
        <title>AraBarberPRO - Dashboard</title>
      </Head>

      <Sidebar>
        <Flex direction="column" p={2}>

          {/* HEADER */}
          <Flex
            w="100%"
            mb={6}
            direction={isMobile ? "row" : "row"}
            justify="space-between"
            align={isMobile ? "flex-start" : "center"}
            gap={4}
          >
            <Heading fontSize="2xl" color="white">
              Serviços
            </Heading>
          

            <Link href="/dashboard/barbeiro/new">
  <Button
   
    bgGradient="linear(to-r, #D4AF37, #f5d76e)"
    color="black"
    fontWeight="bold"
    px={6}
    py={5}
    rounded="full"
    boxShadow="0 4px 14px rgba(212, 175, 55, 0.4)"
    transition="all 0.25s ease"
    _hover={{
      bgGradient: "linear(to-r, #c59b2f, #e6c65c)",
      transform: "translateY(-2px) scale(1.04)",
      boxShadow: "0 6px 20px rgba(212, 175, 55, 0.6)",
    }}
    _active={{
      transform: "scale(0.98)",
    }}
  >
   <FiPlus/>
  </Button>
</Link>
          </Flex>

          {/* STATUS (CORTANDO / PRÓXIMO) */}
          <Flex
            gap={4}
            flexDirection={isMobile ? "column" : "row"}
            mb={6}
          >
            {listService[0]?.status === true && (
              <Flex
                flex={1}
                p={5}
                rounded="2xl"
                borderRadius="xl"
                bg="#0f172a"
                border="1px solid rgba(255,255,255,0.04)"
              >
                <Flex direction="column">
                  <Text fontWeight="bold" mb={2} color="brand.gold">Agora</Text>
                  <Heading color="white" fontSize="lg">
                    {listService[0]?.customer}
                  </Heading>
                  <Text color="green.400" mt={1}>
                    Cortando
                  </Text>
                </Flex>
              </Flex>
            )}

            {listService[1]?.status === true && (
              <Flex
                flex={1}
                p={5}
                rounded="2xl"
                bg="barber.800"
                border="1px solid #2A2A2A"
              >
                <Flex direction="column">
                  <Text fontWeight="bold" mb={2} color="brand.gold">Próximo</Text>
                  <Heading color="white" fontSize="lg">
                    {listService[1]?.customer}
                  </Heading>
                  <Text color="orange.400" mt={1}>
                    Aguardando
                  </Text>
                </Flex>
              </Flex>
            )}
          </Flex>

          {/* ITENS */}
          <Flex direction="column">
                {listService.map((item) => (
                  <ChakraLink key={item.id} _hover={{textDecoration:"none"}} onClick={()=>handleFinish(item.id)}>
                   <Flex
                key={item.id}
                p={4}
                mb={3}
                borderRadius="xl"
                bg="#0f172a"
                border="1px solid rgba(255,255,255,0.04)"
                justify="space-between"
                align="center"
                _hover={{
                  transform: "translateY(-2px)",
                  bg: "#111827",
                }}
              >
                <Flex align="center" gap={3}>
                  <Box bg="#D4AF37" p={2} borderRadius="full">
                    <IoMdPerson size={18} color="#000" />
                  </Box>

                  <Text>{item.customer}</Text>
                </Flex>

                <Text color="green.400" fontWeight="bold">
                  R$ {item.haircut?.price}
                </Text>
              </Flex>
                  </ChakraLink>
                ))}
              </Flex>
        </Flex>
      </Sidebar>

      <ModalInfo
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        data={services}
        finishService={() => handleFinish(services?.id)}
      />
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  try {
    const apiClient = setupAPIClient(ctx);

    const response = await apiClient.get("/service", {
      params: {
        status: true,
        data:null
      },
    });

    return {
      props: {
        service: response.data,
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