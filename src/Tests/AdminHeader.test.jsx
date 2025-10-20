// src/Test/AdminHeader.test.jsx (CORREGIDO)
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';

import { AuthContext } from '../context/AuthContext'; 

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const AuthMockProvider = ({ children, value }) => (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
);

describe('AdminHeader', () => {
  const mockLogout = vi.fn();
  const mockContextValue = {
    logout: mockLogout,
    user: { username: 'admin.user', role: 'administrator' } 
  };
    
  const renderWithContext = () => render(
      <MemoryRouter>
          <AuthMockProvider value={mockContextValue}>
              <AdminHeader />
          </AuthMockProvider>
      </MemoryRouter>
  );

  beforeEach(() => {
    vi.clearAllMocks();
  });


  it('debería renderizar el nombre de usuario y los links de navegación', () => {
    renderWithContext();

    // Comprueba el nombre de usuario
    expect(screen.getByText('admin.user')).toBeInTheDocument();
    
    // Comprueba el link y el botón de cerrar sesión
    expect(screen.getByRole('link', { name: 'Productos' })).toHaveAttribute('href', '/admin/productos');
    expect(screen.getByRole('button', { name: 'Cerrar sesión' })).toBeInTheDocument();
  });

  it('debería llamar a logout y navegar a /login al hacer clic en Cerrar sesión', () => {
    renderWithContext();

    fireEvent.click(screen.getByRole('button', { name: 'Cerrar sesión' }));

    //Comprueba que la función logout simulada haya sido llamada
    expect(mockLogout).toHaveBeenCalledTimes(1);

    //Comprueba que la navegación a /login haya sido llamada
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
  
});