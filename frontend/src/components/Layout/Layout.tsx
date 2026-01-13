import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "../Sidebar/Sidebar";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { ScrollToTop } from "../ScrollToTop";
import "./Layout.css";

export function Layout() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="layout">
      <ScrollToTop />
      <Header />
      <div className="layout__container">
        <div className={isAuthPage ? "layout__full-width" : "layout__grid"}>
          {!isAuthPage && <Sidebar />} 
          
          <main className="layout__main">
            <Outlet />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}