import { Html, Head, Main, NextScript } from "next/document";
import { ColorModeScript } from "@chakra-ui/react";
import theme from "@/theme";

export default function Document() {
  return (
    <Html suppressHydrationWarning lang="en">
      <Head>

<meta
  name="theme-color"
  content="#0f172a"
/>

<link
  rel="manifest"
  href="/manifest.json"
/>

<link
  rel="apple-touch-icon"
  href="/icon-192.png"
/>

</Head>
      <body className="antialiased">
        <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
        <Main />
        <NextScript />
        
      </body>
    </Html>
  );
}
