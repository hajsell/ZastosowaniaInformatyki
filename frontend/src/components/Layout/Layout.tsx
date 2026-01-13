import { Outlet } from "react-router-dom";
import { Sidebar } from "../Sidebar/Sidebar";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import "./Layout.css";

export function Layout() {
  return (
    <div className="layout">
      <Header />
      <div className="layout__container">
        <div className="layout__grid">
          <Sidebar /> 
          
          <main className="layout__main">
            <Outlet />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}