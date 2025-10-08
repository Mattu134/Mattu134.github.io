import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './Pages/Home';
import Dulces from './Pages/Dulces';
import Frutas from './Pages/Frutas';
import SobreNosotros from './Pages/SobreNosotros';

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dulces" element={<Dulces />} />
            <Route path="/frutas" element={<Frutas />} />
            <Route path="/quienes-somos" element={<SobreNosotros />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;