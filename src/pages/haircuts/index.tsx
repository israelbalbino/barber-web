import Head from "next/head";
import { Sidebar } from "@/components/sidebar";
import {
  Flex,
  Text,
  Heading,
  Button,
  Stack,
  Switch,
  useMediaQuery,
} from "@chakra-ui/react";

import Link from "next/link";
import { IoMdPricetag } from "react-icons/io";

import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupAPIClient } from "@/services/api";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";

interface HaircutsItem {
  id: string;
  name: string;
  price: number | string;
  status: boolean;
  user_id: string;
}

interface HaircutsProps {
  haircuts: HaircutsItem[];
}

export default function Haircuts({ haircuts }: HaircutsProps) {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  const [active, setActive] = useState(true);
  const [haircutList, setHaircutList] = useState<HaircutsItem[]>(haircuts || []);

  async function handleToggle() {
    try {
      const api = setupAPIClient();

      const newStatus = !active;
      setActive(newStatus);

      const response = await api.get("/haircuts", {
        params: {
          status: newStatus,
        },
      });

      setHaircutList(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Head>
        <title>AraBarberPRO - Modelos de corte</title>
      </Head>

      <Sidebar>
        <Flex direction="column">

          {/* HEADER */}
          <Flex
            direction={isMobile ? "column" : "row"}
            w="100%"
            align={isMobile ? "flex-start" : "center"}
            justify="space-between"
            mb={6}
            gap={3}
          >
            <Heading color="white" fontSize={isMobile ? "2xl" : "3xl"}>
              Modelos de corte
            </Heading>

            <Flex gap={3} align="center">
              <Link href="/haircuts/new">
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

              <Stack direction="row" align="center">
                

                <Switch
                  size="lg"
                  colorScheme="green"
                  isChecked={active}
                  onChange={handleToggle}
                />
              </Stack>
            </Flex>
          </Flex>

          {/* LISTA */}
          <Flex direction="column" gap={3}>
            {haircutList.map((item) => (
              <Link key={item.id} href={`/haircuts/${item.id}`}>
                <Flex
                  cursor="pointer"
                  p={4}
                  borderRadius="xl"
                bg="#0f172a"
                border="1px solid rgba(255,255,255,0.04)"
                  align={isMobile ? "" : "center"}
                  justify={isMobile ? "" : "space-between"}
                  direction={isMobile ? "column" : "row"}
                  _hover={{
                    transform: "scale(1.01)",
                    borderColor: "#D4AF37",
                  }}
                >
                  {/* NOME */}
                  <Flex align="center" mb={isMobile ? 2 : 0}>
                    <IoMdPricetag size={22} color="#D4AF37" />

                    <Flex ml={3} direction="column">
                      <Text fontSize="xs" color="gray.400">
                        Corte
                      </Text>

                      <Text fontWeight="semibold">
                        {item.name}
                      </Text>
                    </Flex>
                  </Flex>

                  {/* PREÇO */}
                  <Text fontWeight="bold" color="#22c55e">
                    R$ {item.price}
                  </Text>
                </Flex>
              </Link>
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

    const response = await apiClient.get("/haircuts", {
      params: {
        status: true,
      },
    });

    return {
      props: {
        haircuts: response.data,
      },
    };
  } catch (error) {
    console.log(error);

    return {
      redirect: {
        destination: "/dashboard/barbeiro",
        permanent: false,
      },
    };
  }
},["barbeiro"]);