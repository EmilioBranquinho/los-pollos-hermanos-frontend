import { AuthProvider } from "@/contexts/AuthContext";
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Head from "next/head";

const ToastContainer = dynamic(
  () => import("react-toastify").then(m => m.ToastContainer),
  { ssr: false }
);

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const noBgRoutes: Array<string> = ["/", "/signup"];
  const removeBg: boolean = noBgRoutes.includes(router.pathname);

  <Head>
    <meta property="og:image" content="https://los-pollos-hermanos-six.vercel.app/_next/static/media/logo.b308968a.png" />
  </Head>

  return (
    <AuthProvider>
      <div className={removeBg ? "" : "default-background"}>
        <Component {...pageProps} />
      </div>

      <ToastContainer autoClose={3000} />
    </AuthProvider>
  );
}
