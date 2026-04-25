import {
  Flex,
  Heading,
  Text,
  Button,
  useMediaQuery,
  Input,
} from "@chakra-ui/react";
import Head from "next/head";

import { canSSRAuth } from "@/utils/canSSRAuth";
import { Sidebar } from "@/components/sidebar";
import Link from "next/link";
import { setupAPIClient } from "@/services/api";
import { useState } from "react";

import { LuCalendar } from "react-icons/lu";

import DatePicker, { registerLocale } from "react-datepicker";
import { ptBR } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("pt-BR", ptBR);

interface ServiceProps {
  subscription: boolean;
}

export default function Relat({ subscription }: ServiceProps) {
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const [datainicial, setDatainicial] = useState<Date | null>(new Date());
  const [datafinal, setDatafinal] = useState<Date | null>(new Date());
  const [loading, setLoading] = useState(false);

  async function handleData() {
    if (!datainicial || !datafinal) {
      alert("Selecione o período completo");
      return;
    }

    try {
      setLoading(true);

      const apiClient = setupAPIClient();

      const response = await apiClient.get("/report", {
        params: {
          datainicial: datainicial.toISOString(),
          datafinal: datafinal.toISOString(),
        },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(response.data);

      const a = document.createElement("a");
      a.href = url;
      a.download = "relatorio.pdf";
      a.click();
    } catch (error) {
      console.error("Erro ao gerar PDF", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>AraBarberPRO - Relatórios</title>
      </Head>

      <Sidebar>
        <Flex direction="column" p={2}>

          {/* HEADER */}
          <Heading color="white" fontSize="2xl" mb={6}>
            Relatórios
          </Heading>

          {/* CARD */}
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
            <Text color="gray.400" mb={3}>
              Selecione o período
            </Text>

            {/* DATE PICKER */}
            <Flex
              align="center"
              bg="barber.900"
              p={2}
              rounded="full"
              border="1px solid #2A2A2A"
              mb={6}
            >
              <LuCalendar color="#D4AF37" style={{ marginLeft: 8 }} />

              <DatePicker
                selectsRange
                startDate={datainicial}
                endDate={datafinal}
                onChange={(dates) => {
                  const [start, end] = dates;
                  setDatainicial(start);
                  setDatafinal(end);
                }}
                customInput={
                  <Input
                    border="none"
                    color="white"
                    placeholder="Selecionar período"
                    _focus={{ boxShadow: "none" }}
                  />
                }
                locale="pt-BR"
                dateFormat="dd/MM/yyyy"
              />
            </Flex>

            {/* BOTÃO */}
            <Button
              size="lg"
              bg="#D4AF37"
              color="black"
              rounded="full"
              _hover={{
                bg: "#c59b2f",
                transform: "scale(1.03)",
              }}
              disabled={!subscription}
              isLoading={loading}
              onClick={handleData}
            >
              Gerar relatório
            </Button>

            {/* AVISO PREMIUM */}
            {!subscription && (
              <Flex
                mt={6}
                p={4}
                rounded="xl"
                bg="rgba(255,255,255,0.03)"
                border="1px solid #2A2A2A"
                direction="column"
                align="center"
              >
                <Text color="gray.300" textAlign="center">
                  Você precisa ser premium para gerar relatórios.
                </Text>

                <Link href="/planos/barbeiro">
                  <Text
                    mt={2}
                    color="#D4AF37"
                    fontWeight="bold"
                    cursor="pointer"
                    _hover={{ textDecoration: "underline" }}
                  >
                    Tornar-se Premium
                  </Text>
                </Link>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Sidebar>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  try {
    const apiClient = setupAPIClient(ctx);

    const response = await apiClient.get("/me");

    return {
      props: {
        subscription:
          response.data?.subscriptions?.status === "active" ? true : false,
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