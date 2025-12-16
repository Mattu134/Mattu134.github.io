import { describe, it, expect, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CartProvider, useCart } from "../context/CartContext";

// Mock bootstrap 
vi.mock("bootstrap/dist/js/bootstrap.bundle.min.js", () => ({
  Modal: vi.fn(() => ({
    show: vi.fn(),
    hide: vi.fn(),
  })),
}));

const productoManzana = {
  id: "p1",
  nombre: "Manzana",
  precio: 1000,
};

const productoPlatano = {
  id: "p2",
  nombre: "Plátano",
  precio: 500,
};

const TestComponent = () => {
  const { cart, addToCart, removeFromCart, processPayment, totalAmount } =
    useCart();

  return (
    <div>
      <button onClick={() => addToCart(productoManzana, 1)}>
        Add Manzana
      </button>
      <button onClick={() => addToCart(productoPlatano, 1)}>
        Add Plátano
      </button>
      <button onClick={() => removeFromCart("p1")}>
        Remove Manzana
      </button>
      <button onClick={processPayment}>Process Payment</button>

      <div data-testid="cart-total">Total: {totalAmount}</div>
      <div data-testid="cart-items">
        {cart.map((item) => (
          <div key={item.id}>
            {item.name} - Qty: {item.quantity}
          </div>
        ))}
      </div>
    </div>
  );
};

const renderWithProvider = () =>
  render(
    <CartProvider>
      <TestComponent />
    </CartProvider>
  );

describe("CartContext Logic", () => {
  const user = userEvent.setup();

  it("agrega producto y calcula total", async () => {
    renderWithProvider();
    await user.click(screen.getByText("Add Manzana"));

    expect(screen.getByTestId("cart-items")).toHaveTextContent(
      "Manzana - Qty: 1"
    );
    expect(screen.getByTestId("cart-total")).toHaveTextContent("Total: 1000");
  });

  it("incrementa cantidad y recalcula total", async () => {
    renderWithProvider();
    await act(async () => {
      await user.click(screen.getByText("Add Manzana"));
      await user.click(screen.getByText("Add Manzana"));
    });

    expect(screen.getByTestId("cart-items")).toHaveTextContent(
      "Manzana - Qty: 2"
    );
    expect(screen.getByTestId("cart-total")).toHaveTextContent("Total: 2000");
  });

  it("elimina producto y recalcula total", async () => {
    renderWithProvider();

    await act(async () => {
      await user.click(screen.getByText("Add Manzana"));
      await user.click(screen.getByText("Add Plátano"));
    });

    expect(screen.getByTestId("cart-total")).toHaveTextContent("Total: 1500");

    await user.click(screen.getByText("Remove Manzana"));

    expect(screen.getByTestId("cart-items")).not.toHaveTextContent("Manzana");
    expect(screen.getByTestId("cart-items")).toHaveTextContent(
      "Plátano - Qty: 1"
    );
    expect(screen.getByTestId("cart-total")).toHaveTextContent("Total: 500");
  });

  it("vacía carrito al procesar pago", async () => {
    renderWithProvider();

    await act(async () => {
      await user.click(screen.getByText("Add Manzana"));
      await user.click(screen.getByText("Add Plátano"));
    });

    expect(screen.getByTestId("cart-total")).toHaveTextContent("Total: 1500");

    await user.click(screen.getByText("Process Payment"));

    expect(screen.getByTestId("cart-items")).toBeEmptyDOMElement();
    expect(screen.getByTestId("cart-total")).toHaveTextContent("Total: 0");
  });
});
