import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPropertyById } from '../wordpress';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaShare, FaHeart } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      const data = await getPropertyById(id);
      setProperty(data);
      setLoading(false);
    };

    fetchProperty();
  }, [id]);

  const galleryImages = property?.acf?.photo_gallery?.images?.[0] || [];
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  if (loading) return (
    <div className="loading-spinner">
      <div className="spinner"></div>
    </div>
  );

  if (!property) return <div className="error-message">Property not found</div>;

  return (
    <div className="property-detail-page">
      {/* Image Gallery */}
      <div className="property-gallery">
        {galleryImages.length > 0 ? (
          <div className="gallery-container">
            <img 
              src={galleryImages[currentImageIndex].full_image_url} 
              alt={`Property ${currentImageIndex + 1}`} 
              className="main-image"
            />
            <button className="nav-btn prev-btn" onClick={prevImage}>
              <IoIosArrowBack />
            </button>
            <button className="nav-btn next-btn" onClick={nextImage}>
              <IoIosArrowForward />
            </button>
            <div className="image-counter">
              {currentImageIndex + 1} / {galleryImages.length}
            </div>
          </div>
        ) : (
          <div className="no-image-placeholder">
            <img 
              src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
              alt="Property placeholder" 
            />
          </div>
        )}
        
        <div className="thumbnail-grid">
          {galleryImages.slice(0, 4).map((image, index) => (
            <div 
              key={index} 
              className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
              onClick={() => setCurrentImageIndex(index)}
            >
              <img src={image.full_image_url} alt={`Thumbnail ${index + 1}`} />
            </div>
          ))}
          {galleryImages.length > 4 && (
            <div className="thumbnail more-count">
              +{galleryImages.length - 4}
            </div>
          )}
        </div>
      </div>

      {/* Property Header */}
      <div className="property-header">
        <div className="header-left">
          <h1>{property.title.rendered}</h1>
          <div className="property-location">
            <FaMapMarkerAlt />
            <span>{property.acf?.address}</span>
          </div>
        </div>
        <div className="header-right">
          <div className="property-price">
            ₹{property.acf?.price?.toLocaleString('en-IN')}
          </div>
          <div className="property-actions">
            <button className="action-btn">
              <FaShare />
            </button>
            <button className="action-btn">
              <FaHeart />
            </button>
          </div>
        </div>
      </div>

      {/* Property Highlights */}
      <div className="property-highlights">
        <div className="highlight-card">
          <div className="highlight-icon">
            <FaBed />
          </div>
          <div className="highlight-info">
            <span>Bedrooms</span>
            <strong>{property.acf?.bedrooms || 'N/A'}</strong>
          </div>
        </div>
        <div className="highlight-card">
          <div className="highlight-icon">
            <FaBath />
          </div>
          <div className="highlight-info">
            <span>Bathrooms</span>
            <strong>{property.acf?.bathrooms || 'N/A'}</strong>
          </div>
        </div>
        <div className="highlight-card">
          <div className="highlight-icon">
            <FaRulerCombined />
          </div>
          <div className="highlight-info">
            <span>Area</span>
            <strong>{property.acf?.area || 'N/A'} sq.ft.</strong>
          </div>
        </div>
        <div className="highlight-card">
          <div className="highlight-icon">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16z"/>
            </svg>
          </div>
          <div className="highlight-info">
            <span>Type</span>
            <strong>{property.propertytype?.[0] || 'N/A'}</strong>
          </div>
        </div>
      </div>

      {/* Property Description */}
      <div className="property-section">
        <h2>Description</h2>
        <div className="property-description">
          {property.acf?.description ? (
            <p style={{ whiteSpace: 'pre-line' }}>{property.acf.description}</p>
          ) : (
            <p>No description available for this property.</p>
          )}
        </div>
      </div>

      {/* Amenities */}
      {property.amenity?.length > 0 && (
        <div className="property-section">
          <h2>Amenities</h2>
          <div className="amenities-grid">
            {property.amenity.map((amenity, index) => (
              <div key={index} className="amenity-item">
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gallery */}
      {galleryImages.length > 0 && (
        <div className="property-section">
          <h2>Gallery</h2>
          <div className="full-gallery">
            {galleryImages.map((image, index) => (
              <div key={index} className="gallery-item">
                <img src={image.full_image_url} alt={`Gallery ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contact Section */}
      <div className="contact-section">
        <h2>Interested in this property?</h2>
        <p>Contact us for more information or to schedule a viewing</p>
        <div className="contact-buttons">
          <button className="contact-btn phone-btn">
            Call Now
          </button>
          <button className="contact-btn whatsapp-btn">
            WhatsApp
          </button>
          <button className="contact-btn email-btn">
            Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;