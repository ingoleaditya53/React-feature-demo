import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import ProductCard from './components/ProductCard';
import FilterBar from './components/FilterBar';
import SearchBar from './components/Search';
import SortBar from './components/Sorting';
import Bookmarked from './components/Bookmark';

const App = () => {
  const [products, setProducts] = useState([]);
  const [bookmarked, setBookmarked] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('');

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('https://fakestoreapi.com/products');
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  // Handle search term updates
  const handleSearch = (term) => setSearchTerm(term);

  // Handle category filter updates
  const handleFilter = (category) => setSelectedCategory(category);

  // Handle sorting updates
  const handleSort = (criteria) => setSortBy(criteria);

  // Handle bookmarking products
  const handleBookmark = (product) => {
    if (!bookmarked.some((item) => item.id === product.id)) {
      setBookmarked([...bookmarked, product]);
    }
  };

  // Filter and sort products
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
    <div className="App">
      <div className="container mt-4">
        <h1>Shopping Application</h1>
        {/* Search, Filter, and Sort Bars */}
        <SearchBar onSearch={handleSearch} />
        <FilterBar onFilter={handleFilter} />
        <SortBar onSort={handleSort} />

        {/* Product List */}
        <div className="row">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onBookmark={handleBookmark}
            />
          ))}
        </div>

        {/* Bookmarked Products */}
        <Bookmarked bookmarked={bookmarked} />
      </div>
    </div>
  );
};

export default App;
