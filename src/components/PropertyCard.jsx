import { Link } from 'react-router-dom';

const PropertyCard = ({ property }) => {
  // Get the first image from photo gallery as thumbnail
  const thumbnail = property.acf?.photo_gallery?.images?.[0]?.[0]?.full_image_url || 
                   'https://via.placeholder.com/400x300';
  
  return (
    <div className="property-card">
      <Link to={`/property/${property.id}`}>
        <img src={thumbnail} alt={property.title.rendered} className="property-image" />
      </Link>
      <div className="property-info">
        <h3>
          <Link to={`/property/${property.id}`}>{property.title.rendered}</Link>
        </h3>
        <p className="price">₹{property.acf?.price?.toLocaleString('en-IN') || 'Price not available'}</p>
        <div className="property-meta">
          <span>{property.propertytype?.join(', ') || 'Property type not specified'}</span>
          <span>{property.acf?.area} sq ft</span>
        </div>
        <div className="amenities">
          {property.amenity?.slice(0, 3).map((amenity, index) => (
            <span key={index} className="amenity-tag">{amenity}</span>
          ))}
          {property.amenity?.length > 3 && (
            <span className="amenity-tag">+{property.amenity.length - 3} more</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;