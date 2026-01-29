import { api } from "@/services/apiClient";
import { createContext, ReactNode, use, useEffect, useState } from "react";
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import Router from "next/router";
import { toast } from "react-toastify";

type AuthProviderProps = {
    children: ReactNode
}

type AuthContextData = {
    user: UserProps | undefined;
    isAuthenticated: boolean;
    signIn: (Credentials: SignInProps) => Promise<void>;
    signOut: () => void;
    signUp: (credentials: SignUpProps) => Promise<void>;
}

type UserProps = {
    id:string,
    name: string,
    email:string
} 

type SignInProps = {
    email: string,
    password: string
}

interface SignUpProps extends SignInProps {
    name: string;
}

export const AuthContext = createContext({} as AuthContextData)

    export function signOut(){
        destroyCookie(undefined, '@nextauth.token')
        Router.push('/')
    }

export function AuthProvider({children}: AuthProviderProps){

    const[user, setUser] = useState<UserProps>();
    const isAuthenticated = !!user

    useEffect(() =>{
        
        const { '@nextauth.token': token } = parseCookies();

        if(token){
            api.get('/me').then(response =>{
                const { id, name, email } = response.data;

                setUser({
                    id,
                    name,
                    email
                })

                console.log(response.data)
                console.log(user)
            })
            .catch(() =>{
                signOut();
            })
        }

        // console.log(isAuthenticated)
        // console.log(user)

    }, [])

    async function signIn({email, password}: SignInProps){

        try{
            const response= await api.post("/session", {
                email,
                password
            });

            const { id, name,  token } = response.data;

            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30,
                path: '/'
            })

            setUser({
                id,
                name,
                email
            })

            //passar o token para todas as proximas requisicoes
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            toast.success("Logado com sucesso")

            Router.push('/dashboard')
             
        } catch (error) {
            toast.error("Erro ao acessar, verifique as sus credenciais")
            console.log(error)
        }

    }

    async function signUp({ email, name, password }: SignUpProps){

        try{
            const response = await api.post('/users', {
                name,
                email,
                password
            })

            toast.success("Conta criada com sucesso!")

            Router.push('/');
        } catch (error) {
            toast.error("Erro ao cadastrar")
            console.log(error)
        }

    }

    

    return(
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
            {children}
        </AuthContext.Provider>
    )
}