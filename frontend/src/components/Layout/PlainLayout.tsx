import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import "./Layout.css";

export function PlainLayout() {
  return (
    <div className="layout">
      <Header />
      <div className="layout__container">
        <main className="layout__main">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}