import { useContext, useRef } from "react";
import {
  Flex,
  Heading,
  Button,
  Box,
  Text,
  useMediaQuery
} from "@chakra-ui/react";

import { AuthContext } from "../../../context/AuthContext";
import { QRCodeCanvas } from "qrcode.react";
import html2canvas from "html2canvas";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { Sidebar } from "@/components/sidebar";

export default function QrCodePage() {
  const { user } = useContext(AuthContext);
  const qrRef = useRef<HTMLDivElement>(null);
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const url = `${process.env.NEXT_PUBLIC_DOMINIO_URL}checkin?barberId=${user?.id}`;

  async function handleDownload() {
    if (!qrRef.current) return;

    const canvas = await html2canvas(qrRef.current, {
      backgroundColor: "#0D0D0D",
      scale: 3, // 🔥 alta qualidade
    });

    const link = document.createElement("a");
    link.download = "AraBarberPRO-premium.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
   <Sidebar>
     <Flex
      align={isMobile ? "center" : "flex-start"}
      justify="center"
      direction="column"
      bg="#0D0D0D"
      gap={6}
   
      p={4}
    >

      {/* 🔥 CARD QUE SERÁ EXPORTADO */}
      <Box
        ref={qrRef}
        bg="#111"
        p={8}
        borderRadius="2xl"
        border="1px solid #D4AF37"
        boxShadow="0 0 40px rgba(212,175,55,0.3)"
        textAlign="center"
      >
        {/* QR CODE */}
        <Box position="relative" display="inline-block">
          <QRCodeCanvas
            value={url}
            size={260}
            level="H"
            includeMargin
            fgColor="#D4AF37"
            bgColor="#000000"
          />

          {/* 🔥 LOGO CENTRAL */}
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            bg="#000"
            borderRadius="full"
            border="2px solid #D4AF37"
            px={2}
            py={1}
          >
            <Text
              fontSize="10px"
              fontWeight="bold"
              color="#D4AF37"
            >
              {user?.name}
            </Text>
          </Box>
        </Box>

        {/* TEXTO */}
        <Text mt={5} fontWeight="bold" color="#D4AF37">
          Escaneie para fazer check-in
        </Text>

        <Text fontSize="xs" color="gray.400">
          Sistema exclusivo AraBarberPRO
        </Text>
        <Text>arabarberpro.com</Text>
      </Box>

      <Button
        onClick={handleDownload}
        bg="#D4AF37"
        color="black"
        
        _hover={{ bg: "#b8962e" }}
        size="lg"
        w={isMobile ? "90%" : "27%"}
      >
        Baixar QR Code
      </Button>
    </Flex>
   </Sidebar>
  );
}

export const getServerSideProps = canSSRAuth(
    async (ctx) => {
      return {
        props: {}
      };
    },
    ["barbeiro"]
  );