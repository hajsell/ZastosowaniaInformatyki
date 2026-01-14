import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import * as LucideIcons from "lucide-react";
import "./Sidebar.css";

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
}

export function Sidebar() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchParams] = useSearchParams();
  
  const currentCategorySlug = searchParams.get("category") || "wszystko";

  useEffect(() => {
    fetch("api/posts/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Błąd kategorii:", err));
  }, []);

  return (
    <aside className="sidebar">
      <h3 className="sidebar-title">Kategorie</h3>
      
      <div className="sidebar-search">
        <div className="search-input-wrapper">
          <LucideIcons.Search className="search-icon" size={16} />
          <input type="text" className="search-input" placeholder="Szukaj kategorii..." />
        </div>
      </div>

      <nav className="sidebar__nav">
        <ul className="category-list">
          <li>
            <Link 
              to="/" 
              className={`category-button ${currentCategorySlug === "wszystko" ? 'active' : ''}`}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <LucideIcons.LayoutGrid size={20} className="category-icon" />
                <span>Wszystkie ogłoszenia</span>
              </div>
            </Link>
          </li>

          {categories.map((cat) => {
            const IconName = cat.icon
              .split('-')
              .map(part => part.charAt(0).toUpperCase() + part.slice(1))
              .join('') as keyof typeof LucideIcons;

            const Icon = (LucideIcons[IconName] as LucideIcons.LucideIcon) || LucideIcons.HelpCircle;
            const isActive = currentCategorySlug === cat.slug;

            return (
              <li key={cat.id}>
                <Link 
                  to={`/?category=${cat.slug}`} 
                  className={`category-button ${isActive ? 'active' : ''}`}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Icon size={20} className="category-icon" />
                    <span>{cat.name}</span>
                  </div>
                  <span className="category-count"></span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}