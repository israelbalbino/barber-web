import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'

import { AuthProvider } from '../context/AuthContext'


const styles = {
  global:{
    body:{
      color: 'gray.100',
      
    },
    a:{
      color: '#FFF'
    },
    
  }
}

const fonts = {

}


const colors = {
  brand: {
    gold: '#D4AF37',
    dark: '#131313',
    surface: '#1c1b1b',
  },
  barber: {
    900: '#0f0f0f',   // preto profundo (fundo)
    700: '#1c1c1c',   // fundo secundário
    400: '#2b2b2b',   // cards / inputs
    100: '#e5e5e5'    // texto claro
  },
  button: {
    cta: '#c59d5f',     // dourado clássico
    default: '#ffffff',
    gray: '#3a3a3a',
    danger: '#b91c1c',  // vermelho mais elegante
  },
 
  gold: {
    900: '#c59d5f',     // principal
    700: '#a67c3d',     // hover
    500: '#e6c07b',      // highlight,
    bg: 'brand.gold',
    color: 'black',
    _hover: { bg: '#b8962e' },
  }
}

const theme = extendTheme({ styles, colors,fonts
 
})

function MyApp({ Component, pageProps }: AppProps) {
  return ( 
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp
