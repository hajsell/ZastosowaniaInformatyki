import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AdCard from "../../components/AdCard/AdCard";
import "./ProfilePage.css";

interface Post {
  id: number;
  title: string;
  content: string;
  price: number;
  city: string;
  created_at: string;
  category_name: string;
  images: string[] | null;
}

export function ProfilePage() {
  const [myPosts, setMyPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || '{}');
  const token = localStorage.getItem("token");

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }, [navigate]);

  const fetchMyPosts = useCallback(async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("/api/posts/my-posts", {
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setMyPosts(Array.isArray(data) ? data : []);
      } else if (response.status === 401 || response.status === 403) {
        handleLogout();
      }
    } catch (err) {
      console.error("Błąd pobierania postów:", err);
    } finally {
      setLoading(false);
    }
  }, [token, navigate, handleLogout]);

  const handleDelete = async (postId: number) => {
    if (!window.confirm("Czy na pewno chcesz usunąć to ogłoszenie?")) return;

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (response.ok) {
        setMyPosts(prev => prev.filter(post => post.id !== postId));
      } else {
        alert("Błąd podczas usuwania");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, [fetchMyPosts]);

  if (loading) return <div className="loader">Ładowanie profilu...</div>;

  return (
    <div className="profile-container">
      <div className="profile-layout">
        <aside className="profile-sidebar">
          <div className="profile-card">
            <div className="profile-avatar-large">👤</div>
            <h2>{user.name || "Użytkownik"}</h2>
            <p className="profile-meta">Konto aktywne</p>
            <div className="profile-details">
              <div className="detail-item">
                <span>Email:</span>
                <strong>{user.email || "-"}</strong>
              </div>
            </div>
            <button className="edit-profile-btn">Edytuj dane</button>
            <button className="logout-btn-link" onClick={handleLogout}>Wyloguj się</button>
          </div>
        </aside>

        <main className="profile-main">
          <div className="section-header">
            <h3>Moje ogłoszenia ({myPosts.length})</h3>
            <button className="add-shortcut-btn" onClick={() => navigate('/add')}>+ Dodaj nowe</button>
          </div>

          <div className="my-posts-grid">
            {myPosts.length > 0 ? (
              myPosts.map(post => (
                <div key={post.id} className="profile-post-wrapper">
                  <AdCard 
                    id={post.id}
                    title={post.title}
                    content={post.content}
                    price={post.price}
                    city={post.city} 
                    created_at={post.created_at}
                    category={post.category_name}
                    imageUrl={post.images && post.images.length > 0 
                      ? `/uploads/${post.images[0]}` 
                      : '/default-placeholder.png'}
                  />
                  <div className="post-actions">
                    <button 
                      className="action-btn edit" 
                      onClick={() => navigate(`/edit/${post.id}`)}
                    >
                      Edytuj
                    </button>
                    <button 
                      className="action-btn delete" 
                      onClick={() => handleDelete(post.id)}
                    >
                      Usuń
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state"><p>Nie masz jeszcze żadnych ogłoszeń.</p></div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}