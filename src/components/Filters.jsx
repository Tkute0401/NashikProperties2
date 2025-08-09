import { useEffect, useState } from 'react';
import { getPropertyTypes, getAmenities } from '../wordpress';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

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
          placeholder="Search properties by location, type, or features..."
          value={filters.search}
          onChange={handleSearch}
          className="search-input"
        />
        <SearchOutlinedIcon className="search-icon" />
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
            placeholder="Min Price"
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
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={handlePriceChange}
            className="price-input"
          />
        </div>

        <button onClick={resetFilters} className="reset-btn">
          <FilterAltOutlinedIcon /> Reset Filters
        </button>
      </div>
    </div>
  );
};

export default Filters;