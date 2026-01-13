import { useState } from "react";
import { Link } from "react-router-dom";
import "../Auth.css";

export function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Hasła nie są identyczne!");
      return;
    }
    console.log("Rejestracja:", formData);
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Załóż konto</h2>
        <div className="auth-field">
          <label>Email</label>
          <input 
            type="email" 
            required 
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>
        <div className="auth-field">
          <label>Hasło</label>
          <input 
            type="password" 
            required 
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
        </div>
        <div className="auth-field">
          <label>Powtórz hasło</label>
          <input 
            type="password" 
            required 
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
          />
        </div>
        <button type="submit" className="auth-btn">Zarejestruj</button>
        <p className="auth-switch">
          Masz już konto? <Link to="/login">Zaloguj się</Link>
        </p>
      </form>
    </div>
  );
}