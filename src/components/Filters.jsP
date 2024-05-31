import React from 'react';

const Filters = ({ filters, onFilterChange }) => {
  return (
    <div>
      <div>
        <label>End Year:</label>
        <input type="text" name="endYear" value={filters.endYear} onChange={onFilterChange} />
      </div>
      <div>
        <label>Topic:</label>
        <input type="text" name="topic" value={filters.topic} onChange={onFilterChange} />
      </div>
      <div>
        <label>Sector:</label>
        <input type="text" name="sector" value={filters.sector} onChange={onFilterChange} />
      </div>
      <div>
        <label>Region:</label>
        <input type="text" name="region" value={filters.region} onChange={onFilterChange} />
      </div>
      <div>
        <label>PEST:</label>
        <input type="text" name="pestle" value={filters.pestle} onChange={onFilterChange} />
      </div>
      <div>
        <label>Source:</label>
        <input type="text" name="source" value={filters.source} onChange={onFilterChange} />
      </div>
      <div>
        <label>SWOT:</label>
        <input type="text" name="swot" value={filters.swot} onChange={onFilterChange} />
      </div>
      <div>
        <label>Country:</label>
        <input type="text" name="country" value={filters.country} onChange={onFilterChange} />
      </div>
      <div>
        <label>City:</label>
        <input type="text" name="city" value={filters.city} onChange={onFilterChange} />
      </div>
    </div>
  );
};

export default Filters;
