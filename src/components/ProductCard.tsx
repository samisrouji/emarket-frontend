import React from "react";
import "./ProductCard.css";

interface ProductCardProps {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
  onAdd?: () => void;
  onRemove?: () => void;
  quantity?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, imageUrl, onAdd, onRemove, quantity = 0 }) => {
  return (
    <div className="product-card">
      <img src={imageUrl} alt={name}/>
      <h3>{name}</h3>
      <p>{price}</p>
      <div className="card-actions">
        <button className="add-button" onClick={onAdd} aria-label={`Add ${name} to cart`}>+</button>
        <span className="quantity">{quantity}</span>
        <button className="remove-button" onClick={onRemove} aria-label={`Remove ${name} from cart`} disabled={quantity <= 0}>-</button>
      </div>
    </div>
  );
};
