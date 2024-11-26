import React from 'react';

const SortBar = ({ onSort }) => {
  const handleSortChange = (e) => {
    onSort(e.target.value);
  };

  return (
    <div className="mb-3">
      <select className="form-control" onChange={handleSortChange}>
        <option value="">Sort By</option>
        <option value="price">Price</option>
        <option value="rating">Rating</option>
      </select>
    </div>
  );
};

export default SortBar;
