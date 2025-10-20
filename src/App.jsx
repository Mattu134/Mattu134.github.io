import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomAlert from './components/CustomAlert';
import Home from './Pages/Home';
import Frutas from './Pages/Frutas';
import Dulces from './Pages/Dulces';
import SobreNosotros from './Pages/SobreNosotros';
import Login from './Pages/Login';
import AdminPanel from './Pages/AdminPanel';
import ProductsList from './components/ProductList';
import Checkout from './Pages/Checkout';


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
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<MainLayout><Home /></MainLayout>} />
            <Route path="/frutas" element={<MainLayout><Frutas /></MainLayout>} />
            <Route path="/dulces" element={<MainLayout><Dulces /></MainLayout>} />
            <Route path="/quienes-somos" element={<MainLayout><SobreNosotros /></MainLayout>} />
            <Route path="/checkout" element={<MainLayout><Checkout /></MainLayout>} />
            <Route path="/login" element={<AdminLayout><Login /></AdminLayout>} />
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<AdminLayout><AdminPanel /></AdminLayout>} />
              <Route path="/admin/productos" element={<AdminLayout><ProductsList /></AdminLayout>} />
              <Route path="/admin/usuarios" element={<AdminLayout><AdminPanel /></AdminLayout>} />
              <Route path="/admin/ventas" element={<AdminLayout><AdminPanel /></AdminLayout>} />
              <Route path="/admin/pedidos" element={<AdminLayout><AdminPanel /></AdminLayout>} />
            </Route>
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
