import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AdCard from "../../components/AdCard/AdCard";
import "./HomePage.css";

interface Ad {
  id: number;
  title: string;
  content: string;
  price: number;
  city: string;
  created_at: string;
  category_name: string;
  image_path: string;
}

const ADS_PER_PAGE = 9;

export function HomePage() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const category = searchParams.get("category");

  useEffect(() => {
    const fetchAds = async () => {
      try {
        setLoading(true); 
        
        const url = category 
          ? `/api/posts?category=${category}`
          : "/api/posts";

        const response = await fetch(url);
        const data = await response.json();
        
        setAds(data);
        setCurrentPage(1);
      } catch (err) {
        console.error("Błąd pobierania:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, [category]);

  const totalPosts = ads?.length || 0;
  const totalPages = Math.ceil(totalPosts / ADS_PER_PAGE);
  const currentPosts = ads.slice(
    (currentPage - 1) * ADS_PER_PAGE,
    currentPage * ADS_PER_PAGE
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <div className="loader">Ładowanie ogłoszeń...</div>;

  return (
    <section className="home-page">
      <h2 className="home-page__title">
        {category ? `Ogłoszenia: ${category}` : "Najnowsze ogłoszenia"}
      </h2>
      
      <div className="posts-list">
        {currentPosts.length > 0 ? (
          currentPosts.map((p) => (
            <AdCard
              key={p.id}
              id={p.id}
              title={p.title}
              content={p.content}
              price={p.price}
              city={p.city}
              created_at={p.created_at}
              category={p.category_name}
              imageUrl={`/uploads/${p.image_path}`}
            />
          ))
        ) : (
          <p className="no-results">Brak ogłoszeń w tej kategorii.</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button 
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="pagination__btn"
          >
            Poprzednia
          </button>

          <div className="pagination__numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => handlePageChange(num)}
                className={`pagination__num ${currentPage === num ? "active" : ""}`}
              >
                {num}
              </button>
            ))}
          </div>

          <button 
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="pagination__btn"
          >
            Następna
          </button>
        </div>
      )}
    </section>
  );
}