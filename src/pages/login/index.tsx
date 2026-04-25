import { useState,useContext } from "react";
import Head from "next/head";
import Image from "next/image"
import logoImg from '../../../public/images/logo.png'
import {Flex, Text, Center, Input, Button} from '@chakra-ui/react'

import Link  from "next/link";

import { AuthContext } from "../../context/AuthContext";

import { canSSRGuest } from "../../utils/canSSRGuest";

import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300'],
});

const poppins700 = Poppins({
    subsets: ['latin'],
  weight: ['700'],
})


export default function Login() {

    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signIn } = useContext(AuthContext)


    async function handleLogin() {

      if(email === '' || password === ''){
        return;
      }

    

        await signIn({
            email,
            password,
        })
        
    }

  return (
    <>
    <Head>
      <title>AraBarberPRO - seu sistema completo</title>
    </Head>


      <Flex  color="#FFF" background='barber.900' height="100vh" alignItems="center" justifyContent="center">
        

       <Flex maxW="90%"  direction="column" rounded={8}>
         <Center p={4}>
           <Text fontSize={40} fontWeight="bold">AraBarber</Text>
           <Text fontSize={40} fontWeight="extrabold" color="#D4AF37">PRO</Text>
         </Center>

         <Input
         background="barber.400"
         variant="filled"
         size="lg"
         placeholder="seu@email.com"
         type="email"
         mb={3}
         value={email}
         onChange={(e)=>setEmail(e.target.value)}
         fontFamily={poppins.style.fontFamily}
        fontWeight={poppins.style.fontWeight}
        color="#FFF"
         />

        <Input
         background="barber.400"
         variant="filled"
         size="lg"
         placeholder="******"
         type="password"
         mb={6}
         value={password}
         onChange={(e)=>setPassword(e.target.value)}
         fontFamily={poppins.style.fontFamily}
        fontWeight={poppins.style.fontWeight}
         />
        
        <Button
        background="#D4AF37"
        mb={6}
        color="gray.900"
        size="lg"
        _hover={{bg: '#D4AF37'}}
        onClick={handleLogin}
        fontFamily={poppins700.style.fontFamily}
        fontWeight={poppins700.style.fontWeight}
        >
            Acessar
        </Button>


        <Center mt={2}>
        <Link href="/register">

<Text fontFamily={poppins.style.fontFamily}
        fontWeight={poppins.style.fontWeight} cursor="pointer">Ainda não possui conta? <strong>Cadastre-se</strong></Text>

</Link>

        </Center>
       </Flex>
       
      
      </Flex>


 
    </>
  );
}


export const getServerSideProps = canSSRGuest(async (ctx) => {
  return{
    props:{
      
    }
  }
})