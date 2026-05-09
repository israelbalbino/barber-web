"use client";

import { Box } from "@chakra-ui/react";
import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function AdsBanner() {
  useEffect(() => {
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <Box
      w="100%"
      mt={10}
      
      
     
      
     
      overflow="hidden"
      borderRadius="20px"
      p={2}
      mb={5}
    >
      <ins
        className="adsbygoogle"
        style={{
        
          display: "block",
          width: "100%",
          height: "100px",
        }}
        data-ad-client="ca-pub-5627724928850492"
          data-ad-format="fluid"
     data-ad-layout-key="-ef+6k-30-ac+ty"
      
        data-full-width-responsive="true"
      />
    </Box>
  );
}