import { Header } from "@/components/ui/Header"
import Head from "next/head"
import styles from './styles.module.scss'
import { FormEvent, useState } from "react"
import { toast } from 'react-toastify'
import { Button } from '../../components/ui/Button'
import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupAPIClient } from "@/services/api";
import { api } from "@/services/apiClient"
import { FiPlus, FiTrash2 } from "react-icons/fi"

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

    async function handleDeleteCategory(category_id: string){

        try{
            const response = await api.delete(`/category/remove?categoryId=${category_id}`)

            setCategoriesList(
                categoriesList.filter((category) => category.id !== response.data.id)
            )
            toast.success("Categoria deletada com sucesso!")
            console.log(response.data)
        } catch (error) {
            console.log(error)
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
                <div className={styles.containerHeader}>
                    <div>
                        <h1>Categorias</h1>
                        <p className={styles.subtitle}>Gerencie as categorias do seu menu</p>
                    </div>
                </div>

                <form onSubmit={handleRegisterCategory} className={styles.form}>
                    <div className={styles.formSection}>
                        <label htmlFor="category-name" className={styles.label}>Nome da Categoria</label>
                        <div className={styles.inputGroup}>
                            <input 
                                id="category-name"
                                type="text"
                                placeholder="Ex: Bebidas, Sobremesas, Pratos Principais..."
                                className={styles.input}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Button
                                type="submit"
                                disabled={loading}
                                className={styles.buttonAdd}
                            >
                                <FiPlus size={20} />
                                {loading ? "Adicionando..." : "Adicionar"}
                            </Button>
                        </div>
                    </div>
                </form>

                <div className={styles.categoriesSection}>
                    <h2 className={styles.sectionTitle}>
                        {categoriesList.length > 0 ? `${categoriesList.length} Categoria${categoriesList.length !== 1 ? 's' : ''}` : 'Nenhuma categoria'}
                    </h2>
                    
                    {categoriesList.length > 0 ? (
                        <div className={styles.categoriesList}>
                            {categoriesList.map((category) => (
                                <div key={category.id} className={styles.categoryCard}>
                                    <div className={styles.categoryContent}>
                                        <span className={styles.categoryName}>{category.name}</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteCategory(category.id)}
                                        // disabled={deletingId === category.id}
                                        className={styles.deleteButton}
                                        title="Remover categoria"
                                    >
                                        <FiTrash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={styles.emptyState}>
                            <p>Nenhuma categoria cadastrada ainda</p>
                            <span>Crie a primeira categoria para começar</span>
                        </div>
                    )}
                </div>
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