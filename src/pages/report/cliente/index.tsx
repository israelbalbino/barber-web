import {
  Flex,
  Heading,
  Text,
  useMediaQuery,
  Box,
  Link,
  useDisclosure,
  Spinner,
  Image,
  Button,
  Avatar,
  IconButton
} from "@chakra-ui/react";
import Head from "next/head";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { Sidebarcli } from "@/components/sidebarland";
import { setupAPIClient } from "@/services/api";
import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { api } from "@/services/apiClient";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiArrowRight, FiRefreshCw, FiScissors, FiX } from "react-icons/fi";
import { io } from "socket.io-client";
import { useRouter } from "next/router";

interface ServiceProps {
  totalServicos: ServicesProps[];
  shedule: ShedulesProps[];
}

export interface ServicesProps {
  id: string;
  name: string;
  avatar:string;
  client: string; // "barbeiro" | "cliente"
  subscriptions: {
    id: string;
    status: boolean;
  } | null;
}



export interface ShedulesProps {
  id: string;
  avatar: string;
  created_at: Date;
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


export default function Cliente({ totalServicos,shedule }: ServiceProps) {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const { user } = useContext(AuthContext);

  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [totalEmAndamento, setTotalEmAndamento] = useState(0);
  const [isPremiumView, setIsPremiumView] = useState(false);
  const [nameBarber,setNameBarber] = useState("")
  const [avatar,setAvatar] = useState("")
  const router = useRouter();
  

  const [services, setServices] = useState<ShedulesProps[]>([]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const scrollRef = useRef<HTMLDivElement>(null);

  const MotionFlex = motion(Flex);
  const MotionBox = motion(Box);


  // 🔥 FILTRO: só barbeiros
  const barbearias = totalServicos.filter(
    (item) => item.client === "barbeiro"
  );



  const socketRef = useRef<any>(null);

  useEffect(() => {
    socketRef.current = io(`${process.env.NEXT_PUBLIC_API_URL}`);
  
    socketRef.current.on("novo_servico", () => {
      atualizaDados();
    });
  
    socketRef.current.on("servicos_atualizados", () => {
      atualizaDados();
    });
  
    return () => {
      socketRef.current.disconnect();
    };
  }, []);
 

  const getHora = (date: any) => {
    if (!date) return "--:--";
  
    const formatado =
      typeof date === "string" ? date.replace(" ", "T") : date;
  
    const d = new Date(formatado);
  
    if (isNaN(d.getTime())) return "--:--";
  
    return d.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };


  

  async function handleSelectBarbearia(service: ServicesProps) {


    try {
      setSelected(service.id);
     onOpen();
     //await atualizaDados();
      
    // 🔥 entra na sala certa
  socketRef.current.emit("join_barbearia", service.id);

      const clientePremium = !!user?.subscriptions?.status;
      const barbeariaPremium = !!service.subscriptions?.status;
      setNameBarber(service.name)
      setAvatar(service.avatar)

      const podeVer = clientePremium || barbeariaPremium;

      setIsPremiumView(podeVer);

      if (!podeVer) return;

      setLoading(true);

      console.log(service.id)

      const response = await api.get(
        `${process.env.NEXT_PUBLIC_API_URL}/list/user`,
        {
        params:{
          barbeid:service.id
        }
        }
      );

      const clientes = await api.get(
        `${process.env.NEXT_PUBLIC_API_URL}/list/service`,
        {
        params:{
          barbeid:service.id,
          status:true
        }
        }
      );

      setServices(clientes.data)

     

      setTotalEmAndamento(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }


  async function atualizaDados(){
   try{
    const response = await api.get(
      `${process.env.NEXT_PUBLIC_API_URL}/list/user`,
      {
      params:{
        barbeid:selected
      }
      }
    );

    setTotalEmAndamento(response.data);

    const clientes = await api.get(
      `${process.env.NEXT_PUBLIC_API_URL}/list/service`,
      {
      params:{
        barbeid:selected,
        status:true
      }
      }
    );

    setServices(clientes.data)

   }catch(err){
    console.log(err)
   } finally{
    setLoading(false)
   }

    
  }

  return (
    <>
      <Head>
        <title>AraBarberPRO - Cliente</title>
      </Head>

      <Sidebarcli>
        <Flex direction="column" p={4}>

          {/* HEADER */}
          <Flex mb={10} direction="column">
            <Text color="gray.400">Bem-vindo de volta,</Text>
            <Heading bgGradient="linear(to-r, white, gray.400)" bgClip="text">
              {user?.name}
            </Heading>
          </Flex>

          {/* TITULO */}
          <Box mb={6}>
            <Heading color="white" size="md">
              Movimento das barbearias
            </Heading>

            <Text mt={2} color="gray.400">
              {user?.subscriptions?.status
                ? "Você é premium 👑 — veja todas as filas"
                : "Clique para ver a fila (premium desbloqueia tudo)"}
            </Text>
          </Box>

          {/* CARROSSEL */}
          <Box
            ref={scrollRef}
            display="flex"
            overflowX="auto"
            gap={2}
            pb={2}
            sx={{
              scrollSnapType: "x mandatory",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {barbearias.map((service) => {
              const barbeariaPremium = !!service.subscriptions?.status;

              return (
                <Box
                  key={service.id}
                  minW="345px"
                  justifyContent="center"
                  display="flex"
                  borderRadius="2xl"
                  
                  cursor="pointer"
                  scrollSnapAlign="start"
                  onClick={() => handleSelectBarbearia(service)}
                  transition="0.3s"
                  transform={selected === service.id ? "scale(0.95)" : "scale(1)"}
                  bg="rgba(0, 0, 0, 0.66)"
                
                  _hover={{
                    transform: "translateY(-6px)",
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.79)",
                  }}
                >

<MotionFlex
  w="100%"
  p={6}
  borderRadius="2xl"
  position="relative"
  overflow="hidden"
  align="center"
  justify="space-between"
  cursor="pointer"

  // 🔥 GLASS + PROFUNDIDADE
  bg="rgb(10, 10, 10)"
  backdropFilter="blur(20px)"
  border="1px solid rgba(255,255,255,0.08)"
  boxShadow="
    0 20px 60px rgba(0,0,0,0.6),
    inset 0 1px 0 rgba(255,255,255,0.06)
  "

  whileHover={{ scale: 1.02, y: -4 }}
  whileTap={{ scale: 0.97 }}
  transition={{ type: "spring", stiffness: 200 }}
>
  {/* IMAGEM */}
  <Box
    position="absolute"
    right={0}
    top={0}
    bottom={0}
    w="50%"
    backgroundImage={`url(${service.avatar})`}
    backgroundSize="cover"
    backgroundPosition="center"
    filter="brightness(0.7) contrast(1.1)"
  />

  {/* FADE SUAVE */}
  <Box
    position="absolute"
    right={0}
    top={0}
    bottom={0}
    w="60%"
    bgGradient="linear(to-l, rgba(0,0,0,0.95), transparent)"
  />

  {/* LIGHT EDGE (efeito Apple) */}
  <Box
    position="absolute"
    inset={0}
    borderRadius="2xl"
    pointerEvents="none"
    bgGradient="linear(120deg, rgba(3, 3, 3, 0.08), transparent 40%)"
  />

  {/* SHINE SUAVE */}
  <MotionBox
    position="absolute"
    top={0}
    left="-60%"
    w="50%"
    h="100%"
    bgGradient="linear(to-r, transparent, rgba(255, 255, 255, 0.13), transparent)"
    transform="skewX(-20deg)"
    animate={{ left: ["-60%", "140%"] }}
    transition={{ duration: 3, repeat: Infinity }}
  />

  {/* CONTEÚDO */}
  <Flex align="center" gap={4} zIndex={1}>
    
    {/* ÍCONE */}
    <Flex
      w="68px"
      h="68px"
      borderRadius="2xl"
      align="center"
      justify="center"
      boxShadow="
        0 0 20px rgba(42, 42, 42, 0.72),
        inset 0 0 10px rgba(31, 31, 31, 0.29)
      "
    >
      <FiScissors color="#D4AF37" size={30}/>
      
    </Flex>

    {/* TEXTO */}
    <Flex direction="column">
      <Heading
        size="lg"
        color="#D4AF37"
       
        letterSpacing="-0.5px"
      >
        {service.name}
      </Heading>

      <Text
        fontSize="sm"
        fontWeight="bold"
        color={barbeariaPremium ? "green.400" : "gray.400"}
      >
        {barbeariaPremium
          ? "Barbearia Premium"
          : "Barbearia Comum"}
      </Text>

      {/* BOTÃO */}
      <MotionFlex
        mt={4}
        px={5}
        py={2}
        borderRadius="full"
        border="1px solid rgba(212,175,55,0.6)"
        color="#D4AF37"
        fontSize="sm"
        align="center"
        gap={2}
        w="fit-content"
        bg="rgba(212,175,55,0.06)"
        backdropFilter="blur(10px)"
        whileHover={{ scale: 1.05 }}
      >
        Ver fila

        <motion.div
          animate={{ x: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
        >
          <FiArrowRight />
        </motion.div>
      </MotionFlex>
    </Flex>
  </Flex>
</MotionFlex>
                </Box>
              );
            })}
          </Box>
        </Flex>


<Modal isOpen={isOpen} onClose={onClose} isCentered>
  <ModalOverlay  bg="rgba(0,0,0,0.6)" backdropFilter="blur(10px)" />

  {
    isPremiumView ? 
<ModalContent
    
    maxW="90%"
    position="fixed"
    borderTopRadius="2xl"
    bg="rgba(10,10,10,0.9)"
    backdropFilter="blur(20px)"
    border="1px solid rgba(255,255,255,0.08)"
    color="white"
  >
    <ModalBody p={4}>
      
      {/* HANDLE */}
      <Flex justify="center" mb={3}>
        <Box w="40px" h="4px" bg="gray.500" borderRadius="full" />
      </Flex>

      {/* HEADER */}
      <Flex justify="space-between" align="center" mb={4}>
        <Box>
          <Heading size="md">Fila de atendimento</Heading>
          <Text fontSize="sm" color="gray.400">
            {nameBarber}
          </Text>
        </Box>

        <IconButton
          aria-label="fechar"
          icon={<FiX />}
          variant="ghost"
          rounded="full"
          onClick={onClose}
        />
      </Flex>

      {/* CARD INFO */}
      <Flex
        p={4}
        borderRadius="xl"
        bg="#0f172a"
        border="1px solid rgba(255,255,255,0.05)"
        mb={4}
        align="center"
        gap={4}
      >
        <Box
          borderRadius="full"
          bg="rgba(212,175,55,0.1)"
          color="#D4AF37"
          
        >
          <Image w="60px" h="60px" borderRadius="full" src={avatar} />
        </Box>

        <Box>
          <Text color="gray.400">Pessoas na fila</Text>
          <Heading size="lg">{totalEmAndamento}</Heading>

          <Text color="#D4AF37" fontSize="sm">
            ~ 40 min
          </Text>
        </Box>
      </Flex>

      {/* LISTA */}
      {services.map((i, index) => {

        console.log(i.created_at)

  return (
    <Flex
      key={i.id}
      p={3}
      mb={3}
      borderRadius="xl"
      bg="#020617"
      border="1px solid rgba(255,255,255,0.05)"
      align="center"
      justify="space-between"
    >
      <Flex align="center" gap={3}>
        {i.avatar ? (
          <Image src={i.avatar} w={50} bg="#D4AF37" />
        ) : (
          <Avatar size="sm" bg="#D4AF37" />
        )}

        <Box>
          <Text>{i.customer?.slice(0, 3) || "***"}******</Text>

          <Text fontSize="xs" color="gray.400">
            Chegou {getHora(i.created_at)}
          </Text>
        </Box>
      </Flex>

      {index === 0 ? (
       <Text fontSize="sm" color="green.400">
       Cortando
     </Text>
      ) : (
        <Text fontSize="sm" color="gray.400">
          Próximo
        </Text>
      )}
    </Flex>
  );
})}

      {/* INFO */}
      <Box
        p={3}
        borderRadius="xl"
        bg="#020617"
        border="1px solid rgba(255,255,255,0.05)"
        mb={4}
      >
        <Text fontSize="sm" color="gray.400">
          A ordem pode mudar conforme o tipo de serviço e tempo de atendimento.
        </Text>
      </Box>

    </ModalBody>
  </ModalContent> : 
  
<ModalContent
  maxW="90%"
  position="fixed"
  borderTopRadius="2xl"
  bg="rgba(10,10,10,0.95)"
  backdropFilter="blur(25px)"
  border="1px solid rgba(255,255,255,0.08)"
  color="white"
>
  <ModalBody p={4} position="relative">
    
    {/* HANDLE */}
    <Flex justify="center" mb={3}>
      <Box w="40px" h="4px" bg="gray.500" borderRadius="full" />
    </Flex>

    {/* HEADER */}
    <Flex justify="space-between" align="center" mb={4}>
      <Box>
        <Heading size="md">Fila de atendimento</Heading>
        <Text fontSize="sm" color="gray.400">
          {nameBarber}
        </Text>
      </Box>

      <IconButton
        aria-label="fechar"
        icon={<FiX />}
        variant="ghost"
        rounded="full"
        onClick={onClose}
      />
    </Flex>

    {/* 🔒 CONTEÚDO BLOQUEADO (blur) */}
    <Box position="relative" mb={4}>
      
      {/* FAKE CONTENT (simula a fila por trás) */}
      <Flex
        direction="column"
        gap={3}
        filter="blur(6px)"
        opacity={0.4}
        pointerEvents="none"
      >
        {[1, 2, 3].map((i) => (
          <Flex
            key={i}
            p={3}
            borderRadius="xl"
            bg="#020617"
            border="1px solid rgba(255,255,255,0.05)"
            justify="space-between"
          >
            <Text>Cliente {i}</Text>
            <Text>R$ 20</Text>
          </Flex>
        ))}
      </Flex>

      {/* OVERLAY LOCK */}
      <Flex
        position="absolute"
        inset={0}
        align="center"
        justify="center"
        direction="column"
        textAlign="center"
        px={6}
      >
        <Box
          fontSize="3xl"
          mb={2}
          color="#D4AF37"
        >
          🔒
        </Box>

        <Heading size="sm" mb={2}>
          Conteúdo Premium
        </Heading>

        <Text fontSize="sm" color="gray.400" mb={4}>
          Veja a fila completa, tempo de espera e prioridade.
        </Text>

        <Button
          bg="#D4AF37"
          color="black"
          rounded="full"
          px={6}
          _hover={{ bg: "#c59b2f" }}
          onClick={() => router.push("/planos/cliente")}
        >
          Desbloquear acesso
        </Button>
      </Flex>
    </Box>

    {/* BENEFÍCIOS */}
    <Flex
      p={3}
      borderRadius="xl"
      bg="rgba(212,175,55,0.05)"
      border="1px solid rgba(212,175,55,0.2)"
      direction="column"
      gap={2}
    >
      <Text fontSize="sm" color="gray.300">
        ✔ Ver fila em tempo real
      </Text>
      <Text fontSize="sm" color="gray.300">
        ✔ Saber tempo de espera
      </Text>
      <Text fontSize="sm" color="gray.300">
        ✔ Prioridade no atendimento
      </Text>
    </Flex>

  </ModalBody>
</ModalContent>
  }

  
</Modal>
      </Sidebarcli>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  try {
    const apiClient = setupAPIClient(ctx);

    const serv = await apiClient.get("/list/users");

    return {
      props: {
        totalServicos: serv.data,
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
}, ["cliente"]);