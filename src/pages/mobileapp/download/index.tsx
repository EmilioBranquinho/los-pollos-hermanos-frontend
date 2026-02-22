import Link from 'next/link'
import styles from './styles.module.scss'
import { FiArrowLeft, FiDownload } from 'react-icons/fi'
import { BiMobileAlt } from 'react-icons/bi'

export default function DownloadPage() {
  const handleAndroidDownload = () => {
    window.open('https://play.google.com/store', '_blank')
  }

//   const handleIOSDownload = () => {
//     window.open('https://www.apple.com/app-store/', '_blank')
//   }

  return (
    <main className={styles.container}>
      <div className={styles.containerHeader}>
        <Link href="/" className={styles.backButton}>
          <FiArrowLeft size={20} />
          Voltar
        </Link>
        <div>
          <h1 className={styles.title}>Baixe o aplicativo para garçons</h1>
          <p className={styles.subtitle}>
            Abra um pedidos numa mesa, adicione oque o cliente deseja e finalize o pedido enviando para o admin do sistema web.
          </p>
        </div>
      </div>

      <section className={styles.platforms}>
        <div className={styles.downloadWrapper}>
          <div className={styles.platformCard}>
            <div className={styles.platformIcon}>
              <BiMobileAlt size={64} color="#3ddc84" />
            </div>
            <h2 className={styles.platformTitle}>Android</h2>
            <p className={styles.platformDescription}>
              Disponível no Google Play Store
            </p>
            <button 
              className={styles.downloadButton}
              onClick={handleAndroidDownload}
            >
              <FiDownload size={20} />
              Baixe aqui
            </button>
          </div>

          {/* <div className={styles.platformCard}>
            <div className={styles.platformIcon}>
              <BiMobileAlt size={64} color="#ffb703" />
            </div>
            <h2 className={styles.platformTitle}>iOS</h2>
            <p className={styles.platformDescription}>
              Disponível na App Store
            </p>
            <button 
              className={styles.downloadButton}
              onClick={handleIOSDownload}
            >
              <FiDownload size={20} />
              Baixar na App Store
            </button>
          </div> */}
        </div>

        <div className={styles.infoCard}>
          <div className={styles.infoHeader}>
            <span className={styles.infoBadge}>👨‍💼 App para Garçons</span>
          </div>
          <h3 className={styles.infoTitle}>Sistema de Pedidos Integrado</h3>
          <ul className={styles.infoList}>
            <li>Abra novos pedidos diretamente do celular</li>
            <li>Envie pedidos em tempo real para a cozinha</li>
            <li>Sincronize com o sistema web do administrador</li>
            <li>Aumenta a eficiência do atendimento</li>
          </ul>
          <p className={styles.infoFooter}>
            O aplicativo foi desenvolvido especialmente para facilitar o trabalho dos garçons, integrando-se perfeitamente com o sistema de gerenciamento da cozinha.
          </p>
        </div>
      </section>

      {/* <section className={styles.benefits}>
        <h2 className={styles.benefitsTitle}>Por que baixar nosso app?</h2>
        <div className={styles.benefitsGrid}>
          <div className={styles.benefitCard}>
            <span className={styles.benefitIcon}>⚡</span>
            <h3>Pedidos Rápidos</h3>
            <p>Faça seu pedido em poucos segundos</p>
          </div>

          <div className={styles.benefitCard}>
            <span className={styles.benefitIcon}>🎁</span>
            <h3>Ofertas Exclusivas</h3>
            <p>Acesso a descontos apenas para app</p>
          </div>

          <div className={styles.benefitCard}>
            <span className={styles.benefitIcon}>📍</span>
            <h3>Rastreamento</h3>
            <p>Acompanhe seu pedido em tempo real</p>
          </div>

          <div className={styles.benefitCard}>
            <span className={styles.benefitIcon}>🔔</span>
            <h3>Notificações</h3>
            <p>Receba promoções e atualizações</p>
          </div>
        </div>
      </section> */}
    </main>
  )
}
