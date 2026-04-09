'use client';

import React, { useState, useEffect } from 'react';
import './productcard.css';

export interface SportProduct {
    id: string;
    name: string;
    marca: string;
    price: number;
    anoLancamento: number;
    imagem: string;
    categoria: string;
    quantidade_estoque: number;
}

interface ProductCardProps {
    product: SportProduct;
    onBuy: (productId: string) => Promise<boolean>;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onBuy }) => {
    const [isBuying, setIsBuying] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [currentStock, setCurrentStock] = useState(product.quantidade_estoque);

    useEffect(() => {
        setCurrentStock(product.quantidade_estoque);
    }, [product.quantidade_estoque]);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price);
    };

    const handleBuyClick = async () => {
        if (currentStock === 0 || isBuying) return;

        setIsBuying(true);
        try {
            const success = await onBuy(product.id);
            if (success) {
                setCurrentStock(prev => prev - 1);
                setShowPopup(true);
                setTimeout(() => setShowPopup(false), 2000);
            }
        } catch (error) {
            console.error('Erro ao comprar produto:', error);
        } finally {
            setIsBuying(false);
        }
    };

    const fallbackImage = '/assets/imagens/tenis.jpg';
    const isOutOfStock = currentStock === 0;
    const isLowStock = currentStock > 0 && currentStock < 5;

    return (
        <>
            <div className={`product-card-v3 ${isOutOfStock ? 'out-of-stock' : ''}`}>
                <div className="category-badge">{product.categoria}</div>

                {isLowStock && !isOutOfStock && (
                    <div className="low-stock-badge">
                        <i className="fas fa-exclamation-triangle"></i>
                        Últimas {currentStock} unid.
                    </div>
                )}

                {isOutOfStock && (
                    <div className="out-of-stock-badge">
                        ESGOTADO
                    </div>
                )}

                <div className="card-image-wrapper">
                    <img
                        src={imageError ? fallbackImage : product.imagem}
                        alt={product.name}
                        className="product-img-v3"
                        loading="lazy"
                        onError={() => setImageError(true)}
                    />
                </div>

                <div className="card-info-v3">
                    <div className="brand-row">
                        <span className="brand-name">{product.marca}</span>
                        <span className="year-badge">{product.anoLancamento}</span>
                    </div>

                    <h3 className="product-title-v3">{product.name}</h3>

                    <div className="rating-row">
                        <span className="star-icon">★</span>
                        <span className="rating-text">4.5 (128 Reviews)</span>
                        <span className="price-tag-v3">{formatPrice(product.price)}</span>
                    </div>

                    <div className="stock-info">
                        <div className="stock-bar-container">
                            <div
                                className={`stock-bar ${isLowStock ? 'low' : isOutOfStock ? 'out' : 'normal'}`}
                                style={{ width: `${Math.min((currentStock / 50) * 100, 100)}%` }}
                            ></div>
                        </div>
                        <span className={`stock-text ${isLowStock ? 'warning' : isOutOfStock ? 'danger' : ''}`}>
                            {isOutOfStock ? 'Indisponível' : `${currentStock} em estoque`}
                        </span>
                    </div>

                    <div className="button-group-v3">
                        <button className="btn-secondary" aria-label="Add to cart">
                            <i className="fas fa-shopping-cart"></i>
                            Carrinho
                        </button>
                        <button
                            className={`btn-primary ${isOutOfStock || isBuying ? 'disabled' : ''}`}
                            aria-label="Buy now"
                            onClick={handleBuyClick}
                            disabled={isOutOfStock || isBuying}
                        >
                            {isBuying ? (
                                <>
                                    <i className="fas fa-spinner fa-spin"></i>
                                    <span>...</span>
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-bolt"></i>
                                    <span>COMPRAR</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {showPopup && (
                <div className="success-popup">
                    <i className="fas fa-check-circle"></i>
                    <span>Compra realizada com sucesso!</span>
                </div>
            )}
        </>
    );
};

export default ProductCard;