import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Auth.css";

export function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Hasła nie są identyczne!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone_number: formData.phone
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Konto założone! Możesz się teraz zalogować.");
        navigate("/login");
      } else {
        alert(data.message || "Błąd rejestracji");
      }
    } catch (err) {
      console.error(err);
      alert("Błąd połączenia z serwerem");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Załóż konto</h2>
        <div className="auth-field">
          <label>Nazwa</label>
          <input 
            type="text" 
            required 
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div className="auth-field">
          <label>Email</label>
          <input 
            type="email" 
            required 
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>
        <div className="auth-field">
          <label>Numer telefonu (opcjonalnie)</label>
          <input 
            type="tel" 
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
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
        <button type="submit" className="auth-btn" disabled={loading}>
          {loading ? "Rejestrowanie..." : "Zarejestruj"}
        </button>
        <p className="auth-switch">
          Masz już konto? <Link to="/login">Zaloguj się</Link>
        </p>
      </form>
    </div>
  );
}