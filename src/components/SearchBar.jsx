import { useState } from 'react';
import { useCart } from '../context/CartContext';


const SearchBar = () => {
  const { handleSearch } = useCart();
  const [input, setInput] = useState('');

  const filterProducts = (e) => {
    e.preventDefault();
    handleSearch(input); 
  };

  return (
    <form className="d-flex me-4" role="search" onSubmit={filterProducts}>
      <input
        id="search-input"
        className="form-control me-2 border-success"
        type="search"
        placeholder="Buscar productos..."
        aria-label="Buscar"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button id="search-btn" className="btn btn-outline-success" type="submit">
        <i className="bi bi-search"></i>
      </button>
    </form>
  );
};

export default SearchBar;