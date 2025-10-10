import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
      <Router>
        <Navbar />
        
        <main style={{ minHeight: 'calc(100vh - 100px)' }}>
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/dulces" element={<Dulces />} />
            <Route path="/frutas" element={<Frutas />} />
            <Route path="/sobre-nosotros" element={<SobreNosotros />} />
            <Route path='/login' element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/admin' element={<AdminPanel />} />
              <Route path='/admin/productos' element={<ProductsList />} />
            </Route>
            <Route path="*" element={<Home />} />
            
          </Routes>
        </main>
        
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;