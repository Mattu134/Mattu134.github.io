import React, { useEffect, useMemo, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import { listarBoletas } from "../services/BoletaService"; 
import { useAuth } from "../context/AuthContext";

const Ventas = () => {  
  const { role } = useAuth();

  const [boletas, setBoletas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [estadoFilter, setEstadoFilter] = useState("TODOS");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const [selectedBoleta, setSelectedBoleta] = useState(null);

  useEffect(() => {
    const fetchBoletas = async () => {
        const data = await listarBoletas();
            console.log("Boletas recibidas:", data);
            setBoletas(Array.isArray(data) ? data : []);
      try {
        setLoading(true);
        setError(null);
        const data = await listarBoletas();
        setBoletas(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error cargando boletas:", err);
        const backendMessage =
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          err.message;
        setError(
          backendMessage ||
            "No se pudieron cargar las ventas. Inténtalo nuevamente."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBoletas();
  }, []);

  const filteredBoletas = useMemo(() => {
    return boletas.filter((b) => {
      const term = searchTerm.toLowerCase().trim();

      const matchesSearch =
        !term ||
        b.id?.toString().includes(term) ||
        b.cliente?.nombre?.toLowerCase().includes(term) ||
        b.cliente?.email?.toLowerCase().includes(term) ||
        b.cliente?.rut?.toLowerCase().includes(term);

      const matchesEstado =
        estadoFilter === "TODOS" ||
        (b.estado && b.estado.toUpperCase() === estadoFilter);

      const fechaBoleta = b.fecha ? new Date(b.fecha) : null;
      let matchesDate = true;

      if (dateFrom && fechaBoleta) {
        const from = new Date(dateFrom + "T00:00:00");
        if (fechaBoleta < from) matchesDate = false;
      }

      if (dateTo && fechaBoleta) {
        const to = new Date(dateTo + "T23:59:59");
        if (fechaBoleta > to) matchesDate = false;
      }

      return matchesSearch && matchesEstado && matchesDate;
    });
  }, [boletas, searchTerm, estadoFilter, dateFrom, dateTo]);
  const stats = useMemo(() => {
    if (!filteredBoletas || filteredBoletas.length === 0) {
      return {
        totalVentas: 0,
        cantidadBoletas: 0,
        ticketPromedio: 0,
        productosVendidos: 0,
      };
    }

    const totalVentas = filteredBoletas.reduce(
      (sum, b) => sum + (b.total || 0),
      0
    );

    const cantidadBoletas = filteredBoletas.length;

    const productosVendidos = filteredBoletas.reduce((sum, b) => {
      const itemsCount = (b.items || []).reduce(
        (s, item) => s + (item.cantidad || 0),
        0
      );
      return sum + itemsCount;
    }, 0);

    const ticketPromedio =
      cantidadBoletas > 0 ? totalVentas / cantidadBoletas : 0;

    return {
      totalVentas,
      cantidadBoletas,
      ticketPromedio,
      productosVendidos,
    };
  }, [filteredBoletas]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setEstadoFilter("TODOS");
    setDateFrom("");
    setDateTo("");
  };

  const formatCurrency = (value) =>
    (value || 0).toLocaleString("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0,
    });

  const formatDateTime = (value) =>
    value ? new Date(value).toLocaleString("es-CL") : "—";

  return (
    <div className="bg-light min-vh-100">
      <AdminHeader />

      <div className="container py-4 py-md-5">
        <div className="d-flex flex-wrap align-items-center justify-content-between mb-4">
          <div>
            <h1 className="h3 fw-bold mb-1">Gestión de Ventas</h1>
            <p className="text-muted mb-0">
              Revisa las boletas generadas, filtra por fecha, estado y cliente.
            </p>
          </div>
          <span className="badge bg-success-subtle text-success mt-3 mt-md-0">
            Rol: {role}
          </span>
        </div>

        <div className="row g-3 mb-4">
          <div className="col-lg-8">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="card-title fw-bold mb-0">Filtros</h5>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={handleClearFilters}
                  >
                    Limpiar filtros
                  </button>
                </div>

                <div className="row g-2">
                  <div className="col-md-4">
                    <label className="form-label small text-muted">
                      Buscar por ID, cliente, email o RUT
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ej: Juan Pérez o 12345678-9"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label small text-muted">
                      Estado
                    </label>
                    <select
                      className="form-select"
                      value={estadoFilter}
                      onChange={(e) => setEstadoFilter(e.target.value)}
                    >
                      <option value="TODOS">Todos</option>
                      <option value="PAGADA">Pagada</option>
                      <option value="PENDIENTE">Pendiente</option>
                      <option value="ANULADA">Anulada</option>
                    </select>
                  </div>

                  <div className="col-md-2">
                    <label className="form-label small text-muted">
                      Desde
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label small text-muted">Hasta</label>
                    <input
                      type="date"
                      className="form-control"
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Metricas */}
          <div className="col-lg-4">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <h5 className="card-title fw-bold mb-3">Resumen de ventas</h5>
                <ul className="list-unstyled mb-0 small">
                  <li className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Total ventas (filtradas):</span>
                    <span className="fw-bold text-success">
                      {formatCurrency(stats.totalVentas)}
                    </span>
                  </li>
                  <li className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Cantidad de boletas:</span>
                    <span className="fw-bold">
                      {stats.cantidadBoletas}
                    </span>
                  </li>
                  <li className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Ticket promedio:</span>
                    <span className="fw-bold">
                      {formatCurrency(stats.ticketPromedio)}
                    </span>
                  </li>
                  <li className="d-flex justify-content-between">
                    <span className="text-muted">Productos vendidos:</span>
                    <span className="fw-bold">
                      {stats.productosVendidos}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Tabla de boletas */}
        <div className="card shadow-sm border-0">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="card-title fw-bold mb-0">Listado de boletas</h5>
              <span className="small text-muted">
                Mostrando {filteredBoletas.length} de {boletas.length} ventas
              </span>
            </div>

            {loading && (
              <p className="text-center text-muted my-4">
                Cargando ventas...
              </p>
            )}

            {error && !loading && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            {!loading && !error && filteredBoletas.length === 0 && (
              <p className="text-center text-muted my-4">
                No se encontraron ventas con los filtros aplicados.
              </p>
            )}

            {!loading && !error && filteredBoletas.length > 0 && (
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Fecha</th>
                      <th>Cliente</th>
                      <th>Items</th>
                      <th>Total</th>
                      <th>Estado</th>
                      <th>Método de pago</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBoletas.map((b) => {
                      const itemsCount = (b.items || []).reduce(
                        (sum, i) => sum + (i.cantidad || 0),
                        0
                      );
                      const estadoBadgeClass = (() => {
                        const est = (b.estado || "").toUpperCase();
                        if (est === "PAGADA") return "bg-success-subtle text-success";
                        if (est === "PENDIENTE") return "bg-warning-subtle text-warning";
                        if (est === "ANULADA") return "bg-danger-subtle text-danger";
                        return "bg-secondary-subtle text-secondary";
                      })();

                      return (
                        <tr key={b.id}>
                          <td className="small">#{b.id}</td>
                          <td className="small">{formatDateTime(b.fecha)}</td>
                          <td className="small">
                            <div className="fw-semibold">
                              {b.cliente?.nombre || "—"}
                            </div>
                            <div className="text-muted">
                              {b.cliente?.email || "—"}
                            </div>
                          </td>
                          <td className="small">{itemsCount}</td>
                          <td className="small fw-bold">
                            {formatCurrency(b.total)}
                          </td>
                          <td className="small">
                            <span className={`badge ${estadoBadgeClass}`}>
                              {b.estado || "—"}
                            </span>
                          </td>
                          <td className="small">
                            {b.metodoPago || "No especificado"}
                          </td>
                          <td className="text-end">
                            <button
                              className="btn btn-sm btn-outline-success"
                              onClick={() => setSelectedBoleta(b)}
                            >
                              Ver detalle
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/*detalle de boleta */}
        {selectedBoleta && (
          <div
            className="modal fade show"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.4)" }}
            tabIndex="-1"
            role="dialog"
          >
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
              <div className="modal-content border-0">
                <div className="modal-header">
                  <h5 className="modal-title">
                    Boleta #{selectedBoleta.id}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setSelectedBoleta(null)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <h6 className="fw-bold">Datos del cliente</h6>
                      <p className="mb-1 small">
                        <span className="text-muted">Nombre: </span>
                        {selectedBoleta.cliente?.nombre || "—"}
                      </p>
                      <p className="mb-1 small">
                        <span className="text-muted">Email: </span>
                        {selectedBoleta.cliente?.email || "—"}
                      </p>
                      <p className="mb-1 small">
                        <span className="text-muted">Teléfono: </span>
                        {selectedBoleta.cliente?.telefono || "—"}
                      </p>
                      <p className="mb-1 small">
                        <span className="text-muted">RUT: </span>
                        {selectedBoleta.cliente?.rut || "—"}
                      </p>
                      <p className="mb-1 small">
                        <span className="text-muted">Dirección: </span>
                        {selectedBoleta.cliente?.direccion || "—"}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <h6 className="fw-bold">Información de la venta</h6>
                      <p className="mb-1 small">
                        <span className="text-muted">Fecha: </span>
                        {formatDateTime(selectedBoleta.fecha)}
                      </p>
                      <p className="mb-1 small">
                        <span className="text-muted">Estado: </span>
                        {selectedBoleta.estado || "—"}
                      </p>
                      <p className="mb-1 small">
                        <span className="text-muted">Método de pago: </span>
                        {selectedBoleta.metodoPago || "No especificado"}
                      </p>
                      <p className="mb-1 small fw-bold">
                        <span className="text-muted">Total: </span>
                        {formatCurrency(selectedBoleta.total)}
                      </p>
                    </div>
                  </div>

                  <hr />

                  <h6 className="fw-bold mb-2">Detalle de productos</h6>
                  <div className="list-group">
                    {(selectedBoleta.items || []).map((item, idx) => (
                      <div
                        key={idx}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <div>
                          <p className="mb-1 fw-semibold">{item.nombre}</p>
                          <small className="text-muted">
                            {item.cantidad} x{" "}
                            {formatCurrency(item.precioUnitario)}
                          </small>
                        </div>
                        <span className="fw-bold">
                          {formatCurrency(
                            (item.cantidad || 0) * (item.precioUnitario || 0)
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setSelectedBoleta(null)}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {selectedBoleta && (
          <div
            className="modal-backdrop fade show"
            onClick={() => setSelectedBoleta(null)}
          ></div>
        )}
      </div>
    </div>
  );
};

export default Ventas;
