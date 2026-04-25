import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  colors: {
    brand: {
      gold: '#D4AF37',
      dark: '#131313',
      surface: '#1c1b1b',
    },
  },
  fonts: {
    heading: `'Noto Serif', serif`,
    body: `'Inter', sans-serif`,
  },
  components: {
    Button: {
      variants: {
        gold: {
          bg: 'brand.gold',
          color: 'black',
          _hover: { bg: '#b8962e' },
        },
      },
    },
  },
})

export default theme
