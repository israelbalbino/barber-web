
import { useState,useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Head from "next/head";
import Image from "next/image"
import logoImg from '../../../public/images/logo.png'
import {Flex, Text, Center, Input, Button,RadioGroup,Stack, Radio, Box} from '@chakra-ui/react'

import Link  from "next/link";

import { canSSRGuest } from "@/utils/canSSRGuest";

import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300'],
});

const poppins700 = Poppins({
    subsets: ['latin'],
  weight: ['700'],
})

export default function Register() {

  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [client,setClient] = useState('barbeiro')
  const {signUp} = useContext(AuthContext)

  console.log(client)

async function handleRegister() {

  if(client === '' && name === '' && email === '' && password === ''){
console.log("cauiaqui")
    return;
        
  }

  signUp({
    name,
    email,
    password,
    client
  })

 
  
}


  return (
    <>
    <Head>
      <title>AraBarberPRO - Crie sua conta</title>
    </Head>


      <Flex  background='barber.900' height="100vh" alignItems="center" justifyContent="center">
        

       <Flex maxW="90%" color="#FFF" direction="column" rounded={8}>
         <Center p={4}>
         <Text fontSize={40} fontWeight="bold">AraBarber</Text>
         <Text fontSize={40} fontWeight="extrabold" color="#D4AF37">PRO</Text> 
         </Center>



<RadioGroup onChange={setClient} value={client}>
  <Stack
    direction={{ base: "row", md: "column" }} // mobile = coluna | desktop = linha
    spacing={4}
    w="100%"
  >
    {[
      { id: "barbeiro", title: "Barbeiro" },
      { id: "cliente", title: "Cliente" },
    ].map((item) => (
      <Box
        key={item.id}
        flex="1" // faz ocupar espaço igual
        p={4}
        borderWidth="1px"
        borderRadius="lg"
        cursor="pointer"
        borderColor={client === item.id ? "yellow.400" : "gray.600"}
        bg={client === item.id ? "gray.700" : "gray.800"}
        _hover={{ borderColor: "yellow.400" }}
        onClick={() => setClient(item.id)}
      >
        <Radio value={item.id} colorScheme="yellow">
          <Text fontWeight="bold">{item.title}</Text>
        </Radio>
      </Box>
    ))}
  </Stack>
</RadioGroup>
        

         <Input
         mt={4}
         background="barber.400"
         variant="filled"
         size="lg"
         placeholder={client  === "barbeiro" ? "Nome da Barbearia" : "Nome do cliente"}
         type="text"
         mb={3}
         value={name}
         onChange={(e)=>setName(e.target.value)}
         fontFamily={poppins700.style.fontFamily}
         fontWeight={poppins.style.fontWeight}
         />



        <Input
         background="barber.400"
         variant="filled"
         size="lg"
         placeholder="seu@email.com"
         type="email"
         mb={3}
         value={email}
         onChange={(e)=>setEmail(e.target.value)}
         fontFamily={poppins700.style.fontFamily}
         fontWeight={poppins.style.fontWeight}
         />

        <Input
         background="barber.400"
         variant="filled"
         size="lg"
         placeholder="******"
         type="text"
         mb={6}
         value={password}
         onChange={(e)=>setPassword(e.target.value)}
         fontFamily={poppins700.style.fontFamily}
         fontWeight={poppins.style.fontWeight}
         />
        
        <Button
        onClick={handleRegister}
        background="#D4AF37"
        mb={6}
        color="gray.900"
        size="lg"
        _hover={{bg: '#D4AF37'}}
        fontFamily={poppins700.style.fontFamily}
        fontWeight={poppins700.style.fontWeight}
        >
            Cadastrar
        </Button>



        <Center mt={2}>
        <Link href="/login">

<Text color="#FFF" cursor="pointer">Já possui uma conta? <strong>Faça login</strong></Text>

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