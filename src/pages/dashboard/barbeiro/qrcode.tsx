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
      gap={6}
      borderRadius="2xl"
      p={4}
    >

      {/* 🔥 CARD QUE SERÁ EXPORTADO */}
      <Box
      
        ref={qrRef}
        p={8}
        textAlign="center"
      >
        {/* QR CODE */}
        <Box position="relative" display="inline-block">
          <QRCodeCanvas
            value={url}
            size={260}
            level="H"
            fgColor="#D4AF37"
            bgColor="#000000"
          />

       
        </Box>

        {/* TEXTO */}
        <Text mt={5} fontWeight="bold" color="#D4AF37">
          Escaneie para fazer check-in
        </Text>

        <Text mt={5} fontWeight="bold" color="#D4AF37">
          {user?.name}
        </Text>

        <Text fontSize="xs" color="gray.400">
          Sistema exclusivo AraBarberPRO
        </Text>
        <Text>app.arabarber.pro</Text>
      </Box>

    

      <Button
   onClick={handleDownload}
   w="80%"
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
 Baixar QRCode
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