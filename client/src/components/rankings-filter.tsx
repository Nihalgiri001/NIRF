import React, { useState, useEffect } from 'react';

function RankingsFilter({ onFilterChange }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    // Fetch available categories from the server
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        if (data.categories && data.categories.length > 0) {
          setCategories(data.categories);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2>Filter by Category</h2>
      <select 
        value={selectedCategory}
        onChange={(e) => {
          setSelectedCategory(e.target.value);
          onFilterChange({ category: e.target.value });
        }}
        className="w-full p-2 border rounded"
      >
        <option value="">All Categories</option>
        {categories.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
    </div>
  );
}

export default RankingsFilter;