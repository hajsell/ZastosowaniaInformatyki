import { Link } from "react-router-dom";
import "./Footer.css";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__grid">
          {/* Kolumna 1: Brand */}
          <div className="footer__section">
            <h4 className="footer__title">🚀 Serwis VibeMark</h4>
            <p className="footer__text">
              Najlepsze ogłoszenia w Twojej okolicy. Kupuj i sprzedawaj z nami!
            </p>
          </div>

          {/* Kolumna 2: Menu */}
          <div className="footer__section">
            <h4 className="footer__title">Pomoc</h4>
            <ul className="footer__links">
              <li><Link to="/">Pomoc i FAQ</Link></li>
              <li><Link to="/">Regulamin</Link></li>
              <li><Link to="/">Zasady bezpieczeństwa</Link></li>
            </ul>
          </div>

          {/* Kolumna 3: Kontakt */}
          <div className="footer__section">
            <h4 className="footer__title">Kontakt</h4>
            <ul className="footer__links">
              <li>Email: kontakt@prz.edu.pl</li>
              <li>Tel: +48 123 456 789</li>
              <li>Biuro: Rzeszów, Polska</li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; {currentYear} Serwis Ogłoszeniowy. Wszystkie prawa zastrzeżone.</p>
          <p className="footer__meta">Projekt MVP • Stack PERN</p>
        </div>
      </div>
    </footer>
  );
}