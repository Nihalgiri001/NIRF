
import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

function RankingsFilter({ onFilterChange }) {
  const [categories, setCategories] = useState([]);
  const [parameters, setParameters] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedParameter, setSelectedParameter] = useState('');

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

    // Fetch Excel sheet parameters
    fetch('/api/parameters')
      .then(res => res.json())
      .then(data => {
        if (data.parameters) {
          setParameters(data.parameters);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <div className="space-y-4">
      <div>
        <Label>Filter by Category</Label>
        <Select 
          value={selectedCategory}
          onValueChange={(value) => {
            setSelectedCategory(value);
            onFilterChange({ category: value });
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Filter by Parameter</Label>
        <Select 
          value={selectedParameter}
          onValueChange={(value) => {
            setSelectedParameter(value);
            onFilterChange({ parameter: value });
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Parameter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Parameters</SelectItem>
            {parameters.map(param => (
              <SelectItem key={param} value={param}>{param}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default RankingsFilter;
