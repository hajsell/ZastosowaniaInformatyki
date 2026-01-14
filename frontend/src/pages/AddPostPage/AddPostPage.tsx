import { useState } from "react";
import "./AddPostPage.css";

export function AddPostPage() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    city: "",
    content: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dane nowego ogłoszenia:", formData);
    // Tutaj w przyszłości dodamy wysyłkę do API (FormData)
  };

  return (
    <div className="add-post-container">
      <form className="add-post-card" onSubmit={handleSubmit}>
        <h2>Dodaj nowe ogłoszenie</h2>
        
        <div className="add-post-field">
          <label>Tytuł ogłoszenia</label>
          <input 
            type="text" 
            placeholder="Np. iPhone 15 Pro, stan idealny"
            required
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
        </div>

        <div className="add-post-row">
          <div className="add-post-field">
            <label>Kategoria</label>
            <select 
              required
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option value="">Wybierz kategorię</option>
              <option value="1">Elektronika</option>
              <option value="2">Motoryzacja</option>
              <option value="3">Nieruchomości</option>
              <option value="4">Dom i Ogród</option>
              <option value="5">Moda</option>
            </select>
          </div>

          <div className="add-post-field">
            <label>Cena (zł)</label>
            <input 
              type="number" 
              placeholder="0.00"
              required
              onChange={(e) => setFormData({...formData, price: e.target.value})}
            />
          </div>
        </div>

        <div className="add-post-field">
          <label>Lokalizacja (Miasto)</label>
          <input 
            type="text" 
            placeholder="Np. Rzeszów"
            required
            onChange={(e) => setFormData({...formData, city: e.target.value})}
          />
        </div>

        <div className="add-post-field">
          <label>Opis ogłoszenia</label>
          <textarea 
            rows={6}
            placeholder="Opisz swój przedmiot..."
            required
            onChange={(e) => setFormData({...formData, content: e.target.value})}
          ></textarea>
        </div>

        <div className="add-post-field">
          <label>Dodaj zdjęcia</label>
          <input type="file" multiple accept="image/*" className="file-input" />
          <p className="file-hint">Możesz wybrać kilka zdjęć naraz.</p>
        </div>

        <button type="submit" className="add-post-btn">Opublikuj ogłoszenie</button>
      </form>
    </div>
  );
}