import "@/styles/globals.css";
import { AuthContextProvider } from "../../context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Do Communication</title>
      </Head>
      <AuthContextProvider>
        <Component {...pageProps} />
        <ToastContainer />
      </AuthContextProvider>
    </>
  );
}
const NetworkError = () => {
  return <div>Please connect to the network</div>;
};
