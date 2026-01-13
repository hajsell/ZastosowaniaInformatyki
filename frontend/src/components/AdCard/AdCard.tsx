import { Link } from "react-router-dom";
import "./AdCard.css";

interface AdCardProps {
  id: string | number;
  title: string;
  description: string;
  price: number;
  location: string;
  createdAt: string;
  category: string;
  imageUrl: string;
}

const AdCard = ({
  id,
  title,
  description,
  price,
  location,
  createdAt,
  category,
  imageUrl,
}: AdCardProps) => {
  const shortDescription = description.length > 100 
    ? description.substring(0, 100) + "..." 
    : description;

  const formattedDate = new Date(createdAt).toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "short",
  });

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
            <span className="ad-card-location">📍 {location}</span>
            <span className="ad-card-date">{formattedDate}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AdCard;