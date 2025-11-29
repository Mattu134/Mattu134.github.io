// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CustomAlert from "./components/CustomAlert";

import Home from "./Pages/Home";
import SobreNosotros from "./Pages/SobreNosotros";
import Checkout from "./Pages/Checkout";
import Blog from "./Pages/Blog";
import BlogPostDetail from "./Pages/BlogPostDetail";
import Login from "./Pages/Login";
import Contacto from "./Pages/Contacto";
import AdminPanel from "./Pages/AdminPanel";
import ProductsList from "./components/ProductList";
import UserList from "./components/UserList";

import Frutas from "./Pages/categorias/Frutas";
import Dulces from "./Pages/categorias/Dulces";
import Carnes from "./Pages/categorias/Carnes";
import Pescados from "./Pages/categorias/Pescados";
import Panaderia from "./Pages/categorias/Panaderia";
import Aseo from "./Pages/categorias/Aseo";
import Bebestibles from "./Pages/categorias/Bebestibles";
import Ofertas from "./Pages/categorias/Ofertas";
import Lacteos from "./Pages/categorias/Lacteos";
import Congelados from "./Pages/categorias/Congelados";

const MainLayout = ({ children }) => (
  <div id="app-container" className="d-flex flex-column min-vh-100">
    <Navbar />
    <main className="flex-grow-1">{children}</main>
    <Footer />
    <CustomAlert />
  </div>
);

const AdminLayout = ({ children }) => (
  <div id="admin-container" className="d-flex flex-column min-vh-100">
    <main className="flex-grow-1">{children}</main>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<MainLayout><Home /></MainLayout>} />
          <Route path="/frutas" element={<MainLayout><Frutas /></MainLayout>} />
          <Route path="/dulces" element={<MainLayout><Dulces /></MainLayout>} />
          <Route path="/carnes" element={<MainLayout><Carnes /></MainLayout>} />
          <Route path="/pescados" element={<MainLayout><Pescados /></MainLayout>} />
          <Route path="/panaderia" element={<MainLayout><Panaderia /></MainLayout>} />
          <Route path="/aseo" element={<MainLayout><Aseo /></MainLayout>} />
          <Route path="/bebestibles" element={<MainLayout><Bebestibles /></MainLayout>} />
          <Route path="/lacteos" element={<MainLayout><Lacteos /></MainLayout>} />
          <Route path="/congelados" element={<MainLayout><Congelados /></MainLayout>} />
          <Route path="/ofertas" element={<MainLayout><Ofertas /></MainLayout>} />
          <Route path="/quienes-somos" element={<MainLayout><SobreNosotros /></MainLayout>} />
          <Route path="/checkout" element={<MainLayout><Checkout /></MainLayout>} />
          <Route path="/blog" element={<MainLayout><Blog /></MainLayout>} />
          <Route path="/blog/:id" element={<MainLayout><BlogPostDetail /></MainLayout>} />
          <Route path="/contacto" element={<MainLayout><Contacto /></MainLayout>} />

          <Route path="/login" element={<AdminLayout><Login /></AdminLayout>} />
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout><AdminPanel /></AdminLayout>} />
            <Route path="/admin/productos" element={<AdminLayout><ProductsList /></AdminLayout>} />
            <Route path="/admin/usuarios" element={<AdminLayout><UserList /></AdminLayout>} />
            <Route path="/admin/ventas" element={<AdminLayout><AdminPanel /></AdminLayout>} />
            <Route path="/admin/pedidos" element={<AdminLayout><AdminPanel /></AdminLayout>} />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
