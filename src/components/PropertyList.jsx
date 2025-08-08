import { useEffect, useState } from 'react';
import PropertyCard from './PropertyCard';
import { getProperties } from '../wordpress';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      const data = await getProperties();
      setProperties(data);
      setLoading(false);
    };

    fetchProperties();
  }, []);

  if (loading) return <div>Loading properties...</div>;

  return (
    <div className="property-list">
      {properties.length > 0 ? (
        properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))
      ) : (
        <p>No properties found.</p>
      )}
    </div>
  );
};

export default PropertyList;