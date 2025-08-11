import { useEffect, useState } from 'react';
import { getPropertyTypes, getAmenities } from '../wordpress';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import CloseIcon from '@mui/icons-material/Close';

export const AppliedFilters = ({ 
  filters, 
  onRemoveFilter,
  propertyTypes,
  amenities
}) => {
  const hasFilters = 
    filters.search || 
    filters.propertyType || 
    filters.amenity || 
    filters.minPrice || 
    filters.maxPrice;

  if (!hasFilters) return null;

  const getFilterLabel = (name, value) => {
    if (!value) return null;
    
    switch (name) {
      case 'propertyType':
        const propType = propertyTypes?.find(t => t.id.toString() === value);
        return `Type: ${propType?.name || value}`;
      case 'amenity':
        const amenityNames = value.split(',')
          .map(id => amenities?.find(a => a.id.toString() === id)?.name || id)
          .join(', ');
        return `Amenities: ${amenityNames}`;
      case 'minPrice':
        return `Min Price: ₹${value.toLocaleString()}`;
      case 'maxPrice':
        return `Max Price: ₹${value.toLocaleString()}`;
      case 'search':
        return `Search: "${value}"`;
      default:
        return value;
    }
  };

  return (
    <div className="applied-filters">
      {Object.entries(filters).map(([name, value]) => {
        if (!value || (Array.isArray(value) && value.length === 0)) return null;
        
        const label = getFilterLabel(name, value);
        if (!label) return null;
        
        return (
          <div key={name} className="applied-filter">
            <span>{label}</span>
            <button 
              onClick={() => onRemoveFilter(name)} 
              className="remove-filter"
              aria-label={`Remove ${name} filter`}
            >
              <CloseIcon fontSize="small" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

const Filters = ({ onFilterChange, filters }) => {
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [showAmenitiesDropdown, setShowAmenitiesDropdown] = useState(false);

  useEffect(() => {
    const fetchFilters = async () => {
      const types = await getPropertyTypes();
      const amens = await getAmenities();
      setPropertyTypes(types);
      setAmenities(amens);
    };

    fetchFilters();
  }, []);

  useEffect(() => {
    if (filters.amenity) {
      setSelectedAmenities(filters.amenity.split(','));
    } else {
      setSelectedAmenities([]);
    }
  }, [filters.amenity]);

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
      [name]: value ? parseInt(value) : ''
    });
  };

  const handleAmenityChange = (amenityId) => {
    const updatedAmenities = selectedAmenities.includes(amenityId)
      ? selectedAmenities.filter(id => id !== amenityId)
      : [...selectedAmenities, amenityId];
    
    setSelectedAmenities(updatedAmenities);
    onFilterChange({
      ...filters,
      amenity: updatedAmenities.join(',')
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
    setSelectedAmenities([]);
  };

  const toggleAmenitiesDropdown = () => {
    setShowAmenitiesDropdown(!showAmenitiesDropdown);
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

      <AppliedFilters 
        filters={filters} 
        onRemoveFilter={(name) => onFilterChange({ ...filters, [name]: '' })}
        propertyTypes={propertyTypes}
        amenities={amenities}
      />

      <div className="filter-grid">
        <div className="filter-group">
          <label htmlFor="propertyType">Property Type</label>
          <select 
            id="propertyType"
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
          <div className="multi-select-dropdown">
            <div 
              className="selected-amenities"
              onClick={toggleAmenitiesDropdown}
            >
              {selectedAmenities.length > 0 ? (
                <span>{selectedAmenities.length} selected</span>
              ) : (
                <span>Select amenities</span>
              )}
            </div>
            {showAmenitiesDropdown && (
              <div className="amenities-checkboxes">
                {amenities.map(amenity => (
                  <label key={amenity.id} className="amenity-checkbox">
                    <input
                      type="checkbox"
                      value={amenity.id}
                      checked={selectedAmenities.includes(amenity.id.toString())}
                      onChange={() => handleAmenityChange(amenity.id.toString())}
                    />
                    {amenity.name}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="filter-group">
          <label htmlFor="minPrice">Min Price (₹)</label>
          <input
            id="minPrice"
            type="number"
            name="minPrice"
            placeholder="Min Price"
            value={filters.minPrice || ''}
            onChange={handlePriceChange}
            className="price-input"
            min="0"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="maxPrice">Max Price (₹)</label>
          <input
            id="maxPrice"
            type="number"
            name="maxPrice"
            placeholder="Max Price"
            value={filters.maxPrice || ''}
            onChange={handlePriceChange}
            className="price-input"
            min="0"
          />
        </div>

        <button onClick={resetFilters} className="reset-btn">
          <FilterAltOutlinedIcon /> Reset All
        </button>
      </div>
    </div>
  );
};

export default Filters;