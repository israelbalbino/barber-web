import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
  Flex,
} from "@chakra-ui/react";

import { FiUser, FiScissors } from "react-icons/fi";
import { FaMoneyBillAlt } from "react-icons/fa";
import { ServicesProps } from "../../pages/dashboard/barbeiro";

interface ModalInfoProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  data: ServicesProps;
  finishService: () => Promise<void>;
}

export function ModalInfo({
  isOpen,
  onClose,
  data,
  finishService,
}: ModalInfoProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(4px)" />

      <ModalContent
        bg="barber.800"
        color="white"
        rounded="2xl"
        border="1px solid #2A2A2A"
        mx={4}
      >
        {/* HEADER */}
        <ModalHeader borderBottom="1px solid #2A2A2A">
          <Text fontSize="lg" fontWeight="bold">
            Detalhes do Serviço
          </Text>
        </ModalHeader>

        <ModalCloseButton />

        {/* BODY */}
        <ModalBody py={6}>

          {/* CLIENTE */}
          <Flex
            align="center"
            p={3}
            mb={3}
            rounded="xl"
            bg="barber.900"
            border="1px solid #2A2A2A"
          >
            <FiUser size={20} color="#D4AF37" />

            <Flex ml={3} direction="column">
              <Text fontSize="xs" color="gray.400">
                Cliente
              </Text>
              <Text fontWeight="semibold">
                {data?.customer}
              </Text>
            </Flex>
          </Flex>

          {/* SERVIÇO */}
          <Flex
            align="center"
            p={3}
            mb={3}
            rounded="xl"
            bg="barber.900"
            border="1px solid #2A2A2A"
          >
            <FiScissors size={20} color="#D4AF37" />

            <Flex ml={3} direction="column">
              <Text fontSize="xs" color="gray.400">
                Serviço
              </Text>
              <Text fontWeight="semibold">
                {data?.haircut?.name}
              </Text>
            </Flex>
          </Flex>

          {/* VALOR */}
          <Flex
            align="center"
            p={3}
            mb={6}
            rounded="xl"
            bg="barber.900"
            border="1px solid #2A2A2A"
          >
            <FaMoneyBillAlt size={18} color="#22c55e" />

            <Flex ml={3} direction="column">
              <Text fontSize="xs" color="gray.400">
                Valor
              </Text>
              <Text fontWeight="bold" color="#22c55e">
                R$ {data?.haircut?.price}
              </Text>
            </Flex>
          </Flex>

          {/* BOTÃO */}
          <Button
            w="100%"
            size="lg"
            bg="#D4AF37"
            color="black"
            rounded="full"
            _hover={{
              bg: "#c59b2f",
              transform: "scale(1.03)",
            }}
            onClick={finishService}
          >
            Finalizar Serviço
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}