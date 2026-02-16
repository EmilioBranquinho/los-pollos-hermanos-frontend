import { ClipLoader } from "react-spinners";
import styles from './styles.module.scss'

export default function LoadingSpinner() {
  return (
    <div className={styles.loading}>
      <ClipLoader size={60} color="#f56427"  />
    </div>
  );
}

