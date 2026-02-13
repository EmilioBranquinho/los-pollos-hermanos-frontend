import { ButtonHTMLAttributes } from 'react';
import styles from './styles.module.scss'
import { ClipLoader } from 'react-spinners';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    children: React.ReactNode;
}

export function ButtonFinishOrder({loading, children, ...rest}: ButtonProps) {
    return ( 
    <button 
    className={styles.button}
    disabled={loading}
    {...rest}
    >
        {loading ? (
        <ClipLoader size={20} color="#3498db"  />    
        ): (
            <span>{children}</span>
        )}
    </button> 
    ) 
} 