import { useEffect, useState } from "react";
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
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch("http://localhost:4000/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setAds(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Błąd pobierania ogłoszeń:", err);
        setLoading(false);
      });
  }, []);

  const totalPosts = ads?.length || 0; 
  const totalPages = Math.ceil(totalPosts / ADS_PER_PAGE);
  const indexOfLastPost = currentPage * ADS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - ADS_PER_PAGE;
  const currentPosts = ads.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  if (loading) return <div className="loader">Ładowanie ogłoszeń...</div>;

  return (
    <section className="home-page">
      <h2 className="home-page__title">Najnowsze ogłoszenia</h2>
      
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
              imageUrl={`http://localhost:4000/uploads/${p.image_path}`}
            />
          ))
        ) : (
          <p>Brak ogłoszeń do wyświetlenia.</p>
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
      )}
    </section>
  );
}