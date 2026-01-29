import { canSSRAuth } from '@/utils/canSSRAuth'
import styles from './styles.module.scss'
import { Header } from '@/components/ui/Header'


export default function Dashboard(){
    return(
        <>
        <Header/>   
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

    return {
        props: {}
    }
})