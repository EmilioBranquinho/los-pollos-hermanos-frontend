
import styles from '../styles/Home.module.scss'
import { Button } from "@/components/ui/Button";
import {Input} from "../components/ui/Input"
import { FormEvent, useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { toast } from 'react-toastify';


export default function Home() {

  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[loading, setLoading] = useState(false);

  const { signIn, signOut } = useContext(AuthContext);

  useEffect(() =>{
    signOut();
  }, [])

  const formData = {
    email: email,
    password: password
  }

  const onSubmit = async(e: FormEvent) =>{
    e.preventDefault();

    if(!email || !password){
      toast.error("Preencha todos os campos")
      return;
    }

    setLoading(true)

    await signIn(formData) 

    setLoading(false)
  }

  return (
    <>
    <div className={styles.containerCenter}>
      <div className={styles.login}>
        <form onSubmit={(e)=>{onSubmit(e)}}>
          <Input
          placeholder='Digite o seu email:'
          type='text'
          value={email}
          onChange={(e)=>{setEmail(e.target.value)}}
          />

          <Input
          placeholder='Digite a sua senha:'
          type='text'
          value={password}
          onChange={(e)=>{setPassword(e.target.value)}}
          />

          <Button
          type='submit'
          loading={loading}
          >
            Login
          </Button>
        </form>
        <a href='/signup' className={styles.text}>Nao tem conta? cadastre-se</a>
      </div>
    </div>
    </>
  );
}
