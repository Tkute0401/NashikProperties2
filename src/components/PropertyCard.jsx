import { Link } from 'react-router-dom';
import { FaBed, FaBath, FaRulerCombined, FaHeart } from 'react-icons/fa';

const PropertyCard = ({ property }) => {
  const thumbnail = property.acf?.photo_gallery?.images?.[0]?.[0]?.full_image_url || 
                   'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80';
  
  return (
    <div className="property-card">
      <div className="property-card-header">
        <img src={thumbnail} alt={property.title.rendered} className="property-image" />
        <div className="property-badge">
          {property.propertytype?.[0] || 'Property'}
        </div>
        <button className="wishlist-btn">
          <FaHeart />
        </button>
      </div>
      
      <div className="property-card-body">
        <h3>
          <Link to={`/property/${property.id}`}>{property.title.rendered}</Link>
        </h3>
        
        <div className="property-location">
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          <span>{property.acf?.address?.split(',')[0] || 'Location not specified'}</span>
        </div>
        
        <div className="property-price">
          ₹{property.acf?.price?.toLocaleString('en-IN') || 'Price on request'}
        </div>
        
        <div className="property-features">
          <div className="feature">
            <FaBed />
            <span>{property.acf?.bedrooms || 'N/A'} Beds</span>
          </div>
          <div className="feature">
            <FaBath />
            <span>{property.acf?.bathrooms || 'N/A'} Baths</span>
          </div>
          <div className="feature">
            <FaRulerCombined />
            <span>{property.acf?.area || 'N/A'} sq.ft.</span>
          </div>
        </div>
      </div>
      
      <div className="property-card-footer">
        <Link to={`/property/${property.id}`} className="view-details-btn">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;