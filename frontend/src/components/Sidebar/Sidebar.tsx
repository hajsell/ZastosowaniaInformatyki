import { useState } from "react";
import "./Sidebar.css";

interface Category {
  id: string;
  name: string;
  icon: string;
  count?: number;
}

const CATEGORIES: Category[] = [
  { id: "all", name: "Wszystkie ogłoszenia", icon: "📋" },
  { id: "motoryzacja", name: "Motoryzacja", icon: "🚗", count: 124 },
  { id: "nieruchomosci", name: "Nieruchomości", icon: "🏠", count: 89 },
  { id: "praca", name: "Praca", icon: "💼", count: 215 },
  { id: "dom-ogrod", name: "Dom i Ogród", icon: "🌳", count: 56 },
  { id: "elektronika", name: "Elektronika", icon: "💻", count: 312 },
];

export function Sidebar() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  return (
    <aside className="sidebar">
      <div className="sidebar-search">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Szukaj ogłoszeń..." 
            className="search-input"
          />
        </div>
      </div>

      <h3 className="sidebar-title">Kategorie</h3>
      
      <nav>
        <ul className="category-list">
          {CATEGORIES.map((cat) => (
            <li key={cat.id}>
              <button
                className={`category-button ${activeCategory === cat.id ? "active" : ""}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span className="category-info">
                  <span className="category-icon">{cat.icon}</span>
                  {cat.name}
                </span>
                
                {cat.count !== undefined && (
                  <span className="category-count">({cat.count})</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-divider" />

      <div className="extra-filters">
        <h4>Szybkie filtry</h4>
        <label className="filter-label">
          <input type="checkbox" /> Tylko ze zdjęciem
        </label>
        <label className="filter-label">
          <input type="checkbox" /> Przesyłka OLX
        </label>
      </div>
    </aside>
  );
}