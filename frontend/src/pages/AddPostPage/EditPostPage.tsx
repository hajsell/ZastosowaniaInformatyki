import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AddPostPage.css";

interface Category {
  id: number;
  name: string;
}

export function AddPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [categories, setCategories] = useState<Category[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    city: "",
    content: "",
  });

  useEffect(() => {
    fetch("/api/posts/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Błąd kategorii:", err));

    if (isEditMode) {
      fetch(`/api/posts/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setFormData({
            title: data.title || "",
            category: data.category_id ? data.category_id.toString() : "",
            price: data.price || "",
            city: data.city || "",
            content: data.content || "",
          });
          setExistingImages(data.images || []);
        })
        .catch((err) => console.error("Błąd pobierania ogłoszenia:", err));
    }
  }, [id, isEditMode]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewImages([...newImages, ...Array.from(e.target.files)]);
    }
  };

  const removeNewImage = (index: number) => {
    setNewImages(newImages.filter((_, i) => i !== index));
  };

  const removeExistingImage = (imgName: string) => {
    setExistingImages(existingImages.filter((img) => img !== imgName));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("category_id", formData.category);
    data.append("price", formData.price);
    data.append("city", formData.city);
    data.append("content", formData.content);
    
    if (isEditMode) {
      data.append("existingImages", JSON.stringify(existingImages));
    }

    newImages.forEach((file) => {
      data.append("images", file);
    });

    try {
      const url = isEditMode ? `/api/posts/${id}` : "/api/posts";
      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      });

      if (response.ok) navigate("/profile");
      else alert(isEditMode ? "Błąd aktualizacji" : "Błąd dodawania");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-post-container">
      <form className="add-post-card" onSubmit={handleSubmit}>
        <h2>{isEditMode ? "Edytuj ogłoszenie" : "Dodaj nowe ogłoszenie"}</h2>

        <div className="add-post-field">
          <label>Tytuł ogłoszenia</label>
          <input
            type="text"
            required
            disabled={loading}
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        <div className="add-post-row">
          <div className="add-post-field">
            <label>Kategoria</label>
            <select
              required
              disabled={loading}
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="">Wybierz kategorię</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="add-post-field">
            <label>Cena (zł)</label>
            <input
              type="number"
              required
              disabled={loading}
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
          </div>
        </div>

        <div className="add-post-field">
          <label>Lokalizacja (Miasto)</label>
          <input
            type="text"
            required
            disabled={loading}
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
        </div>

        <div className="add-post-field">
          <label>Opis ogłoszenia</label>
          <textarea
            rows={6}
            required
            disabled={loading}
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          ></textarea>
        </div>

        <div className="add-post-field">
          <label>Zdjęcia</label>
          <div className="image-management-grid">
            {existingImages.map((img) => (
              <div key={img} className="image-preview-item">
                <img src={`/uploads/${img}`} alt="Podgląd" />
                <button type="button" className="remove-img-btn" onClick={() => removeExistingImage(img)}>×</button>
              </div>
            ))}
            
            {newImages.map((file, index) => (
              <div key={index} className="image-preview-item new-upload">
                <img src={URL.createObjectURL(file)} alt="Nowe" />
                <button type="button" className="remove-img-btn" onClick={() => removeNewImage(index)}>×</button>
              </div>
            ))}

            <label className="image-upload-placeholder">
              <span>+ Dodaj</span>
              <input type="file" multiple accept="image/*" onChange={handleFileChange} hidden />
            </label>
          </div>
        </div>

        <button type="submit" className="add-post-btn" disabled={loading}>
          {loading ? "Przetwarzanie..." : isEditMode ? "Zapisz zmiany" : "Opublikuj ogłoszenie"}
        </button>
      </form>
    </div>
  );
}