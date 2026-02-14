import { Header } from "@/components/ui/Header";
import styles from "./styles.module.scss"
import { FiUpload } from "react-icons/fi";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { api } from "@/services/apiClient";
import { setupAPIClient } from "@/services/api";
import { toast } from "react-toastify";
import { ProductList } from "@/components/ProductList";
import { Button } from "@/components/ui/Button";
import { ClipLoader } from "react-spinners";

interface Category {
    id: string;
    name: string;
}


interface ProductProps {
    id: string,
    name:string,
    description: string,
    price: number,
    banner: string
}


interface ServerSideData {
    categories: Category[],
    products: ProductProps[]
}


export default function Product({ categories, products }: ServerSideData){

    const[avatarUrl, setAvatarUrl] = useState("");
    const[imageAvatar, setImageAvatar] = useState<File | null>(null);
    const[categoriesList, setCategoriesList] = useState(categories || []);
    const[selectedCategory, setSelectedCategory] = useState(categoriesList[0]?.id || '');
    const[name, setName] = useState("");
    const[price, setPrice] = useState("");
    const[description, setDescription] = useState("");
    const[productsList, setProductsList] = useState<ProductProps[]>(products || []);
    const[loading, setLoading]= useState(false);

    async function handleFile(e: ChangeEvent<HTMLInputElement> ){

        if(!e.target.files){
            return;
        }

        const image = e.target.files[0];

        if(!image){
            return;
        }

        if(image.type === 'image/jpeg' || image.type === 'image/png'){

            setImageAvatar(image)
            setAvatarUrl(URL.createObjectURL(image))
        }
    }

    function handleChangeCategory(e: ChangeEvent<HTMLSelectElement>){      
        setSelectedCategory(e.target.value)
    }

    async function handleRegisterProduct(e: FormEvent){
        e.preventDefault();

        if(!name || !price || !description ){
            toast.error("Preencha todos os campos");
            return;
        }

        setLoading(true)

        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("description", description);
        formData.append("category_id", selectedCategory);
        if(imageAvatar){
            formData.append("file", imageAvatar);
        }
        
        try{
            const response = await api.post("/product", formData);

            setProductsList([...productsList, response.data])

            setName("");
            setPrice("");
            setDescription("");
            setImageAvatar(null);
            setAvatarUrl("");
            setLoading(false)
            toast.success("Produto cadastrado com sucesso")

        } catch (error) {
            console.log(error)
            toast.error("Erro ao cadastrar o produto")         
        } finally {
            setLoading(false)
        }

    }

     async function handleDeleteProduct(product_id: string){

        try {
            const response = await api.delete(`/product/remove?product_id=${product_id}`)

            toast.success("Produto deletado com sucesso!")
            setProductsList(prev => prev.filter((product) => product.id !== product_id)
            )
        } catch (error) {
            console.log(error)
        }
     }

    return(
        <>
        <Header/>
            <div className={styles.containerHeader}>
                <div>
                    <h1>Novo Produto</h1>
                    <p className={styles.subtitle}>Adicione um novo produto ao cardápio</p>
                </div>
            </div>
        <main className={styles.container}>
            
            <form onSubmit={(e)=>{handleRegisterProduct(e)}} className={styles.form}>

                <label className={styles.labelAvatar} htmlFor="avatar">
                    <span>
                        <FiUpload size={30} color="#FFF"/>
                    </span>

                    <input 
                    type="file" 
                    accept="image/png, image/jpeg" 
                    id="avatar"
                    onChange={handleFile}
                    />

                    {avatarUrl &&(
                        <img 
                        src={avatarUrl}
                        alt="Foto do produto"
                        width={250}
                        height={250}
                         /> 
                    )}


                </label>

                <select
                className={styles.select}
                value={selectedCategory} onChange={(e)=>{handleChangeCategory(e)}}>
                    {categoriesList.map((category) =>(
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>

                <input type="text"
                 placeholder="Digite o nome do produto"
                 className={styles.input}  
                 value={name}
                 onChange={(e)=>{setName(e.target.value)}} 
                 />

                 <input 
                 type="text" 
                 placeholder="Digite o preço do produto"
                 className={styles.input}
                 value={price}
                 onChange={(e)=>{setPrice(e.target.value)}}
                 />

                 <textarea 
                 placeholder="Descreva o produto"
                 className={styles.input} 
                 value={description}
                 onChange={(e)=>{setDescription(e.target.value)}}
                 />

                 <Button
                  disabled={loading}
                  type="submit"
                  className={styles.buttonAdd}>
                    {loading ? <ClipLoader/> : "Cadastrar Produto"}
                 </Button>
            </form>

                <ProductList 
                    products={productsList}
                    onProductDeleted={(productId) => {handleDeleteProduct(productId)}}
                />

        </main>

        </>
    )
}
export const getServerSideProps = canSSRAuth(async (ctx) => {

        const api = setupAPIClient(ctx);
    
        const response = await api.get("/category")

        const productsData = await api.get("/products")
    
        const categories = response.data;
        const products = productsData.data; 
 
        return {
            props:{
                categories: categories,
                products: products
            }
        }
})