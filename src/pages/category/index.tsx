import { Header } from "@/components/ui/Header"
import Head from "next/head"
import styles from './styles.module.scss'
import { useState } from "react"

export default function Category(){

    const[name, setName] = useState("")

    return(
        <>
        <Head>
            <title>Categorias - Los Pollos Hermanos</title>
        </Head>
        <div>
            <Header/>

            <main className={styles.container}>

                <h1>Categorias</h1>

                <form className={styles.form}>
                    <input 
                    type="text"
                    placeholder="Digite o nome da categoria:"
                    className={styles.input}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                     />

                    <button
                    className={styles.buttonAdd}
                    type="submit"
                    >Adicionar Categoria
                    </button>
                </form>
            </main>
        </div>
        </>
    )
}