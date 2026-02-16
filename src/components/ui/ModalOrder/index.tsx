'use client'

import styles from './styles.module.scss'
import Modal from 'react-modal'
import { FiX } from 'react-icons/fi'
import { OrderItemProps } from '@/pages/dashboard'
import { ButtonFinishOrder } from '../ButtonFinishOrder'

interface ModalOrderProps {
    isOpen: boolean;
    onRequestClose: () => void;
    handleFinishOrder: (id: string)=> void;
    order: OrderItemProps[];
    loadingFinish: boolean
}

export function ModalOrder({isOpen, onRequestClose, order, handleFinishOrder, loadingFinish}: ModalOrderProps){

   const customStyles = {
  content: {
    top: '55%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    maxWidth: '500px',
    width: '90%',
    maxHeight: '85vh',
    padding: '32px',
    margin: '0 auto',
    transform: 'translate(-50%, -50%)',
    background: 'linear-gradient(135deg, #1c0f0a, #2a1510)', 
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '16px',
    overflowY: 'auto' as const,
    boxShadow: '0 25px 50px rgba(245, 100, 39, 0.2)', // glow laranja suave
    backdropFilter: 'blur(16px)',
    color: '#ffffff',
  },
  overlay: {
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    backgroundColor: 'rgba(28, 15, 10, 0.7)', // escuro translúcido
    backdropFilter: 'blur(12px)',
  }
} as const;


    return(
        <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        className={styles.modal}
        style={customStyles}
        >
            <button
            type='button'
            onClick={onRequestClose}
            className='react-modal-close'
            style={{ 
                background: "transparent", 
                border: 0,
                cursor: 'pointer',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#f56427',
                transition: 'all 0.3s ease',
                position: 'absolute',
                top: '16px',
                right: '16px',
            }}
            title="Fechar"
            >
                <FiX size={28} />
            </button>

            <div className={styles.container}>

                <h2>Detalhes do Pedido</h2>
                <span className={styles.table}>
                    🍽️ Mesa {order[0]?.order?.table || 'N/A'}
                </span>

                {order && order.length > 0 ? (
                    order.map((item, index) =>(
                        <section key={item.id}
                        className={`${styles.containerItem} ${isOpen ? styles.animateItem : ''}`}
                        style={{ animationDelay: `${0.1 + index * 0.05}s` }}
                        >
                            <span>
                                <strong>{item.amount}x</strong> {item.product.name}
                            </span>
                            <span className={styles.description} >
                                {item.product.description}
                            </span>
                        </section> 
                    ))
                ) : (
                    <div style={{ color: '#a0aec0', textAlign: 'center', padding: '20px' }}>
                        Nenhum item neste pedido
                    </div>
                )}

                <ButtonFinishOrder
                    className={styles.buttonOrder} 
                    onClick={() =>{handleFinishOrder(order[0]?.order?.id)}}
                    loading={loadingFinish}
                    style={{
                        fontWeight: 600,
                        letterSpacing: '0.5px',
                    }}
                >
                    ✓ Concluir Pedido
                </ButtonFinishOrder>

            </div>

        </Modal>
    )
}
