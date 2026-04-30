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
    avatar: string;
    delete_avatar_url: string;
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
    avatar: string;
    delete_avatar_url: string;
    email: string;
    password:string;
    client:string;
}

interface SignUpdateProps{
    name: string;
    endereco: string;
    avatar: string;
    delete_avatar_url:string;
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
        destroyCookie(null, '@barber.cliente', { path: '/' })
         api.defaults.headers.common['Authorization'] = undefined;
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

            const { id,name,endereco, email, subscriptions,client,avatar,delete_avatar_url } = response.data;
            setUser({
                id,
                name,
                email,
                endereco,
                subscriptions,
                client,
                avatar,
                delete_avatar_url
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

            

        const { id, avatar,delete_avatar_url, name, client, token, subscriptions, endereco } = response.data;

       
       
        setCookie(undefined, '@barber.token', token, {
            maxAge: 60 * 60 * 24 * 30,
            path: '/',
          });

        setCookie(undefined, "@barber.cliente", client, {
            maxAge: 60 * 60 * 24 * 30,
            path: "/",
          });
        
        setUser({
            id,
            avatar,
            delete_avatar_url,
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

    async function signUp({name,avatar, delete_avatar_url, email, password, client} : SignUpProps) {

      

        try {
            const response = await api.post('/users',{
                name,
                avatar,
                email,
                password,
                client,
                delete_avatar_url
            })

            

            Router.push('/login')

        } catch (error) {
            console.log("Erro ao cadastrar")
        }
        
    }

    async function logoutUser() {
      console.log("ok")
      try {

            
        destroyCookie(null, '@barber.token', { path: '/' })
        destroyCookie(null, '@barber.cliente', { path: '/' })
        setUser(null)
        api.defaults.headers.common.Authorization = undefined;
      await Router.push("/login");
      
       
        
    } catch (error) {
        console.log("ERRO AO SAIR")
    }
    }

    async function handleUpdate({name,endereco,avatar,delete_avatar_url}:SignUpdateProps){
        try {
            const response = await api.put('/update',{
                name,
                endereco,
                avatar,
                delete_avatar_url
            })

            Router.push('/report/barbeiro')

        } catch (error) {
            console.log("Erro ao cadastrar")
        }
    }

    async function handleNewHaircut({ name, price }: HandleHaircut) {
        try {
        

             await api.post("/haircut", {
                name,
                price,
              })
      
          // sucesso → volta pra dashboard

         Router.push("/haircuts")

        } catch (error: any) {
          console.log("ERRO AO CADASTRAR CORTE:", error?.response?.data || error);
      
          alert(
            error?.response?.data?.error ||
            "Erro ao cadastrar corte"
          );
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
