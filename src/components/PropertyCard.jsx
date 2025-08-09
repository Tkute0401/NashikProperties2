import { Link } from 'react-router-dom';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import BathtubOutlinedIcon from '@mui/icons-material/BathtubOutlined';
import StraightenOutlinedIcon from '@mui/icons-material/StraightenOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';

const PropertyCard = ({ property }) => {
  const thumbnail = property.acf?.photo_gallery?.images?.[0]?.[0]?.full_image_url;
  
  return (
    <div className="property-card">
      <div className="property-card-header">
        <img src={thumbnail} alt={property.title.rendered} className="property-image" />
        <div className="property-badges">
          {property.featured && (
            <div className="property-badge featured-badge">Featured</div>
          )}
          <div className="property-badge">
            {property.propertytype?.[0] || 'Property'}
          </div>
        </div>
        <div className="property-actions">
          <button className="action-btn">
            <FavoriteBorderOutlinedIcon />
          </button>
          <button className="action-btn">
            <ShareOutlinedIcon />
          </button>
        </div>
      </div>
      
      <div className="property-card-body">
        <div className="property-rating">
          <div className="rating-stars">
            {[...Array(5)].map((_, i) => (
              <StarOutlineOutlinedIcon key={i} className={`star ${i < Math.floor(property.rating) ? '' : 'inactive'}`} />
            ))}
          </div>
          <span className="rating-number">{property.rating}</span>
          <span className="rating-views">({property.views} views)</span>
        </div>
        
        <h3 className="property-title">
          <Link to={`/property/${property.id}`}>{property.title.rendered}</Link>
        </h3>
        
        <div className="property-location">
          <FmdGoodOutlinedIcon />
          <span>{property.acf?.address?.split(',')[0] || property.location?.[0]}</span>
        </div>
        
        <div className="property-price">
          ₹{property.acf?.price?.toLocaleString('en-IN')}
        </div>
        
        <div className="property-features">
          <div className="feature">
            <BedOutlinedIcon />
            <span>{property.acf?.bedrooms || 'N/A'}</span>
          </div>
          <div className="feature">
            <BathtubOutlinedIcon />
            <span>{property.acf?.bathrooms || 'N/A'}</span>
          </div>
          <div className="feature">
            <StraightenOutlinedIcon />
            <span>{property.acf?.area || 'N/A'} sq.ft</span>
          </div>
        </div>

        <div className="property-amenities">
          {property.amenity?.slice(0, 3).map((amenity, index) => (
            <span key={index} className="amenity-tag">{amenity}</span>
          ))}
          {property.amenity?.length > 3 && (
            <span className="amenity-tag">+{property.amenity.length - 3} more</span>
          )}
        </div>
        
        <Link to={`/property/${property.id}`} className="view-details-btn">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;