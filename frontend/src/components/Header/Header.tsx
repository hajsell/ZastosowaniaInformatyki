import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./Header.css";

export function Header() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    document.title = "VibeMark";
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__brand">
          <span className="brand-logo">⚡</span>
          <span className="brand-name">VibeMark</span>
        </Link>

        <nav className="header__nav">
          <Link 
            to={isLoggedIn ? "/add" : "/login"} 
            className="btn btn--secondary add-btn"
          >
            Dodaj ogłoszenie
          </Link>
          
          {isLoggedIn ? (
            <div className="header__user-menu">
              <Link to="/profile" className="header__user-profile">
                <div className="user-avatar">👤</div>
                <span className="user-name">Mój profil</span>
              </Link>
              <button onClick={handleLogout} className="btn-logout-icon" title="Wyloguj">
                Logout
              </button>
            </div>
          ) : (
            <div className="header__auth-buttons">
              <Link to="/login" className="btn btn--link">
                Zaloguj
              </Link>
              <Link to="/register" className="btn btn--primary">
                Zarejestruj się
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}