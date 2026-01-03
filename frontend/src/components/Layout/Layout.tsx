import { Outlet, Link } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export function Layout() {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 16 }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <Link to="/" style={{ fontSize: 20, fontWeight: 700, textDecoration: "none", color: "inherit" }}>
          Tablica Sąsiedzka
        </Link>
        <span style={{ opacity: 0.7 }}>Osiedle: Demo</span>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16 }}>
        <main style={{ border: "1px solid #ddd", borderRadius: 12, padding: 16 }}>
          <Outlet />
        </main>

        <aside style={{ border: "1px solid #ddd", borderRadius: 12, padding: 16 }}>
          <Sidebar />
        </aside>
      </div>

      <footer style={{ marginTop: 16, opacity: 0.6, fontSize: 12 }}>
        MVP • PERN • lokalne ogłoszenia
      </footer>
    </div>
  );
}
