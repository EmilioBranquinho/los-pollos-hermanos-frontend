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
                {/* <img src="/logo.png" alt="Los Pollos Hermanos" width={100} height={100} /> */}
                </Link>

                <nav className={styles.menuNav}>

                    <a href='/category'>
                    <span>Categorias</span>                    
                    </a>
                    
                    <a href='/product'>
                    <span>Cardápio</span>
                    </a>
                    
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