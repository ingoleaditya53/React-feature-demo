import React from 'react';

const ProductCard = ({ product, onBookmark }) => (
  <div className="col-3 mb-4">
    <div className="card">
      <img src={product.image} className="card-img-top" alt={product.title} />
      <div className="card-body">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text">${product.price}</p>
        <p className="card-text">Rating: {product.rating?.rate || 'N/A'}</p>
        <button
          className="btn btn-primary"
          onClick={() => onBookmark(product)}
        >
          Bookmark
        </button>
      </div>
    </div>
  </div>
);

export default ProductCard;
