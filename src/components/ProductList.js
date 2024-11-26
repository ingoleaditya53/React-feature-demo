import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './Search';
import SortBar from './Sorting';
import ProductCard from './ProductCard';
import FilterBar from './FilterBar';

const ProductList = ({ setBookmarked, bookmarked }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('https://fakestoreapi.com/products');
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilter = (category) => {
    setSelectedCategory(category);
  };

  const handleSort = (criteria) => {
    setSortBy(criteria);
  };

  const handleBookmark = (product) => {
    if (!bookmarked.some((item) => item.id === product.id)) {
      setBookmarked([...bookmarked, product]);
    }
  };

  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (product) =>
        selectedCategory === 'all' || product.category === selectedCategory
    )
    .sort((a, b) =>
      sortBy === 'price'
        ? a.price - b.price
        : sortBy === 'rating'
        ? b.rating.rate - a.rating.rate
        : 0
    );

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <FilterBar onFilter={handleFilter} />
      <SortBar onSort={handleSort} />
      <div className="row">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onBookmark={handleBookmark}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
