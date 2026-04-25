import Router  from "next/router";
import { destroyCookie, setCookie, parseCookies } from "nookies";
import { createContext, ReactNode, useState,useEffect } from "react";

import { api } from "@/services/apiClient";
import path from "path";

interface AuthContextData {
    user:UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>
    signUp: (credentials: SignUpProps) => Promise<void>
    logoutUser: () => Promise<void>
    handleUpdate: ( credentials: SignUpdateProps) => Promise<void>
    handleNewHaircut: (credentials: HandleHaircut) => Promise<void>
    handleUpdateHaircut: (credentials: HandleUpHaircut) => Promise<void>
    handleNewService: (credentials: HandleNewService) => Promise<void>
}

interface UserProps {
    id: string;
    name: string;
    email: string;
    client: string;
    endereco: string | null;
    subscriptions: SubscriptionsProps | null;
}

interface SubscriptionsProps{
    id:string;
    status:string;
}


type AuthProviderProps = {
    children: ReactNode;

}
interface SignInProps{
    email:string;
    password:string;
}

interface SignUpProps{
    name:string;
    email: string;
    password:string;
    client:string;
}

interface SignUpdateProps{
    name: string;
    endereco: string;
}

interface HandleHaircut{
    name: string;
    price: number;
}

interface HandleUpHaircut{

    haircut_id:string;
    name:string;
    price:number | string;
    status:boolean | string;


}

interface HandleNewService{
    customer: string;
    haircut_id: string;
}


export const AuthContext = createContext({} as AuthContextData)


export function signOut(){
    try {

        destroyCookie(null, '@barber.token', { path: '/' })
        Router.push('/login')
        
    } catch (error) {
         console.log("Error ao sair")
    }
}



export function AuthProvider({ children } : AuthProviderProps){
    
    const [user, setUser] = useState<UserProps>()
    const isAuthenticated = !!user;


  
    useEffect(()=>{

        const { '@barber.token': token } = parseCookies();

        if(token){
         api.get('/me').then((response)=>{

            const { id,name,endereco, email, subscriptions } = response.data;
            setUser({
                id,
                name,
                email,
                endereco,
                subscriptions
            })


         })
         .catch(()=>{
            signOut()
         })
        }
    },[])

    async function signIn({email, password} : SignInProps) {
        
        try {

            const response = await api.post("/session", {
                email,
                password,
            })

        const { id, name, client, token, subscriptions, endereco } = response.data;

        console.log(response.data)

        setCookie(undefined, '@barber.token', token, {
            maxAge:60 * 60 * 24 * 30, // expira em 1 mês
            path:'/'
        })

        setCookie(undefined, "@barber.cliente", client, {
            maxAge: 60 * 60 * 24 * 30,
            path: "/",
          });
        
        setUser({
            id,
            name,
            email,
            client,
            endereco,
            subscriptions
        })

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`

        if(client === "cliente"){

            Router.push('/report/cliente')

        }else{
            Router.push('/report/barbeiro')
        }

        
            
        } catch (error) {
            console.log("Erro ao ENTRAR", error)
        }
    }

    async function signUp({name, email, password, client} : SignUpProps) {

      

        try {
            const response = await api.post('/users',{
                name,
                email,
                password,
                client
            })

            Router.push('/login')

        } catch (error) {
            console.log("Erro ao cadastrar")
        }
        
    }

    async function logoutUser() {
        try {

            destroyCookie(null, '@barber.token', { path: '/' })
            Router.push('/login')
            setUser(null)
            
        } catch (error) {
            console.log("ERRO AO SAIR")
        }
    }

    async function handleUpdate({name,endereco}:SignUpdateProps){
        try {
            const response = await api.put('/update',{
                name,
                endereco
            })

            Router.push('/report/barbeiro')

        } catch (error) {
            console.log("Erro ao cadastrar")
        }
    }

    async function handleNewHaircut({name, price}:HandleHaircut) {
   

        try {


            const response = await api.post('/haircut',{
                name,
                price
            })
            
            Router.push('/haircuts')
            
        } catch (error) {

            console.log("ERRO AO CADASTRAR CORTE")
            
        }
    }

    async function handleUpdateHaircut({haircut_id, name, price,status}:HandleUpHaircut) {
        console.log(haircut_id, name, price,status)
        
        try {

            const response = await api.put('/haircut',{
                haircut_id,
                name,
                price,
                status
            })
            
            Router.push('/haircuts')
            
        } catch (error) {

            console.log("ERRO AO CADASTRAR CORTE")
            
        }
    }

    async function handleNewService({haircut_id,customer} : HandleNewService) {

       
        try {

            const response = await api.post('/service',{
                haircut_id,
                customer
            })
            
            Router.push('/dashboard/barbeiro')
            
        } catch (error) {

            console.log("ERRO AO CADASTRAR SERVIÇO")
            
        }
    }
    
    return(
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signUp, logoutUser, handleUpdate,handleNewHaircut,handleUpdateHaircut,handleNewService}}>

            {children}

        </AuthContext.Provider>
    )
}
