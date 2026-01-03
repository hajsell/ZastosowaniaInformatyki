import { apiFetch } from "./client";

export type SidebarItem = {
  id: number;
  type: "phone" | "faq" | "link";
  label: string;
  value: string;
  sort_order: number;
};

export function getSidebar() {
  return apiFetch<SidebarItem[]>("/api/sidebar");
}
