import { Route, Routes } from "react-router-dom";
import Hero from "./components/Hero";
import "react-toastify/dist/ReactToastify.css";
import "./styles/toastify-custom.css";
import "./App.css";
import "./styles/global.css";
import Nav from "./components/Nav";
import Contact from "./components/Contact";
import Servicios from "./components/Servicios";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import Ventas from "./components/Ventas";
import Subscribe from "./components/Subscribe";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Nav />
              <Hero />
              {/*               <Ventas />
              <Subscribe /> */}
              <Servicios />
              <Contact />
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
          }
        />
      </Routes>
    </>
  );
}

export default App;
