import React, { useState } from 'react';

const FilterSidebar = ({ onFilterChange }) => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minRating, setMinRating] = useState('');

  const applyFilters = () => {
    onFilterChange({
      minPrice: minPrice ? parseFloat(minPrice) : 0,
      maxPrice: maxPrice ? parseFloat(maxPrice) : Infinity,
    });
  };

  return (
    <div className="filter-sidebar">
      <h3>Filters</h3>
      <label>
        Min Price:
        <input
          type="number"
          value={minPrice}
          onChange={e => setMinPrice(e.target.value)}
        />
      </label>
      <label>
        Max Price:
        <input
          type="number"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
        />
      </label>
      
      <button onClick={applyFilters} style={{ marginTop: '10px', backgroundColor: '#7AC6D2', color: 'white', borderRadius: '4px', padding: '8px 16px'}}>Apply Filters</button>
    </div>
  );
};

export default FilterSidebar;
