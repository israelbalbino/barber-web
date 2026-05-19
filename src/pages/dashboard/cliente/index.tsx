import {
    Flex,
    Heading,
    Button,
    Link as ChakraLink,
    useMediaQuery,
  } from "@chakra-ui/react";
  import Head from "next/head";
  
  import { canSSRAuth } from "@/utils/canSSRAuth";
  import { Sidebarcli } from "@/components/sidebarland";
 
  
  
  import { io } from "socket.io-client";
import Router from "next/router";
  
  const socket = io(`${process.env.NEXT_PUBLIC_API_URL}`);

  
  export default function Dashboard() {
    const [isMobile] = useMediaQuery("(max-width: 768px)");
    
  
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
  
        
          </Flex>
        </Sidebarcli>
  
  
      </>
    );
  }
  
  export const getServerSideProps = canSSRAuth(
    async (ctx) => {
      return {
        props: {}
      };
    },
    ["cliente"]
  );