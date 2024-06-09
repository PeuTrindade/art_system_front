import "@/styles/globals.css";
import 'bootstrap/dist/css/bootstrap.css'
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

export default function App({ Component, pageProps }: AppProps) {
  const { push } = useRouter()

  useEffect(() => {
    const userData = window.sessionStorage.getItem('user')

    if (!userData) {
      Cookies.remove('token')

      push('/login')
    }
  }, [])

  return (
  <>
    <ToastContainer />
    <Component {...pageProps} />
  </>);
}
