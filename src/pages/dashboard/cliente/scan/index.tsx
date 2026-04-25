
"use client";

import { Flex, Text, Button } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import QrScanner from "qr-scanner";

export default function ScanPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!videoRef.current) return;

    const scanner = new QrScanner(
      videoRef.current,
      (result) => {
        try {
          const url = new URL(result.data);
          const barberId = url.searchParams.get("barberId");

          if (!barberId) {
            alert("QR inválido");
            return;
          }

          navigator.vibrate?.(200);

          scanner.stop();
          router.push(`/checkin?barberId=${barberId}`);
        } catch {
          alert("QR inválido");
        }
      },
      {
        preferredCamera: "environment",
      }
    );

    scanner.start();

    return () => {
      scanner.stop();
    };
  }, []);

  return (
    <Flex
  w="100%"
  h="100vh"
  position="relative"
  overflow="hidden"
>
  {/* VIDEO BACKGROUND */}
  <video
    ref={videoRef}
    autoPlay
    muted
    playsInline
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      zIndex: 0,
    }}
  />

  {/* OVERLAY (opcional escurecer) */}
  <Flex
    position="absolute"
    top={0}
    left={0}
    w="100%"
    h="100%"
    bg="rgba(0,0,0,0.4)"
    zIndex={1}
  />

  {/* CONTEÚDO POR CIMA */}
  <Flex
     w="100%"
     h="100%"
     direction="column"
     justify="flex-end"
     align="center"
     zIndex={2}
     px={4}
     pb={40}
     mb={20}
  >
    <Text color="white" mb={4} fontSize="lg" fontWeight="bold">
      Escaneie o QR Code
    </Text>

    <Button
      w="90%"
      maxW="300px"
      bg="brand.gold"
      onClick={() => router.back()}
    >
      Voltar
    </Button>
  </Flex>
</Flex>
  );
}