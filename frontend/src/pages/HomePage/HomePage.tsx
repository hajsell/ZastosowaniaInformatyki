import { useState } from "react";
import AdCard from "../../components/AdCard/AdCard";
import { POSTS } from "../../data/mockData";
import "./HomePage.css";

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