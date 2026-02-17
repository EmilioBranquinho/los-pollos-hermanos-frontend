
import styles from '../styles/Home.module.scss'
import { Button } from "@/components/ui/Button";
import {Input} from "../components/ui/Input"
import { FormEvent, useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { toast } from 'react-toastify';
import { FiArrowRight, FiLock, FiMail } from 'react-icons/fi';
import Image from 'next/image';
import Logo from '../../public/logo.png'
import Logo2 from '../../public/horizontal-logo.png'
import Head from 'next/head';


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
    <Head>
      <title>Login | Los Pollos Hermanos</title>
    </Head>
    
       <div className={styles.containerCenter}>
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <Image
          src={Logo}
          quality={100}
          priority={true}
          width={250}
          height={200}
          alt='logo'
          unoptimized
          />
        </div>

        <form onSubmit={(e)=>{onSubmit(e)}} className={styles.form}>
          <div className={styles.inputWrapper}>
            <FiMail className={styles.inputIcon} size={20} />
            <Input
              placeholder='seu@email.com'
              type='email'
              value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
              className={styles.input}
            />
          </div>

          <div className={styles.inputWrapper}>
            <FiLock className={styles.inputIcon} size={20} />
            <Input
              placeholder='Sua senha'
              type='password'
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
              className={styles.input}
            />
          </div>

          <Button
            type='submit'
            loading={loading}
            className={styles.submitButton}
          >
            Entrar
          </Button>
        </form>

        <div className={styles.divider}></div>

        <p className={styles.signupPrompt}>
          Não tem conta?{' '}
          <a href='/signup' className={styles.signupLink}>
            Cadastre-se aqui
          </a>
        </p>
      </div>

      <div className={styles.backgroundDecor}></div>
    </div>
    </>
  );
}
