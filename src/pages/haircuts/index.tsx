import Head from "next/head";
import { Sidebar } from "@/components/sidebar";
import {
  Flex,
  Text,
  Heading,
  Button,
  Switch,
  useMediaQuery,
  Spinner,
} from "@chakra-ui/react";

import Link from "next/link";
import { IoMdPricetag } from "react-icons/io";

import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupAPIClient } from "@/services/api";
import { useState, useRef, useCallback } from "react";
import { FiPlus } from "react-icons/fi";

interface HaircutsItem {
  id: string;
  name: string;
  price: number | string;
  status: boolean;
  user_id: string;
}

interface HaircutsResponse {
  data: HaircutsItem[];
  hasMore: boolean;
  page: number;
  total: number;
}

interface HaircutsProps {
  haircuts: HaircutsItem[];
  initialHasMore: boolean;
}

// 🔥 limite de memória (não travar)
const MAX_ITEMS = 100;

export default function Haircuts({ haircuts, initialHasMore }: HaircutsProps) {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  const [active, setActive] = useState(true);

  const [haircutList, setHaircutList] = useState<HaircutsItem[]>(haircuts);
  const [page, setPage] = useState(2);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(initialHasMore);

  const observer = useRef<IntersectionObserver | null>(null);

  // 🔥 LOAD MAIS OTIMIZADO
  const loadMore = async () => {
    if (loadingMore || !hasMore) return;

    try {
      setLoadingMore(true);
      const api = setupAPIClient();

      const response = await api.get<HaircutsResponse>("/haircuts", {
        params: {
          status: active,
          page,
          limit: 4,
        },
      });

      setHaircutList((prev) => {
        const ids = new Set(prev.map((i) => i.id));

        // evita duplicados
        const newItems = response.data.data.filter((i) => !ids.has(i.id));

        const merged = [...prev, ...newItems];

        // 🔥 evita travar o app
        return merged.slice(-MAX_ITEMS);
      });

      setHasMore(response.data.hasMore);
      setPage((prev) => prev + 1);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingMore(false);
    }
  };

  // 🔥 OBSERVER OTIMIZADO (preload antes)
  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loadingMore) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            loadMore();
          }
        },
        {
          rootMargin: "200px", // 🔥 carrega antes de chegar no fim
        }
      );

      if (node) observer.current.observe(node);
    },
    [loadingMore, hasMore, page]
  );

  // 🔄 TROCAR STATUS
  const handleStatusChange = async () => {
    try {
      const api = setupAPIClient();

      const newStatus = !active;
      setActive(newStatus);

      const response = await api.get<HaircutsResponse>("/haircuts", {
        params: {
          status: newStatus,
          page: 1,
          limit: 4,
        },
      });

      setHaircutList(response.data.data);
      setHasMore(response.data.hasMore);
      setPage(2);
    } catch (err) {
      console.log(err);
    }
  };

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
            <Heading color="white">Modelos de corte</Heading>

            <Flex gap={3} align="center">
              <Link href="/haircuts/new">
                <Button
                  bgGradient="linear(to-r, #D4AF37, #f5d76e)"
                  color="black"
                  rounded="full"
                >
                  <FiPlus />
                </Button>
              </Link>

              <Switch
                size="lg"
                colorScheme="green"
                isChecked={active}
                onChange={handleStatusChange}
              />
            </Flex>
          </Flex>

          {/* LISTA */}
          <Flex direction="column" gap={3}>
            {haircutList.map((item, index) => {
              const isLast = haircutList.length === index + 1;

              return (
                <Link key={item.id} href={`/haircuts/${item.id}`}>
                  <Flex
                    ref={isLast ? lastItemRef : null}
                    p={4}
                    borderRadius="xl"
                    bg="#0f172a"
                    border="1px solid rgba(255,255,255,0.04)"
                    direction={isMobile ? "column" : "row"}
                    justify="space-between"
                    transition="0.2s"
                    _hover={{
                      transform: "scale(1.02)",
                      borderColor: "#D4AF37",
                    }}
                  >
                    <Flex align="center">
                      <IoMdPricetag size={22} color="#D4AF37" />
                      <Text ml={3}>{item.name}</Text>
                    </Flex>

                    <Text color="#22c55e">R$ {item.price}</Text>
                  </Flex>
                </Link>
              );
            })}

            {/* LOADING */}
            {loadingMore && (
              <Flex justify="center" mt={4}>
                <Spinner color="#D4AF37" />
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
  

    const response = await apiClient.get("/haircuts", {
      params: { 
        status: true,
        page:1,
        limit: 4, },
      
    });

    return {
      props: {
        haircuts: response.data.data,
        initialHasMore: response.data.hasMore,
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
}, ["barbeiro"]);