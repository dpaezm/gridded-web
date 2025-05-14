import { Route, Routes } from "react-router-dom";
import Hero from "./components/Hero";
import "./App.css";
import "./styles/global.css";
import Nav from "./components/Nav";
import Contact from "./components/Contact";
import Agentes from "./components/Agentes";
import Automatizacion from "./components/Automatizacion";
import Footer from "./components/Footer";

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
              <Automatizacion />
              <Agentes />
              <Contact />
              <Footer />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
