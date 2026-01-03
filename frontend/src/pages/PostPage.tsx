import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useParams, Link } from "react-router-dom";
import { addComment, getComments, getPost } from "../api/posts";
import type { Comment, Post } from "../api/posts";

export function PostPage() {
  const { id } = useParams();
  const postId = Number(id);
  const isValidId = Number.isFinite(postId);

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [newComment, setNewComment] = useState("");
  const [fetchError, setFetchError] = useState<string | null>(null);

  const validationError = !isValidId ? "Niepoprawne ID posta." : null;

  const activeError = validationError || fetchError;

  useEffect(() => {
    if (!isValidId) return;

    let alive = true;

    (async () => {
      try {
        setFetchError(null);
        const [p, c] = await Promise.all([
          getPost(postId),
          getComments(postId),
        ]);
        if (!alive) return;
        setPost(p);
        setComments(c);
      } catch (e: unknown) {
        if (!alive) return;

        if (e instanceof Error) {
            setFetchError(e.message);
        } else {
            setFetchError("Wystąpił nieoczekiwany błąd.");
        }
    }
    })();

    return () => { alive = false; };
  }, [postId, isValidId]);

  if (activeError) {
    return (
      <div>
        <Link to="/">← Wróć</Link>
        <p>❌ {activeError}</p>
      </div>
    );
  }

  if (!post || !comments) {
    return <div>Ładowanie…</div>;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!newComment.trim()) return;

    const created = await addComment(postId, newComment.trim());
    setComments((prev) => (prev ? [...prev, created] : [created]));
    setNewComment("");
  }

  return (
    <div>
      <Link to="/">← Wróć</Link>

      <h2>{post.title}</h2>
      <div style={{ opacity: 0.7, fontSize: 12 }}>
        {new Date(post.created_at).toLocaleString()} • {post.tag}
      </div>

      <p>{post.content}</p>

      <hr />

      <h3>Komentarze ({comments.length})</h3>

      {comments.length === 0 ? (
        <p style={{ opacity: 0.7 }}>Brak komentarzy.</p>
      ) : (
        <ul>
          {comments.map((c) => (
            <li key={c.id}>
              {c.content}
              <div style={{ fontSize: 12, opacity: 0.6 }}>
                {new Date(c.created_at).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={onSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit">Dodaj komentarz</button>
      </form>
    </div>
  );
}
