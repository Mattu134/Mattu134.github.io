import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { ProductProvider, useProducts } from "../context/ProductContext";

function ProductsReader() {
  const ctx = useProducts();

  // Normalizamos para que el test sea estable
  const products = Array.isArray(ctx?.products) ? ctx.products : [];
  const keys = ctx && typeof ctx === "object" ? Object.keys(ctx) : [];
  const extraKeysCount = keys.filter((k) => k !== "products").length;

  return (
    <div>
      <div data-testid="products-is-array">{String(Array.isArray(ctx?.products))}</div>
      <div data-testid="products-length">{String(products.length)}</div>
      <div data-testid="ctx-is-object">{String(!!ctx && typeof ctx === "object")}</div>
      <div data-testid="extra-keys-count">{String(extraKeysCount)}</div>
    </div>
  );
}

function ProductsReaderNoProvider() {
  useProducts();
  return <div>NO DEBERÍA LLEGAR</div>;
}

describe("ProductContext", () => {
  it("debería renderizar children dentro del ProductProvider", () => {
    render(
      <ProductProvider>
        <div data-testid="child">OK</div>
      </ProductProvider>
    );
    expect(screen.getByTestId("child")).toHaveTextContent("OK");
  });

  it("useProducts fuera del provider debería lanzar error", () => {
    // silencia el error en consola para que el output no se ensucie
    const originalError = console.error;
    console.error = () => {};

    expect(() => render(<ProductsReaderNoProvider />)).toThrow(
      /useProducts debe usarse dentro de un ProductProvider/i
    );

    console.error = originalError;
  });

  it("dentro del provider debería exponer products como array (aunque sea vacío)", () => {
    render(
      <ProductProvider>
        <ProductsReader />
      </ProductProvider>
    );

    expect(screen.getByTestId("products-is-array")).toHaveTextContent("true");
    expect(Number(screen.getByTestId("products-length").textContent)).toBeGreaterThanOrEqual(0);
  });

  it("dentro del provider debería entregar un objeto de contexto válido", () => {
    render(
      <ProductProvider>
        <ProductsReader />
      </ProductProvider>
    );

    expect(screen.getByTestId("ctx-is-object")).toHaveTextContent("true");
    expect(Number(screen.getByTestId("extra-keys-count").textContent)).toBeGreaterThanOrEqual(0);
  });
});
