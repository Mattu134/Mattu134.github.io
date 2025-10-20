import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductsList from '../components/ProductList';
import * as ProductServices from '../services/productServices';

// 1. Mockeamos el Header
vi.mock('../components/AdminHeader', () => ({
  default: () => <div data-testid="admin-header-mock"></div>
}));

// 2. Mockeamos los Servicios
vi.mock('../services/productServices');

// 3. Mockeamos window.confirm
window.confirm = vi.fn(() => true);

// 4. --- ARREGLO PARA EL MODAL (CON data-testid) ---
vi.mock('react-bootstrap', async () => {
  const actual = await vi.importActual('react-bootstrap');

  const MockModal = ({ show, onHide, children }) => {
    if (!show) {
      return null;
    }
    // Añadimos data-testid="modal"
    return (
      <div className="mock-modal" data-testid="modal">
        {children}
      </div>
    );
  };

  MockModal.Header = ({ children }) => <div className="mock-modal-header">{children}</div>;
  MockModal.Title = ({ children }) => <h5 className="mock-modal-title">{children}</h5>;
  MockModal.Body = ({ children }) => <div className="mock-modal-body">{children}</div>;
  MockModal.Footer = ({ children }) => <div className="mock-modal-footer">{children}</div>;

  return {
    ...actual,
    Modal: MockModal,
  };
});
// --- FIN DEL ARREGLO PARA EL MODAL ---


// --- DATOS DE PRUEBA ---
const mockProducts = [
  { id: 'p1', name: 'Producto Mock 1', price: 100, stock: 10, lote: 'L1', expiracion: '2025-01-01', proveedor: 'Prov 1', category: 'Frutas', image: 'img1.png' },
  { id: 'p2', name: 'Producto Mock 2', price: 200, stock: 20, lote: 'L2', expiracion: '2025-01-02', proveedor: 'Prov 2', category: 'Verduras', image: 'img2.png' },
];

describe('Página ProductsList (CRUD con Modals)', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(ProductServices.fetchProducts).mockResolvedValue([...mockProducts]);
    vi.mocked(ProductServices.deleteProduct).mockResolvedValue({ success: true });
    vi.mocked(ProductServices.createProduct).mockResolvedValue(mockProducts[0]);
    vi.mocked(ProductServices.updateProduct).mockResolvedValue(mockProducts[0]);
  });

  // --- PRUEBA 1: LEER (Read) ---
  it('debería cargar y mostrar la lista de productos (Read)', async () => {
    render(<ProductsList />);
    expect(screen.getByTestId('admin-header-mock')).toBeInTheDocument();
    expect(screen.getByText(/Cargando productos.../i)).toBeInTheDocument();
    const productNames = await screen.findAllByRole('cell', { name: /Producto Mock/i });
    expect(productNames).toHaveLength(2);
    expect(ProductServices.fetchProducts).toHaveBeenCalledTimes(1);
  });

  // --- PRUEBA 2: BORRAR (Delete) ---
  it('debería eliminar un producto (Delete)', async () => {
    render(<ProductsList />);
    await screen.findAllByRole('cell', { name: /Producto Mock 1/i });
    const deleteButtons = screen.getAllByRole('button', { name: /Eliminar/i });
    await user.click(deleteButtons[0]);
    expect(window.confirm).toHaveBeenCalledWith('¿Estás seguro de eliminar "Producto Mock 1"?');
    expect(ProductServices.deleteProduct).toHaveBeenCalledWith('p1');
    await waitFor(() => {
      expect(ProductServices.fetchProducts).toHaveBeenCalledTimes(2);
    });
  });

  // --- PRUEBA 3: CREAR (Create) ---
  it('debería abrir el modal de "Crear" y enviar el formulario (Create)', async () => {
    render(<ProductsList />);
    await screen.findAllByRole('cell', { name: /Producto Mock 1/i });

    await user.click(screen.getByRole('button', { name: /Agregar Producto/i })); // Botón principal

    // 1. Encuentra el modal usando el data-testid
    const modal = screen.getByTestId('modal');

    // 2. Verifica el título DENTRO del modal
    expect(within(modal).getByRole('heading', { name: /Agregar Nuevo Producto/i })).toBeInTheDocument();

    // 3. Llena el formulario DENTRO del modal
    await user.type(within(modal).getByLabelText(/Nombre del Producto/i), 'Producto Nuevo Creado');
    await user.type(within(modal).getByLabelText(/Precio de Venta/i), '123');
    await user.type(within(modal).getByLabelText(/Stock/i), '50');

    // 4. Envía el formulario (busca el botón DENTRO del modal)
    await user.click(within(modal).getByRole('button', { name: 'Agregar Producto' }));

    expect(ProductServices.createProduct).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Producto Nuevo Creado', price: 123, stock: 50, })
    );
    await waitFor(() => {
      expect(ProductServices.fetchProducts).toHaveBeenCalledTimes(2);
    });
  });

  // --- PRUEBA 4: ACTUALIZAR (Update) ---
  it('debería abrir el modal de "Editar", llenarlo y enviarlo (Update)', async () => {
    render(<ProductsList />);
    await screen.findAllByRole('cell', { name: /Producto Mock 1/i });

    const editButtons = screen.getAllByRole('button', { name: /Editar/i });
    await user.click(editButtons[1]); // Clic en el de "Producto Mock 2"

    // 1. Encuentra el modal
    const modal = screen.getByTestId('modal');

    // 2. Verifica título y campos DENTRO del modal
    expect(within(modal).getByRole('heading', { name: /Editar Producto: Producto Mock 2/i })).toBeInTheDocument();
    const nombreInput = within(modal).getByLabelText(/Nombre del Producto/i);
    expect(nombreInput.value).toBe('Producto Mock 2');

    // 3. Modifica y envía DENTRO del modal
    await user.clear(nombreInput);
    await user.type(nombreInput, 'Producto Mock 2 Actualizado');
    await user.click(within(modal).getByRole('button', { name: /Guardar Cambios/i }));

    expect(ProductServices.updateProduct).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'p2', name: 'Producto Mock 2 Actualizado', })
    );
    await waitFor(() => {
      expect(ProductServices.fetchProducts).toHaveBeenCalledTimes(2);
    });
  });
});