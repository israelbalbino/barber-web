import {
    Flex,
    Heading,
    Text,
    Button,
    Link as ChakraLink,
    useMediaQuery,
    useDisclosure,
  } from "@chakra-ui/react";
  import Head from "next/head";
  
  import { canSSRAuth } from "@/utils/canSSRAuth";
  import { Sidebarcli } from "@/components/sidebarland";
  import Link from "next/link";
  import { IoMdPerson } from "react-icons/io";
  import { setupAPIClient } from "@/services/api";
  import { useState,useEffect } from "react";

  import { Html5Qrcode } from "html5-qrcode";
  import { ModalInfo } from "@/components/modal";
  
  
  import { io } from "socket.io-client";
import Router from "next/router";
  
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


    async function handleQrcode(){

      
      
    }

    
  
  
  
  
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
  
        <Sidebarcli>
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
            
  
         
                <Button
                  onClick={() => Router.push("cliente/scan")}
                  bg="#D4AF37"
                  color="black"
                  rounded="full"
                  _hover={{
                    bg: "#c59b2f",
                    transform: "scale(1.05)",
                  }}
                >
                  + SCAN QRCODE
                </Button>
       
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
                  bg="barber.800"
                  border="1px solid #2A2A2A"
                >
                  <Flex direction="column">
                    <Text mb={2} color="gray.400">Agora</Text>
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
                    <Text mb={2} color="gray.400">Próximo</Text>
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
                      
                      w="100%"
                      p={4}
                      mb={3}
                      rounded="xl"
                      bg="barber.700"
                      border="1px solid #2A2A2A"
                      align="center"
                      justify="space-between"
                      transition="0.2s"
                      textDecoration="none"
                      _hover={{
                        bg: "barber.900",
                        transform: "translateY(-2px)",
                        textDecoration:"none"
                      }}
                    >
                      <Flex align="center" gap={3}>
                        <Flex bg="#D4AF37" p={2} rounded="full">
                          <IoMdPerson color="#000" size={18} />
                        </Flex>
    
                        <Text textDecoration="none" color="white">{item.customer}</Text>
                      </Flex>
    
                      <Text color="green.400" fontWeight="bold">
                        R$ {item.haircut?.price}
                      </Text>
                    </Flex>
                    </ChakraLink>
                  ))}
                </Flex>
          </Flex>
        </Sidebarcli>
  
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
          destination: "/dashboard/cliente",
          permanent: false,
        },
      };
    }
  },["cliente"]);