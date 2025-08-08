import { useEffect, useState } from 'react';
import PropertyCard from './PropertyCard';
import { getProperties } from '../wordpress';
import Filters from './Filters';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    propertyType: '',
    amenity: '',
    minPrice: '',
    maxPrice: ''
  });

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      const data = await getProperties(filters);
      setProperties(data);
      setLoading(false);
    };

    const timer = setTimeout(() => {
      fetchProperties();
    }, 300);

    return () => clearTimeout(timer);
  }, [filters]);

  return (
    <div className="property-list-container">
      <Filters 
        filters={filters} 
        onFilterChange={setFilters} 
      />
      
      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading properties...</p>
        </div>
      ) : properties.length > 0 ? (
        <div className="property-grid">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="no-results">
          <h3>No properties found</h3>
          <p>Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default PropertyList;