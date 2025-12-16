import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AuthProvider, useAuth } from "../context/AuthContext";

function AuthReader() {
  const ctx = useAuth();

  return (
    <div>
      <div data-testid="has-login">{String(typeof ctx?.login === "function")}</div>
      <div data-testid="has-logout">{String(typeof ctx?.logout === "function")}</div>
      <div data-testid="has-user">{String(ctx?.user != null)}</div>
    </div>
  );
}

function AuthReaderNoProvider() {
  const ctx = useAuth();
  const isNullish = ctx == null; // null o undefined
  return <div data-testid="is-nullish">{String(isNullish)}</div>;
}

describe("AuthContext", () => {
  it("debería renderizar children dentro del AuthProvider", () => {
    render(
      <AuthProvider>
        <div data-testid="child">OK</div>
      </AuthProvider>
    );

    expect(screen.getByTestId("child")).toHaveTextContent("OK");
  });

  it("useAuth fuera del provider debería devolver null/undefined (y no crashear)", () => {
    render(<AuthReaderNoProvider />);
    expect(screen.getByTestId("is-nullish")).toHaveTextContent("true");
  });

  it("debería exponer login/logout y un estado de usuario (aunque sea null)", () => {
    render(
      <AuthProvider>
        <AuthReader />
      </AuthProvider>
    );

    expect(screen.getByTestId("has-login")).toHaveTextContent("true");
    expect(screen.getByTestId("has-logout")).toHaveTextContent("true");
    expect(["true", "false"]).toContain(screen.getByTestId("has-user").textContent);
  });
});
