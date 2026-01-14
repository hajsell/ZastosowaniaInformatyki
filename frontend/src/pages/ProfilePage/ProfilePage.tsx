import { POSTS } from "../../data/mockData";
import AdCard from "../../components/AdCard/AdCard";
import "./ProfilePage.css";

export function ProfilePage() {
  const user = {
    name: "Tester",
    email: "test@test.pl",
    phone: "123 456 789",
    joined: "styczeń 2026",
    avatar: "👤"
  };

  const myPosts = POSTS.filter(post => post.id === 1 || post.id === 2);

  return (
    <div className="profile-container">
      <div className="profile-layout">
        
        <aside className="profile-sidebar">
          <div className="profile-card">
            <div className="profile-avatar-large">{user.avatar}</div>
            <h2>{user.name}</h2>
            <p className="profile-meta">Na portalu od: {user.joined}</p>
            
            <div className="profile-details">
              <div className="detail-item">
                <span>Email:</span>
                <strong>{user.email}</strong>
              </div>
              <div className="detail-item">
                <span>Telefon:</span>
                <strong>{user.phone}</strong>
              </div>
            </div>
            
            <button className="edit-profile-btn">Edytuj dane</button>
            <button className="logout-btn-link">Wyloguj się</button>
          </div>
        </aside>

        <main className="profile-main">
          <div className="section-header">
            <h3>Moje ogłoszenia ({myPosts.length})</h3>
            <button className="add-shortcut-btn">+ Dodaj nowe</button>
          </div>

          <div className="my-posts-grid">
            {myPosts.length > 0 ? (
              myPosts.map(post => (
                <div key={post.id} className="profile-post-wrapper">
                  <AdCard {...post} />
                  <div className="post-actions">
                    <button className="action-btn edit">Edytuj</button>
                    <button className="action-btn delete">Usuń</button>
                  </div>
                </div>
              ))
            ) : (
              <p className="empty-state">Nie masz jeszcze żadnych ogłoszeń.</p>
            )}
          </div>
        </main>
        
      </div>
    </div>
  );
}