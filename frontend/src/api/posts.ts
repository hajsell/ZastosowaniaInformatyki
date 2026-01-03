import { apiFetch } from "./client";

export type PostListItem = {
  id: number;
  title: string;
  tag: string;
  created_at: string;
};

export type Post = PostListItem & {
  content: string;
};

export type Comment = {
  id: number;
  post_id: number;
  content: string;
  created_at: string;
};

export function getPosts() {
  return apiFetch<PostListItem[]>("/api/posts");
}

export function getPost(id: number) {
  return apiFetch<Post>(`/api/posts/${id}`);
}

export function getComments(postId: number) {
  return apiFetch<Comment[]>(`/api/posts/${postId}/comments`);
}

export function addComment(postId: number, content: string) {
  return apiFetch<Comment>(`/api/posts/${postId}/comments`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });
}
