import { AuthProvider } from "@/contexts/AuthContext";
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const ToastContainer = dynamic(
  () => import("react-toastify").then(m => m.ToastContainer),
  { ssr: false }
);

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const noBgRoutes: Array<string> = ["/", "/signup"];
  const removeBg: boolean = noBgRoutes.includes(router.pathname);

  return (
    <AuthProvider>
      <div className={removeBg ? "" : "default-background"}>
        <Component {...pageProps} />
      </div>

      <ToastContainer autoClose={3000} />
    </AuthProvider>
  );
}
