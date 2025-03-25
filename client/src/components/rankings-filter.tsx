import React, { useState, useEffect } from 'react';

function RankingsFilter() {
  const [categories, setCategories] = useState(["Overall", "Engineering", "Management"]);

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
      <select>
        {categories.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
    </div>
  );
}

export default RankingsFilter;