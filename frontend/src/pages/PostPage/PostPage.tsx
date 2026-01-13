import { useParams, Link } from "react-router-dom";
import { POSTS } from "../../data/mockData";
import "./PostPage.css";

export function PostPage() {
  const { id } = useParams();

  const post = POSTS.find(p => p.id === Number(id));
  
  if (!post) return <div className="post-page">❌ Nie znaleziono ogłoszenia.</div>;

  return (
    <div className="post-page">
      <Link to="/" className="back-link">← Powrót do ogłoszeń</Link>
      
      <div className="post-container">
        <div className="post-main">
          <div className="post-gallery">
            <img src={post.imageUrl} alt={post.title} />
          </div>
          <div className="post-description">
            <h3>Opis</h3>
            <p>{post.description}</p>
          </div>
        </div>

        <aside className="post-sidebar">
          <div className="post-info-card">
            <span className="post-date">Dodano: {new Date(post.created_at).toLocaleDateString()}</span>
            <h1 className="post-title">{post.title}</h1>
            <div className="post-price">{post.price.toLocaleString()} zł</div>
            
            <button className="contact-btn">Zadzwoń / Napisz</button>
          </div>

          <div className="post-user-card">
            <h4>Sprzedający</h4>
            <div className="user-info">
              <div className="user-avatar-small">👤</div>
              <span>{post.user}</span>
            </div>
            <p className="user-location">📍 {post.location}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}