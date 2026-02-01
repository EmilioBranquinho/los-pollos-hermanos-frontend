import { Header } from "@/components/ui/Header"
import Head from "next/head"
import styles from './styles.module.scss'
import { FormEvent, useState } from "react"
import { toast } from 'react-toastify'
import { Button } from '../../components/ui/Button'
import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupAPIClient } from "@/services/api";
import { api } from "@/services/apiClient"

interface Category {
    id: string;
    name: string;
}

interface CategoryProps {
    categories: Category[];
}


export default function Category({ categories }: CategoryProps){

    console.log(categories)

    const[name, setName] = useState("");
    const[loading, setLoading] = useState(false);
    const[categoriesList, setCategoriesList] = useState(categories || []);
    

    async function handleRegisterCategory(e: FormEvent){
        e.preventDefault();

        if(!name){
            toast.error("O campo não pode ficar vazio")
            return;
        }

        setLoading(true)

        try{
            const response = await api.post("/category", {
            name
        });

        setCategoriesList([...categoriesList, response.data]);

        setLoading(false)

        toast.success("Categoria cadastrada com sucesso");

        setName("");

        } catch (error) {
            console.log(error)
            toast.error("Erro ao cadastrar a categoria")
            setLoading(false)
        }

    }

    return(
        <>
        <Head>
            <title>Categorias - Los Pollos Hermanos</title>
        </Head>
        <div>
            <Header/>
            <main className={styles.container}>
                <h1>Categorias</h1>
                <form onSubmit={(e)=>{handleRegisterCategory(e)}} 
                className={styles.form}
                >
                    <input 
                    type="text"
                    placeholder="Digite o nome da categoria:"
                    className={styles.input}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                     />

                    <Button
                    className={styles.buttonAdd}
                    type="submit"
                    loading={loading}
                    >Adicionar Categoria
                    </Button>
                </form>

                {categoriesList.map((category)=>(
                    <span key={category.id}>{category.name}</span>
                ))}
            </main>
        </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

    const api = setupAPIClient(ctx);

    const response = await api.get("/category")

    const categories = response.data;

    console.log(categories)

    return {
        props:{
            categories: categories
        }
     }
})