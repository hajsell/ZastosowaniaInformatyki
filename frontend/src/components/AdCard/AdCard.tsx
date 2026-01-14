import { Link } from "react-router-dom";
import "./AdCard.css";

interface AdCardProps {
  id: string | number;
  title: string;
  content: string;
  price: number;
  city: string;
  created_at: string;
  category: string;
  imageUrl: string;
}

const AdCard = ({
  id,
  title,
  content,
  price,
  city,
  created_at,
  category,
  imageUrl,
}: AdCardProps) => {
  const shortDescription = content.length > 100 
    ? content.substring(0, 100) + "..." 
    : content;

  const formattedDate = new Date(created_at).toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "short",
  });
  console.log(imageUrl)
  return (
    <div className="ad-card">
      <Link to={`/posts/${id}`} className="ad-card-link">
        <div className="ad-card-image-wrapper">
          <img src={imageUrl} alt={title} className="ad-card-image" />
          <span className="ad-card-category">{category}</span>
        </div>

        <div className="ad-card-content">
          <div className="ad-card-header">
            <h3 className="ad-card-title">{title}</h3>
            <p className="ad-card-price">{price.toLocaleString()} zł</p>
          </div>

          <p className="ad-card-description">{shortDescription}</p>

          <div className="ad-card-footer">
            <span className="ad-card-location">📍 {city}</span>
            <span className="ad-card-date">{formattedDate}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AdCard;