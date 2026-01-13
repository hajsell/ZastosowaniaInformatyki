import { useState } from "react";
import AdCard from "../../components/AdCard/AdCard";
import "./HomePage.css";

type PostListItem = {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  created_at: string;
  category: string;
  imageUrl: string;
};

const POSTS: PostListItem[] = [
  { 
    id: 1, 
    title: "Rower górski Kross Hexagon", 
    description: "Sprzedam rower w dobrym stanie, mało używany. Serwisowany co sezon, nowe opony.", 
    price: 1200, 
    location: "Kraków", 
    category: "Motoryzacja", 
    imageUrl: "/assets/rower.jfif", 
    created_at: "2026-01-07T10:00:00Z" 
  },
  { 
    id: 2, 
    title: "Kanapa", 
    description: "Oddam za darmo. Odbiór osobisty.", 
    price: 0, 
    location: "Warszawa", 
    category: "Dom i Ogród", 
    imageUrl: "/assets/sofa.jfif", 
    created_at: "2026-01-06T18:30:00Z" 
  },
  { 
    id: 3, 
    title: "MacBook Pro 14 M2", 
    description: "Idealny stan, 16GB RAM.", 
    price: 8500, 
    location: "Gdańsk", 
    category: "Elektronika", 
    imageUrl: "/assets/macbook.jpg", 
    created_at: "2026-01-05T09:15:00Z" 
  },
  { 
    id: 4, 
    title: "Konsola PS5 + 2 pady", 
    description: "Wersja z napędem, mało używana.", 
    price: 1900, 
    location: "Wrocław", 
    category: "Elektronika", 
    imageUrl: "/assets/ps5.jpg", 
    created_at: "2026-01-04T12:00:00Z" 
  },
  { 
    id: 5, 
    title: "Stół dębowy do jadalni", 
    description: "Solidny stół, rozkładany do 240cm.", 
    price: 1500, 
    location: "Poznań", 
    category: "Dom i Ogród", 
    imageUrl: "/assets/stol.png", 
    created_at: "2026-01-03T15:00:00Z" 
  },
  { 
    id: 6, 
    title: "Opony zimowe 205/55R16", 
    description: "Komplet 4 sztuk, bieżnik 7mm.", 
    price: 600, 
    location: "Lublin", 
    category: "Motoryzacja", 
    imageUrl: "/assets/opony.jpg", 
    created_at: "2026-01-02T09:00:00Z" 
  },
  { 
    id: 7, 
    title: "Zestaw narzędzi Makita", 
    description: "Wiertarka, szlifierka, 2 akumulatory.", 
    price: 1100, 
    location: "Szczecin", 
    category: "Dom i Ogród", 
    imageUrl: "/assets/makita.jpg",
    created_at: "2026-01-01T11:00:00Z" 
  },
  { 
    id: 8, 
    title: "iPhone 13 128GB Blue", 
    description: "Bez rys, kondycja baterii 90%.", 
    price: 2300, 
    location: "Katowice", 
    category: "Elektronika", 
    imageUrl: "/assets/iphone.jpg", 
    created_at: "2025-12-30T20:00:00Z" 
  },
  { 
    id: 9, 
    title: "Kurtka skórzana męska L", 
    description: "Nowa z metką, czarna.", 
    price: 450, 
    location: "Rzeszów", 
    category: "Moda", 
    imageUrl: "/assets/kurtka.webp", 
    created_at: "2025-12-28T14:00:00Z" 
  },
  { 
    id: 10, 
    title: "Książki", 
    description: "Zestaw 3 książek, stan idealny.", 
    price: 120, 
    location: "Białystok", 
    category: "Inne", 
    imageUrl: "/assets/ksiazki.webp", 
    created_at: "2025-12-27T10:00:00Z" 
  },
  { 
    id: 11, 
    title: "Monitor 27 cali 4K", 
    description: "Matryca IPS, idealny dla grafika.", 
    price: 1400, 
    location: "Łódź", 
    category: "Elektronika", 
    imageUrl: "/assets/monitor.webp", 
    created_at: "2025-12-26T18:00:00Z" 
  },
  { 
    id: 12, 
    title: "Namiot 3-osobowy", 
    description: "Użyty raz na wyjeździe, kompletny.", 
    price: 300, 
    location: "Gdynia", 
    category: "Sport", 
    imageUrl: "/assets/namiot.jpg", 
    created_at: "2025-12-25T12:00:00Z" 
  },
];

const ADS_PER_PAGE = 9;

export function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(POSTS.length / ADS_PER_PAGE);
  const indexOfLastPost = currentPage * ADS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - ADS_PER_PAGE;
  const currentPosts = POSTS.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  return (
    <section className="home-page">
      <h2 className="home-page__title">Najnowsze ogłoszenia</h2>
      
      <div className="posts-list">
        {currentPosts.map((p) => (
          <AdCard
            key={p.id}
            id={p.id}
            title={p.title}
            description={p.description}
            price={p.price}
            location={p.location}
            createdAt={p.created_at}
            category={p.category}
            imageUrl={p.imageUrl}
          />
        ))}
      </div>

      {/* Kontener paginacji */}
      <div className="pagination">
        <button 
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="pagination__btn"
        >
          Poprzednia
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => handlePageChange(num)}
            className={`pagination__num ${currentPage === num ? "active" : ""}`}
          >
            {num}
          </button>
        ))}

        <button 
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="pagination__btn"
        >
          Następna
        </button>
      </div>
    </section>
  );
}