import Link from "next/link";
import  { FiLogOut } from "react-icons/fi";
import styles from './styles.module.scss'
import { useContext, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/router";

interface NameProps {
    name: string
}

export function Header({ name }: NameProps){

    const { signOut } = useContext(AuthContext)
    const router = useRouter();
    let isThePath = false; 

    const routeName = router.asPath.slice(1)

    // if(routeName === name){
    //     isThePath = true
    // }

    return(
        <>
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>

                <nav className={styles.menuNav}>

                    <a href='/dashboard'>
                    <span style={routeName === "dashboard" ? { color: "#FF3F4B" }: undefined }>Dashboard</span>                    
                    </a>

                    <a href='/category'>
                    <span style={ routeName === "category" ? { color: "#FF3F4B"  }: undefined}>Categorias</span>                    
                    </a>
                    
                    <a href='/product'>
                    <span style={routeName === "product" ? { color: "#FF3F4B"  }: undefined}>Cardápio</span>
                    </a>
                    
                </nav>

                <button
                onClick={signOut}
                className={styles.buttonSignOut}
                >
                    <FiLogOut size={24} color="#FF3F4B"/>
                </button>
            </div>
        </header>
        </>
    )
}