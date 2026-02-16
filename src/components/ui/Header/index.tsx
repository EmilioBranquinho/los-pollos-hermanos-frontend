import  { FiLogOut } from "react-icons/fi";
import styles from './styles.module.scss'
import { useContext, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import Image from "next/image";

interface NameProps {
    name: string
}

export function Header({ name }: NameProps){

    const { signOut } = useContext(AuthContext)
    const router = useRouter();

    const routeName = router.asPath.slice(1)

    return(
        <>
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>

                <a href="/dashboard" className={styles.logo}>
                <Image 
                 src="/horizontal-logo.png" 
                 alt="Los Pollos Logo" 
                 width={200} 
                 height={150} 
                 quality={100}
                 unoptimized
                 priority
                />
                </a>

                <nav className={styles.menuNav}>

                    <a href='/dashboard'>
                    <span style={routeName === "dashboard" ? { color: "#f56427" }: undefined }>Dashboard</span>                    
                    </a>

                    <a href='/category'>
                    <span style={ routeName === "category" ? { color: "#f56427"  }: undefined}>Categorias</span>                    
                    </a>
                    
                    <a href='/product'>
                    <span style={routeName === "product" ? { color: "#f56427"  }: undefined}>Cardápio</span>
                    </a>
                    
                </nav>

                <button
                onClick={signOut}
                className={styles.buttonSignOut}
                >
                    <FiLogOut size={24} color="#f56427"/>
                </button>
            </div>
        </header>
        </>
    )
}