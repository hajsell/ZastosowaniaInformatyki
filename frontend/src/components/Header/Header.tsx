import { Link } from "react-router-dom";
import { useState } from "react";
import "./Header.css";

export function Header() {
  const [isLoggedIn] = useState(true);

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__brand">
          🚀 Serwis Ogłoszeniowy
        </Link>

        <nav className="header__nav">
          <Link to={isLoggedIn ? "/add-post" : "/login"} className="btn btn--secondary">
            Dodaj ogłoszenie
          </Link>
          
        {isLoggedIn ? (
        
            <Link to="/profile" className="header__user-profile">
              <div className="user-avatar">👤</div>
              <span className="user-name">Mój profil</span>
            </Link>
        ) : (
            <div className="header__auth-buttons">
            <Link to="/login" className="btn btn--secondary">
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