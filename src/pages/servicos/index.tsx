import {
    Flex,
    Heading,
    Text,
    Button,
    Link as ChakraLink,
    useMediaQuery,
    useDisclosure,
    Input,
    Box,
  } from "@chakra-ui/react";
  import Head from "next/head";
  
  import { canSSRAuth } from "@/utils/canSSRAuth";
  import { Sidebar } from "@/components/sidebar";
  import { IoMdPerson } from "react-icons/io";
  import { setupAPIClient } from "@/services/api";
  import { useState } from "react";
  
  import { LuCalendar } from "react-icons/lu";
  import { Poppins } from "next/font/google";
  
  import DatePicker, { registerLocale } from "react-datepicker";
  import { ptBR } from "date-fns/locale";
  import "react-datepicker/dist/react-datepicker.css";
  
  registerLocale("pt-BR", ptBR);
  
  const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "700"],
  });
  
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
  
  export default function Servicos({ service }: ServiceProps) {
    const [isMobile] = useMediaQuery("(max-width: 768px)");
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    const [data, setData] = useState(new Date());
    const [listService, setListService] = useState(service);
    const [services, setServices] = useState<ServicesProps>();
  
    function handleOpenModal(item: ServicesProps) {
      setServices(item);
      onOpen();
    }
  
  
    async function handleData(date: Date) {
      try {
        const apiClient = setupAPIClient();
  
        const res = await apiClient.get("/service/data", {
          params: {
            status: false,
            data: date,
          },
        });
  
        setListService(res.data);
      } catch (error) {
        console.log(error);
      }
    }
  
    return (
      <>
        <Head>
          <title>AraBarberPRO - Serviços</title>
        </Head>
  
        <Sidebar>
          <Flex  direction="column" p={2}>
  
            {/* HEADER */}
            <Flex
              w={isMobile ? "50%" : "40%"}
              mb={6}
              direction={isMobile ? "column" : "row"}
              justify="space-between"
              align={isMobile ? "flex-start" : "center"}
              gap={4}
            >
              
  
              
            </Flex>
  
           {/* HEADER LISTA */}
           <Flex justify="space-between" flexDirection="column" align="left" mb={4}>
                <Heading color="gray.400" fontSize="md">
                  Ultimos Serviços
                </Heading>
  
                {/* DATE PICKER PREMIUM */}
              <Flex
              mt={4}
                align="center"
                bg="barber.800"
                p={2}
                rounded="full"
                border="1px solid #2A2A2A"
              >
                <LuCalendar color="#D4AF37" style={{ marginLeft: 8 }} />
  
                <DatePicker
                  selected={data}
                  onChange={(date) => {
                    if (date) {
                      setData(date);
                      handleData(date);
                    }
                  }}
                  customInput={
                    <Input
                      border="none"
                      color="white"
                      _focus={{ boxShadow: "none" }}
                    />
                  }
                  locale="pt-BR"
                  dateFormat="dd/MM/yyyy"
                />
              </Flex>
              </Flex>
  
              {/* ITENS */}
              <Flex direction="column">
                {listService.map((item) => (
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
                ))}
              </Flex>
          </Flex>
        </Sidebar>
      </>
    );
  }
  
  export const getServerSideProps = canSSRAuth(async (ctx) => {
    try {
      const apiClient = setupAPIClient(ctx);
  
      const response = await apiClient.get("/service", {
        params: {
          status: false,
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