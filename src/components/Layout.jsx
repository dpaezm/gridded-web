import Nav from "./Nav";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";

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
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}
