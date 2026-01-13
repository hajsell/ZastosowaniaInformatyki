import { useState } from "react";
import { Link } from "react-router-dom";
import "../Auth.css";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logowanie:", { email, password });
    // Tutaj później dodasz logikę API
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Zaloguj się</h2>
        <div className="auth-field">
          <label>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Twój adres email"
            required 
          />
        </div>
        <div className="auth-field">
          <label>Hasło</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Min. 6 znaków"
            required 
          />
        </div>
        <button type="submit" className="auth-btn">Zaloguj</button>
        <p className="auth-switch">
          Nie masz konta? <Link to="/register">Zarejestruj się</Link>
        </p>
      </form>
    </div>
  );
}