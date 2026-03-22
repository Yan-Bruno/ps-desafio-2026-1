// ProductCard.tsx
import React from 'react';
import './productcard.css';

export interface ProductCardProps {
    name: string;
    category: string;
    price: number;
    rating: number;
    reviews: string;
    image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, category, price, rating, reviews, image }) => {
    return (
        <div className="product-card-v3">
            <div className="category-badge">{category}</div>

            <div className="card-image-wrapper">
                <img src={image} alt={name} className="product-img-v3" loading="lazy" />
            </div>

            <div className="card-info-v3">
                <h3 className="product-title-v3">{name}</h3>

                <div className="rating-row">
                    <span className="star-icon">★</span>
                    <span className="rating-text">{rating} ({reviews} Reviews)</span>
                    <span className="price-tag-v3">R$ {price.toFixed(2)}</span>
                </div>

                <div className="button-group-v3">
                    <button className="btn-secondary" aria-label="Add to cart">
                        Add to Cart
                    </button>
                    <button className="btn-primary" aria-label="Buy now">
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;