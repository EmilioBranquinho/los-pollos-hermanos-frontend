import { canSSRAuth } from '@/utils/canSSRAuth'
import styles from './styles.module.scss'
import { Header } from '@/components/ui/Header'
import { FiRefreshCcw } from 'react-icons/fi'
import { setupAPIClient } from '@/services/api'
import { useState } from 'react'
import Modal from 'react-modal'
import { api } from '@/services/apiClient'
import { ModalOrder } from '../../components/ui/ModalOrder'

interface Order {
    id: string;
    table: string | number;
    status: boolean;
    draft: boolean;
    name: string | null;
    createdAt: string;  
    updatedAt: string;  
}

interface OrderProps {
    orders: Order[];
}

export interface OrderItemProps {
    id: string,
    amount: number,
    orderId: string,
    productId: string,

    product: {
        id: string,
        name:string,
        description: string,
        price: Number,
        banner: string
    }

    order: {
        id: string,
        name?: string,
        table: number,
        status: boolean,
        draft: boolean
    }

    createdAt: string,
    updatedAt: string
}



export default function Dashboard({ orders }: OrderProps){  

    const[ordersList, setOrdersList] = useState(orders || []);
    const[modalItem, setModalItem] = useState<OrderItemProps[]>([]);
    const[modalVisible, setModalVisible] = useState(false);

    function handleCloseModal(){
        setModalVisible(false)
    }
    
    async function handleOpenModalView(id: string){

        const response = await api.get("/order/detail", {
            params: {
                order_id: id
            }
        })

        console.log(response.data)

        setModalItem(response.data)
        setModalVisible(true)
    }

    Modal.setAppElement('#__next')

    return(
        <>
        <div>
            <Header/>
            <main className={styles.container}>
                <div className={styles.containerHeader}>
                    <h1>Dashboard</h1>
                    <button>
                        <FiRefreshCcw size={25} color="#FFF"/>
                    </button>
                </div>
                <article className={styles.listOrders}
                >
                {orders.map((order) =>(
                    <section key={order.id} className={styles.orderItem}>
                        <button onClick={()=>{handleOpenModalView(order.id)}}>
                            <div className={styles.tag}></div>
                            <span>Mesa {order.table}</span>
                        </button>
                    </section>
                ))}
                </article>
            </main>
            {modalVisible &&(
                <ModalOrder isOpen={modalVisible} onRequestClose={handleCloseModal} order={modalItem}/>
            )}
            
        </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

    const api = setupAPIClient(ctx);

    const response = await api.get('/orders');

    return {
        props: {
            orders: response.data
        }
    }
})