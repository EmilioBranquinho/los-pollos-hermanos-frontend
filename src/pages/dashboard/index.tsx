'use client';

import { canSSRAuth } from '@/utils/canSSRAuth'
import styles from './styles.module.scss'
import { Header } from '@/components/ui/Header'
import { FiRefreshCcw } from 'react-icons/fi'
import { setupAPIClient } from '@/services/api'
import { useContext, useEffect, useState } from 'react'
import Modal from 'react-modal'
import { api } from '@/services/apiClient'
import { ModalOrder } from '../../components/ui/ModalOrder'
import { toast } from 'react-toastify'
import { AuthContext } from '@/contexts/AuthContext';
import LoadingSpinner from '@/components/ui/Loading/loading';

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
    const[isLoading, setIsLoading] = useState(false);
    const[loadingModal, setLoadingModal] = useState(false);
    const[loadingFinish, setLoadingFinish] = useState(false);
    
    const { user } = useContext(AuthContext)

    function handleCloseModal(){
        setModalVisible(false)
    }

    async function handleOpenModalView(id: string){
        setLoadingModal(true)

        try {
            const response = await api.get("/order/detail", {
                params: {
                    order_id: id
                }
            })

            console.log(response.data)

            setModalItem(response.data)
            setLoadingModal(false)
            setModalVisible(true)
        } catch (error) {
            toast.error("Erro ao carregar detalhes do pedido")
            console.log(error)
            setLoadingModal(false)
        }
    }

    async function handleFinishOrder(id: string){

        setLoadingFinish(true)
        try{
            const FinishResponse = await api.put("/order/finish", {
                order_id: id
            })

            const response = await api.get("/orders");

            setOrdersList(response.data)
            toast.success("Pedido finalizado com sucesso!")
            setLoadingFinish(false)
            setModalVisible(false)

        } catch (error) {
            toast.error("Erro ao finalizar o pedido")
            console.log(error)
        } finally {
            setLoadingFinish(false)
        }
    }

    async function handleRefreshOrders(){
        setIsLoading(true)
        try {
            const response = await api.get("/orders");
            setOrdersList(response.data)
            toast.success("Pedidos atualizados!")
        } catch (error) {
            toast.error("Erro ao atualizar pedidos")
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    Modal.setAppElement('#__next')

    return(
        <>
        <div>
            <Header name="dashboard"/>
            <main className={styles.container}>
                <div className={styles.containerHeader}>
                    <h1>Últimos pedidos</h1>
                    <button onClick={handleRefreshOrders} disabled={isLoading} title="Atualizar pedidos">
                        <FiRefreshCcw size={25} color="#00d9ff" className={isLoading ? styles.spin : ''}/>
                    </button>
                </div>
                <article className={styles.listOrders}>
                {ordersList && ordersList.length > 0 ? (
                    ordersList.map((order) =>(
                        <section key={order.id} className={styles.orderItem}>
                            <button 
                                onClick={()=>{handleOpenModalView(order.id)}}
                                title={`Abrir pedido mesa ${order.table}`}
                            >
                                <div className={styles.tag}>🍽️</div>
                                <span>Mesa {order.table}</span>
                            </button>
                        </section>
                    ))
                ) : (
                    <div style={{ 
                        gridColumn: '1 / -1', 
                        textAlign: 'center', 
                        padding: '60px 20px',
                        color: '#a0aec0'
                    }}>
                        <p style={{ fontSize: '1.1rem' }}>Nenhum pedido no momento</p>
                    </div>
                )}
                </article>
            </main>
            {modalVisible &&(
                <ModalOrder 
                loadingFinish={loadingFinish}
                isOpen={modalVisible} 
                onRequestClose={handleCloseModal} 
                order={modalItem}
                handleFinishOrder={handleFinishOrder}
                />
            )}

            {loadingModal && <LoadingSpinner/>}
            
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
