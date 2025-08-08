import { useEffect, useState } from 'react';
import { getPropertyTypes, getAmenities } from '../wordpress';

const Filters = ({ onFilterChange, filters }) => {
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [amenities, setAmenities] = useState([]);

  useEffect(() => {
    const fetchFilters = async () => {
      const types = await getPropertyTypes();
      const amens = await getAmenities();
      setPropertyTypes(types);
      setAmenities(amens);
    };

    fetchFilters();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({
      ...filters,
      [name]: value
    });
  };

  const handleSearch = (e) => {
    onFilterChange({
      ...filters,
      search: e.target.value
    });
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({
      ...filters,
      [name]: value ? parseInt(value) : null
    });
  };

  const resetFilters = () => {
    onFilterChange({
      search: '',
      propertyType: '',
      amenity: '',
      minPrice: '',
      maxPrice: ''
    });
  };

  return (
    <div className="filters-container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search properties..."
          value={filters.search}
          onChange={handleSearch}
          className="search-input"
        />
        <svg className="search-icon" viewBox="0 0 24 24">
          <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
      </div>

      <div className="filter-grid">
        <div className="filter-group">
          <label>Property Type</label>
          <select 
            name="propertyType" 
            value={filters.propertyType} 
            onChange={handleChange}
            className="filter-select"
          >
            <option value="">All Types</option>
            {propertyTypes.map(type => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Amenities</label>
          <select 
            name="amenity" 
            value={filters.amenity} 
            onChange={handleChange}
            className="filter-select"
          >
            <option value="">All Amenities</option>
            {amenities.map(amenity => (
              <option key={amenity.id} value={amenity.id}>{amenity.name}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Min Price (₹)</label>
          <input
            type="number"
            name="minPrice"
            placeholder="Min"
            value={filters.minPrice}
            onChange={handlePriceChange}
            className="price-input"
          />
        </div>

        <div className="filter-group">
          <label>Max Price (₹)</label>
          <input
            type="number"
            name="maxPrice"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={handlePriceChange}
            className="price-input"
          />
        </div>

        <button onClick={resetFilters} className="reset-btn">
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default Filters;