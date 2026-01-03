import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../api/posts";
import type { PostListItem } from "../api/posts";

const TAGS = ["zgubione", "hałas", "polecajki", "wydarzenia", "pytanie", "ostrzeżenie"];

export function HomePage() {
  const [posts, setPosts] = useState<PostListItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tag, setTag] = useState<string>("");

  useEffect(() => {
    getPosts()
      .then(setPosts)
      .catch((e) => setError(e.message));
  }, []);

  const filtered = useMemo(() => {
    if (!posts) return [];
    return tag ? posts.filter((p) => p.tag === tag) : posts;
  }, [posts, tag]);

  if (error) return <div>❌ Błąd: {error}</div>;
  if (!posts) return <div>Ładowanie postów…</div>;

  return (
    <div>
      <h2 style={{ marginTop: 0 }}>Najnowsze ogłoszenia</h2>

      <div style={{ marginBottom: 12, display: "flex", gap: 8, alignItems: "center" }}>
        <label>Filtr tag:</label>
        <select value={tag} onChange={(e) => setTag(e.target.value)}>
          <option value="">Wszystkie</option>
          {TAGS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
        {filtered.map((p) => (
          <li key={p.id} style={{ border: "1px solid #eee", borderRadius: 12, padding: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <Link to={`/posts/${p.id}`} style={{ fontWeight: 700, textDecoration: "none" }}>
                {p.title}
              </Link>
              <span style={{ fontSize: 12, opacity: 0.7 }}>{new Date(p.created_at).toLocaleString()}</span>
            </div>
            <div style={{ marginTop: 6, fontSize: 12, opacity: 0.8 }}>Tag: {p.tag}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
