import styles from './styles.module.scss';
import { FiTrash2, FiDollarSign } from 'react-icons/fi';
import { useState } from 'react';
import { api } from '@/services/apiClient';
import { toast } from 'react-toastify';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  banner: string;
}

interface ProductListProps {
  products: Product[] | [];
  onProductDeleted: (productId: string) => void;
}

export function ProductList({ products, onProductDeleted }: ProductListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function deleteProduct(product_id: string){
    await onProductDeleted(product_id)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Produtos Cadastrados</h2>
        <span className={styles.count}>{products?.length}</span>
      </div>

      {products?.length > 0 ? (
        <div className={styles.list}>
          {products?.map((product) => (
            <div key={product?.id} className={styles.productCard}>
              {product.banner && (
                <div className={styles.imageWrapper}>
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL as string}/img/${product.banner}`}
                    alt={product?.name}
                    className={styles.image}
                  />
                </div>
              )}

              <div className={styles.content}>
                <h3 className={styles.productName}>{product?.name}</h3>
                <p className={styles.productDescription}>{product?.description}</p>

                <div className={styles.footer}>
                  <div className={styles.price}>
                    <FiDollarSign size={18} />
                    <span>Preço : {product?.price}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => deleteProduct(product.id)}
                    disabled={deletingId === product.id}
                    className={styles.deleteButton}
                    title="Remover produto"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p>Nenhum produto cadastrado ainda</p>
          <span>Comece adicionando um novo produto</span>
        </div>
      )}
    </div>
  );
}
