// src/App.jsx (CORREGIDO)
// ❌ ELIMINAR la importación de BrowserRouter as Router
import { Routes, Route } from 'react-router-dom'; 
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './Pages/Home';
import Dulces from './Pages/Dulces';
import Frutas from './Pages/Frutas';
import SobreNosotros from './Pages/SobreNosotros';
import Login from './Pages/Login';
import AdminPanel from './Pages/AdminPanel';
import ProtectedRoute from './components/ProtectedRoute';
import ProductsList from './components/ProductList';



function App() {
  return (
    <CartProvider>
      
      <Navbar />
      
      <main style={{ minHeight: 'calc(100vh - 100px)' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dulces" element={<Dulces />} />
          <Route path="/frutas" element={<Frutas />} />
          <Route path="/quienes-somos" element={<SobreNosotros />} />
          <Route path='/login' element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/admin' element={<AdminPanel />} />
            <Route path='/admin/productos' element={<ProductsList />} />
            <Route path='/admin/usuarios' element={<UsersList />} /> 
            <Route path='/admin/ventas' element={<SalesPanel />} />     
            <Route path='/admin/pedidos' element={<OrdersList />} />
          </Route>
          <Route path="*" element={<Home />} />
            
        </Routes>
      </main>
      
      <Footer />
      
    </CartProvider>
  );
}

export default App;