import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./PostPage.css";

interface PostDetails {
  id: number;
  title: string;
  content: string;
  price: number;
  city: string;
  created_at: string;
  category_name: string;
  author_name: string;
  author_email: string;
  author_phone: string;
  images: string[] | null;
}

export function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState<PostDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/posts/${id}`);
        
        if (!response.ok) {
          throw new Error("Nie znaleziono ogłoszenia");
        }

        const data = await response.json();
        setPost(data);
        if (data.images && data.images.length > 0) {
          setActiveImage(data.images[0]);
        }
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPost();
  }, [id]);

  if (loading) return <div className="post-page"><div className="loader">Ładowanie ogłoszenia...</div></div>;
  
  if (error || !post) return (
    <div className="post-page">
      <div className="error-container">
        <p>❌ Nie znaleziono ogłoszenia.</p>
        <Link to="/" className="back-link">Powrót do strony głównej</Link>
      </div>
    </div>
  );

  return (
    <div className="post-page">
      <Link to="/" className="back-link">← Powrót do ogłoszeń</Link>
      
      <div className="post-container">
        <div className="post-main">
          <div className="post-gallery">
            <div className="main-image-wrapper">
              <img 
                src={activeImage ? `/uploads/${activeImage}` : '/default-placeholder.png'} 
                alt={post.title} 
              />
            </div>
            
            {post.images && post.images.length > 1 && (
              <div className="thumbnails-grid">
                {post.images.map((img, idx) => (
                  <div 
                    key={idx} 
                    className={`thumbnail ${activeImage === img ? 'active' : ''}`}
                    onClick={() => setActiveImage(img)}
                  >
                    <img src={`/uploads/${img}`} alt={`${post.title} - ${idx + 1}`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="post-description">
            <h3>Opis</h3>
            <p>{post.content}</p>
          </div>
        </div>

        <aside className="post-sidebar">
          <div className="post-info-card">
            <span className="post-date">
              Dodano: {new Date(post.created_at).toLocaleDateString()}
            </span>
            <h1 className="post-title">{post.title}</h1>
            <div className="post-price">
              {Number(post.price).toLocaleString()} zł
            </div>
            
            <div className="contact-methods">
              <button className="contact-btn message">Napisz wiadomość</button>
              
              {post.author_phone ? (
                <div className="phone-wrapper">
                  <a 
                    href={`tel:${post.author_phone}`} 
                    className="contact-btn phone"
                    onClick={(e) => {
                      if (window.innerWidth > 900) {
                        e.preventDefault();
                      }
                    }}
                  >
                    📞 {post.author_phone}
                  </a>
                </div>
              ) : (
                <p className="no-phone">Użytkownik nie podał telefonu</p>
              )}
            </div>
          </div>

          <div className="post-user-card">
            <h4>Sprzedający</h4>
            <div className="user-info">
              <div className="user-avatar-small">👤</div>
              <span>{post.author_name}</span>
            </div>
            <p className="user-location">📍 {post.city}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}