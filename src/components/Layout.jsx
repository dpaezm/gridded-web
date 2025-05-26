import Nav from "./Nav";
import Footer from "./Footer";
import { Bounce, ToastContainer } from "react-toastify";
import "../styles/toastify-custom.css";

export default function Layout({ children }) {
  return (
    <>
      <Nav />
      {children}
      <Footer />
      <ToastContainer
        position="bottom-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="dark"
        transition={Bounce}
      />
    </>
  );
}
