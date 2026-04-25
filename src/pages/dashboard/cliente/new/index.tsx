import { Sidebar } from "@/components/sidebar";
import {
  Flex,
  Text,
  Heading,
  Button,
  useMediaQuery,
  Input,
  Select,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { FiChevronLeft } from "react-icons/fi";

import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupAPIClient } from "@/services/api";
import { useContext, useState } from "react";
import { AuthContext } from "@/pages/context/AuthContext";

interface HaircutsItem {
  id: string;
  name: string;
}

interface HaircutsProps {
  haircuts: HaircutsItem[];
}

export default function New({ haircuts }: HaircutsProps) {
  const [isMobile] = useMediaQuery("(max-width:768px)");

  const { handleNewService } = useContext(AuthContext);

  const [customer, setCustomer] = useState("");
  const [haircutList] = useState<HaircutsItem[]>(haircuts || []);
  const [haircut_id, setHaircut_id] = useState(haircutList[0]?.id);

  async function handleService() {
    if (!customer || !haircut_id) return;

    await handleNewService({
      haircut_id,
      customer,
    });
  }

  return (
    <Sidebar>
      <Head>
        <title>AraBarberPRO - Novo Serviço</title>
      </Head>

      <Flex direction="column" p={2}>

        {/* HEADER */}
        <Flex align="center" mb={6} gap={3}>
          <Link href="/dashboard/cliente">
            <Flex
              p={2}
              rounded="full"
              bg="barber.800"
              cursor="pointer"
              _hover={{ bg: "barber.700" }}
            >
              <FiChevronLeft color="#D4AF37" />
            </Flex>
          </Link>

          <Heading color="white" fontSize="2xl">
            Novo Serviço
          </Heading>
        </Flex>

        {/* FORM CARD */}
        <Flex
          w="100%"
          maxW="500px"
          p={8}
          rounded="2xl"
          bg="barber.800"
          border="1px solid #2A2A2A"
          boxShadow="lg"
          direction="column"
        >
          <Text color="gray.400" mb={2}>
            Nome do cliente
          </Text>

          <Input
            placeholder="Ex: João Silva"
            size="lg"
            bg="barber.900"
            border="1px solid #2A2A2A"
            color="white"
            mb={4}
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            _focus={{
              borderColor: "#D4AF37",
              boxShadow: "0 0 0 1px #D4AF37",
            }}
          />

          <Text color="gray.400" mb={2}>
            Tipo de corte
          </Text>

          <Select
            value={haircut_id}
            onChange={(e) => setHaircut_id(e.target.value)}
            size="lg"
            bg="barber.900"
            border="1px solid #2A2A2A"
            color="white"
            mb={6}
            _focus={{
              borderColor: "#D4AF37",
              boxShadow: "0 0 0 1px #D4AF37",
            }}
          >
            {haircutList.map((item) => (
              <option
                key={item.id}
                value={item.id}
                style={{ backgroundColor: "#111", color: "#fff" }}
              >
                {item.name}
              </option>
            ))}
          </Select>

          <Button
            size="lg"
            bg="#D4AF37"
            color="black"
            rounded="full"
            _hover={{
              bg: "#c59b2f",
              transform: "scale(1.03)",
            }}
            onClick={handleService}
          >
            Cadastrar Serviço
          </Button>
        </Flex>
      </Flex>
    </Sidebar>
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
    return {
      redirect: {
        destination: "/dashboard/cliente",
        permanent: false,
      },
    };
  }
},["cliente"]);