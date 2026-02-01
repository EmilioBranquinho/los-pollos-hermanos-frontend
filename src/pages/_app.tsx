import { AuthProvider } from "@/contexts/AuthContext";
import "../styles/globals.scss";
import type { AppProps } from "next/app";


import dynamic from "next/dist/shared/lib/dynamic";

const ToastContainer = dynamic(
  () => import("react-toastify").then(m => m.ToastContainer),
  { ssr: false }
);

export default function App({ Component, pageProps }: AppProps) {
  return <AuthProvider>
    <Component {...pageProps} />;
    <ToastContainer autoClose={3000} aria-label={undefined} />
  </AuthProvider> 
}
