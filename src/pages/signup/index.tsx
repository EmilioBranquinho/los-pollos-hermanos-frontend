
import styles from '../../styles/Home.module.scss'
import { Button } from "@/components/ui/Button";
import {Input} from "../../components/ui/Input"
import { FormEvent, useContext, useState } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { toast } from 'react-toastify';


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
      <div className={styles.login}>
        <h1 className={styles.signupText}>Cadastre-se</h1>
        <form onSubmit={(e)=>{onSubmit(e)}}>
          <Input
          placeholder='Digite o seu nome:'
          type='text'
          value={name}
          onChange={(e)=>{setName(e.target.value)}}
          />

          <Input
          placeholder='Digite o seu email:'
          type='text'
          value={email}
          onChange={(e)=>{setEmail(e.target.value)}}
          />
          <Input
          placeholder='Digite uma senha:'
          type='text'
          value={password}
          onChange={(e)=>{setPassword(e.target.value)}}
          />
          <Button
          type='submit'
          loading={loading}
          >
            Cadastrar
          </Button>
        </form>
        <a href='/' className={styles.text}>ja tem conta? <span>faca login</span></a>
      </div>
    </div>
    </>
  );
}
