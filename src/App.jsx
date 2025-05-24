import { Route, Routes } from "react-router-dom";
import Hero from "./components/Hero";
import Contact from "./components/Contact";
import Servicios from "./components/Servicios";
import UseCases from "./components/UseCases";
import Layout from "./components/Layout";

// import Ventas from "./components/Ventas";
// import Subscribe from "./components/Subscribe";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Hero />
            {/* 🔧 Secciones pendientes de activar en siguiente fase */}
            {/* <Ventas />
            <Subscribe /> */}
            <Servicios />
            <UseCases />
            <Contact />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
