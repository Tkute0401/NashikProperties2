import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPropertyById } from '../wordpress';

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      const data = await getPropertyById(id);
      setProperty(data);
      setLoading(false);
    };

    fetchProperty();
  }, [id]);

  if (loading) return <div className="loading">Loading property details...</div>;
  if (!property) return <div>Property not found</div>;

  // Get all gallery images
  const galleryImages = property.acf?.photo_gallery?.images?.[0] || [];

  return (
    <div className="property-detail">
      <h1>{property.title.rendered}</h1>
      
      {/* Main image carousel */}
      <div className="property-carousel">
        {galleryImages.length > 0 ? (
          galleryImages.map((image, index) => (
            <img 
              key={index} 
              src={image.full_image_url} 
              alt={`Property image ${index + 1}`} 
              className="property-main-image"
            />
          ))
        ) : (
          <img 
            src="https://via.placeholder.com/800x600" 
            alt="Property placeholder" 
            className="property-main-image"
          />
        )}
      </div>
      
      {/* Price and basic info */}
      <div className="property-highlights">
        <div className="price-badge">
          <span className="price">₹{property.acf?.price?.toLocaleString('en-IN')}</span>
          {property.acf?.area && <span>{property.acf.area} sq ft</span>}
        </div>
        
        <div className="address">
          <h3>Address</h3>
          <p>{property.acf?.address}</p>
        </div>
      </div>
      
      {/* Property type and amenities */}
      <div className="property-categories">
        {property.propertytype?.length > 0 && (
          <div className="property-type">
            <h3>Property Type</h3>
            <div className="tags">
              {property.propertytype.map((type, index) => (
                <span key={index} className="tag">{type}</span>
              ))}
            </div>
          </div>
        )}
        
        {property.amenity?.length > 0 && (
          <div className="property-amenities">
            <h3>Amenities</h3>
            <div className="amenities-grid">
              {property.amenity.map((amenity, index) => (
                <span key={index} className="amenity-item">
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Description */}
      {property.acf?.description && (
        <div className="property-description">
          <h3>Description</h3>
          <p style={{ whiteSpace: 'pre-line' }}>{property.acf.description}</p>
        </div>
      )}
      
      {/* Gallery
      {galleryImages.length > 0 && (
        <div className="property-gallery">
          <h3>Gallery</h3>
          <div className="gallery-grid">
            {galleryImages.map((image, index) => (
              <img 
                key={index} 
                src={image.full_image_url} 
                alt={`Gallery image ${index + 1}`}
                className="gallery-image"
              />
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default PropertyDetail;