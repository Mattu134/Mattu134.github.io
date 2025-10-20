import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CheckoutForm from "../components/CheckoutForm";
import regionesData from "../data/Regiones-Comunas";

describe("CheckoutForm completo", () => {
  it("renderiza todos los campos y botones correctamente", () => {
    render(<CheckoutForm onSubmit={vi.fn()} />);

    // Inputs obligatorios
    expect(screen.getByPlaceholderText(/Correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Nombre/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Apellidos/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/RUT/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Teléfono Celular/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Dirección/i)).toBeInTheDocument();

    // Inputs opcionales
    expect(screen.getByPlaceholderText(/Casa, apartamento/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Código postal/i)).toBeInTheDocument();

    // Checkboxes
    expect(screen.getByLabelText(/Deseo recibir ofertas/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Guardar mi información/i)).toBeInTheDocument();

    // Selects
    const selects = screen.getAllByRole("combobox");
    expect(selects.length).toBe(2); // región y comuna

    // Botón
    expect(screen.getByRole("button", { name: /Finalizar pedido/i })).toBeInTheDocument();
  });

  it("actualiza las comunas al cambiar la región", () => {
    render(<CheckoutForm onSubmit={vi.fn()} />);

    const regionSelect = screen.getAllByRole("combobox")[0];
    fireEvent.change(regionSelect, { target: { value: regionesData.regiones[0].nombre } });

    const comunaSelect = screen.getAllByRole("combobox")[1];
    expect(comunaSelect.children.length).toBe(regionesData.regiones[0].comunas.length + 1);
  });

  it("muestra errores de validación correctamente", () => {
    render(<CheckoutForm onSubmit={vi.fn()} />);
    const submitButton = screen.getByRole("button", { name: /Finalizar pedido/i });
    fireEvent.click(submitButton);

    // Errores obligatorios
    expect(screen.getByText(/Correo inválido/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Campo requerido/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Debe seleccionar una región/i)).toBeInTheDocument();
    expect(screen.getByText(/Debe seleccionar una comuna/i)).toBeInTheDocument();
    expect(screen.getByText(/Celular inválido/i)).toBeInTheDocument();
    expect(screen.getByText(/Formato RUT inválido/i)).toBeInTheDocument();
  });

  it("permite enviar el formulario con todos los campos completados correctamente", () => {
    const handleSubmit = vi.fn();
    render(<CheckoutForm onSubmit={handleSubmit} />);

    // Llenar campos obligatorios
    fireEvent.change(screen.getByPlaceholderText(/Correo electrónico/i), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByPlaceholderText(/Nombre/i), { target: { value: "Juan" } });
    fireEvent.change(screen.getByPlaceholderText(/Apellidos/i), { target: { value: "Pérez" } });
    fireEvent.change(screen.getByPlaceholderText(/RUT/i), { target: { value: "12345678-K" } });
    fireEvent.change(screen.getByPlaceholderText(/Teléfono Celular/i), { target: { value: "912345678" } });
    fireEvent.change(screen.getByPlaceholderText(/Dirección/i), { target: { value: "Calle Falsa 123" } });

    // Llenar campos opcionales
    fireEvent.change(screen.getByPlaceholderText(/Casa, apartamento/i), { target: { value: "Depto 4B" } });
    fireEvent.change(screen.getByPlaceholderText(/Código postal/i), { target: { value: "1234567" } });

    // Seleccionar región y comuna
    const regionSelect = screen.getAllByRole("combobox")[0];
    fireEvent.change(regionSelect, { target: { value: regionesData.regiones[0].nombre } });
    const comunaSelect = screen.getAllByRole("combobox")[1];
    fireEvent.change(comunaSelect, { target: { value: regionesData.regiones[0].comunas[0] } });

    // Marcar checkboxes
    const suscripcionCheckbox = screen.getByLabelText(/Deseo recibir ofertas/i);
    fireEvent.click(suscripcionCheckbox);
    const guardarInfoCheckbox = screen.getByLabelText(/Guardar mi información/i);
    fireEvent.click(guardarInfoCheckbox);

    // Enviar formulario
    fireEvent.click(screen.getByRole("button", { name: /Finalizar pedido/i }));

    // Verificar llamada a onSubmit
    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        email: "test@example.com",
        nombre: "Juan",
        apellidos: "Pérez",
        rut: "12345678-K",
        direccion: "Calle Falsa 123",
        depto: "Depto 4B",
        codigoPostal: "1234567",
        region: regionesData.regiones[0].nombre,
        comuna: regionesData.regiones[0].comunas[0],
        suscripcion: false,
        guardarInfo: true,
      })
    );
  });
});
