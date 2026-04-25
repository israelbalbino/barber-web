import {
    Flex,
    Heading,
    Text,
    Button,
    Link as ChakraLink,
    useMediaQuery,
  } from "@chakra-ui/react";
  import Head from "next/head";
  
  import { canSSRAuth } from "@/utils/canSSRAuth";
  import { Sidebar } from "@/components/sidebar";
  import { Sidebarcli } from "@/components/sidebarland";
  import { IoMdPerson } from "react-icons/io";
  import { setupAPIClient } from "@/services/api";
  import { useContext, useState } from "react";
  import { AuthContext } from "../../context/AuthContext";
  
  import { Poppins } from "next/font/google";

  import {
    LineChart,
    Line,
    XAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    YAxis,
    Area,
  } from "recharts";
  
  const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "700"],
  });
  
  interface ServiceProps {
    totalModelos: number;
    totalServicos: number;
    ValorService: number;
    servicosRealizados: ServicesProps[];
  }
  
  export interface ServicesProps {
    id: string;
    customer: string;
    haircut: {
      id: string;
      name: string;
      price: number | string;
      status: boolean;
      user_id: string;
    };
  }
  
  export default function Barbeiro({
    totalModelos,
    totalServicos,
    ValorService,
    servicosRealizados,
  }: ServiceProps) {
    const [isMobile] = useMediaQuery("(max-width: 768px)");
    const { user } = useContext(AuthContext);
  
    const [services] = useState(totalModelos);
    const [totalservicos] = useState(totalServicos);
    const [listService] = useState(servicosRealizados);

    const chartData = listService.map((item, index) => ({
      name: `#${index + 1}`,
      valor: Number(item.haircut?.price) || 0,
    }));
  
    return (
      <>
        <Head>
          <title>AraBarberPRO - Dashboard</title>
        </Head>

<Sidebar>
          <Flex direction="column">
  
            {/* HEADER */}
            <Flex w="100%" direction="column" mb={8}>
              <Heading color="gray.400" fontSize="md">
                Bem-vindo de volta
              </Heading>
  
              <Text color="white" fontSize="3xl" fontWeight="bold">
                {user?.name}
              </Text>
            </Flex>

          {
            user?.client === 'cliente' ? 
            <>
            
            <Flex>
              
            </Flex>
            
            
            
            </>:
            <>
            
            <Flex
  flex={1}
  mb={4}
  p={4}
  
  
  rounded="2xl"
  bg="barber.800"
  boxShadow="lg"
  border="1px solid #2A2A2A"
  direction="column"
>
  <Text color="gray.400">GANHOS</Text>

  <Heading color="green.400" mt={2} mb={4}>
    R$ {ValorService}
  </Heading>


</Flex>

          
            <Flex>
            {/* SERVIÇOS */}
            <Flex
             flex={1}
             p={6}
             rounded="2xl"
             bg="barber.800"
             boxShadow="lg"
             align="center"
             justify="center"
             border="1px solid #2A2A2A"
           >
             <Flex direction="column" align="center"
             justify="center">
               <Text color="gray.400">SERVIÇOS</Text>
               <Heading color="white">{totalservicos}</Heading>
             </Flex>
           </Flex>


           

           {/* MODELOS */}
           <Flex
             flex={1}
             p={6}
             ml={2}
            
             rounded="2xl"
             bg="barber.800"
             boxShadow="lg"
             border="1px solid #2A2A2A"
             align="center"
             justify="center"
           >
             <Flex  direction="column" align="center"
             justify="center">
               <Text color="gray.400">MODELOS</Text>
               <Heading color="white">{services}</Heading>
             </Flex>
           </Flex>
          </Flex>
         

             
  
            {/* CARDS */}
            <Flex
            mt={4}
              gap={4}
              flexDirection={isMobile ? "column" : "column"}
              w="100%"
            >
            


              

              {/* LISTA DE SERVIÇOS */}
            <Flex
              w="100%"
              p={6}
              rounded="2xl"
              bg="barber.800"
              border="1px solid #2A2A2A"
              direction="column"
            >
              {/* HEADER LISTA */}
              <Flex justify="space-between" align="center" mb={4}>
                <Heading color="gray.400" fontSize="md">
                  Serviços recentes
                </Heading>
  
                <ChakraLink href="/servicos" _hover={{ textDecoration: "none" }}>
                  <Button
                    bg="#D4AF37"
                    color="black"
                    size="sm"
                    rounded="full"
                    _hover={{
                      bg: "#c59b2f",
                      transform: "scale(1.05)",
                    }}
                  >
                    VER TODOS
                  </Button>
                </ChakraLink>
              </Flex>
  
              {/* ITENS */}
              <Flex direction="column">
                {listService.map((item) => (
                  <Flex
                    key={item.id}
                    w="100%"
                    p={4}
                    mb={3}
                    rounded="xl"
                    bg="barber.700"
                    border="1px solid #2A2A2A"
                    align="center"
                    justify="space-between"
                    transition="0.2s"
                    _hover={{
                      bg: "barber.900",
                      transform: "translateY(-2px)",
                    }}
                  >
                    <Flex align="center" gap={3}>
                      <Flex bg="#D4AF37" p={2} rounded="full">
                        <IoMdPerson color="#000" size={18} />
                      </Flex>
  
                      <Text color="white">{item.customer}</Text>
                    </Flex>
  
                    <Text color="green.400" fontWeight="bold">
                      R$ {item.haircut?.price}
                    </Text>
                  </Flex>
                ))}
              </Flex>
            </Flex>
  
          
            </Flex>
            </>
          }
  
            
          </Flex>
        </Sidebar>
        
      </>
    );
  }
  
  export const getServerSideProps = canSSRAuth(async (ctx) => {
    try {
      const apiClient = setupAPIClient(ctx);
  
      const response = await apiClient.get("/haircut/count");
      const serv = await apiClient.get("/service/count");
      const totalServicos = await apiClient.get("/service/total", {
        params: { status: false },
      });
      const servicosRealizados = await apiClient.get("/service", {
        params: { status: false },
      });
  
      return {
        props: {
          totalModelos: response.data,
          totalServicos: serv.data,
          ValorService: totalServicos.data,
          servicosRealizados: servicosRealizados.data,
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