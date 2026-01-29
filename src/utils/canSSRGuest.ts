import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult} from 'next'
import { parseCookies } from 'nookies'

//funcao para paginas que podem ser acessadas por visitantes (nao logados)

export function canSSRGuest<P extends Record<string, any>>(fn: GetServerSideProps<P>) {
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        const cookies = parseCookies(ctx);

        if(cookies['@nextauth.token']){
            return {
                redirect: {
                    destination: '/dashboard',
                    permanent: false
                }
            }
                }

        return await fn(ctx);
    }
}