import { useEffect, useState } from "react";
import { getSidebar } from "../../api/sidebar";
import type { SidebarItem } from "../../api/sidebar";

export function Sidebar() {
  const [items, setItems] = useState<SidebarItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getSidebar()
      .then(setItems)
      .catch((e) => setError(e.message));
  }, []);

  if (error) return <div>❌ Sidebar error: {error}</div>;
  if (!items) return <div>Ładowanie sidebara…</div>;

  const phones = items.filter((i) => i.type === "phone");
  const faqs = items.filter((i) => i.type === "faq");
  const links = items.filter((i) => i.type === "link");

  return (
    <div>
      <h3 style={{ marginTop: 0 }}>Ważne numery</h3>
      <ul>
        {phones.map((p) => (
          <li key={p.id}>
            <strong>{p.label}:</strong> {p.value}
          </li>
        ))}
      </ul>

      <h3>FAQ</h3>
      <ul>
        {faqs.map((f) => (
          <li key={f.id}>
            <strong>{f.label}</strong>
            <div style={{ opacity: 0.8 }}>{f.value}</div>
          </li>
        ))}
      </ul>

      <h3>Linki</h3>
      <ul>
        {links.map((l) => (
          <li key={l.id}>
            <a href={l.value} target="_blank" rel="noreferrer">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
