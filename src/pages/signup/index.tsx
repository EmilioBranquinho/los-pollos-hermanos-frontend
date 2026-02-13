
import styles from '../../styles/Home.module.scss'
import { Button } from "@/components/ui/Button";
import {Input} from "../../components/ui/Input"
import { FormEvent, useContext, useState } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { toast } from 'react-toastify';
import { FiArrowRight, FiLock, FiMail, FiUser } from 'react-icons/fi';


export default function SignUp() {

    const[name, setName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[loading, setLoading] = useState(false);

    const { signUp } = useContext(AuthContext)

    const formData = {
        email: email,
        name: name,
        password: password
    }

    const onSubmit = async(e: FormEvent) =>{
        e.preventDefault();

        if(!email || !name || !password){
            toast.error("Preencha todos os campos")
            return;
        }

        setLoading(true)

        await signUp(formData)

        setLoading(false)

    }

  return (
    <>
     <div className={styles.containerCenter}>
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <h1>Criar Conta</h1>
          <p>Junte-se a nós e comece agora</p>
        </div>

        <form onSubmit={(e)=>{onSubmit(e)}} className={styles.form}>
          <div className={styles.inputWrapper}>
            <FiUser className={styles.inputIcon} size={20} />
            <Input
              placeholder='Seu nome completo'
              type='text'
              value={name}
              onChange={(e)=>{setName(e.target.value)}}
              className={styles.input}
            />
          </div>

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
              placeholder='Crie uma senha'
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
            style={{ display: 'flex' , alignItems: "center", justifyContent: "center" }}
          >
            Cadastrar
          </Button>
        </form>

        <div className={styles.divider}></div>

        <p className={styles.signupPrompt}>
          Já tem conta?{' '}
          <a href='/' className={styles.signupLink}>
            Faça login aqui
          </a>
        </p>
      </div>

      <div className={styles.backgroundDecor}></div>
    </div>
    </>
  );
}
