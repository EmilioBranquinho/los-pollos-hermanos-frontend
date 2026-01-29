import Link from "next/link";
import  { FiLogOut } from "react-icons/fi";
import styles from './styles.module.scss'
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

export function Header(){

    const { signOut } = useContext(AuthContext)

    return(
        <>
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link
                href='/dashboard'>
                <img src="/logo.png" alt="Los Pollos Hermanos" width={100} height={100} />
                </Link>

                <nav className={styles.menuNav}>

                    <Link href='/categorias'>
                    <span>Categorias</span>                    
                    </Link>
                    
                    <Link href='/cardapio'>
                    <span>Cardápio</span>
                    </Link>
                    
                    <button
                    onClick={signOut}
                    >
                        <FiLogOut size={24} color="#FF3F4B"/>
                    </button>
                </nav>
            </div>
        </header>
        </>
    )
}