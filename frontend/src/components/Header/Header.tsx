import { Link } from "react-router-dom";
import { useState } from "react";
import "./Header.css";

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__brand">
          🚀 Serwis Ogłoszeniowy
        </Link>

        <nav className="header__nav">
          {isLoggedIn ? (
            <div className="header__user-profile" onClick={() => setIsLoggedIn(false)}>
              <div className="user-avatar">👤</div>
              <span className="user-name">Mój profil</span>
            </div>
          ) : (
            <div className="header__auth-buttons">
              <button 
                className="btn btn--secondary" 
                onClick={() => setIsLoggedIn(true)}
              >
                Zaloguj
              </button>
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