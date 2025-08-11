import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPropertyById } from '../wordpress';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import BathtubOutlinedIcon from '@mui/icons-material/BathtubOutlined';
import StraightenOutlinedIcon from '@mui/icons-material/StraightenOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
  const fetchProperty = async () => {
    try {
      const propertyData = await getPropertyById(id);
      setProperty(propertyData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching property:', error);
      setLoading(false);
    }
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
      <p>Loading property details...</p>
    </div>
  );

  if (!property) return <div className="no-results"><h3>Property not found</h3></div>;

  return (
    <div className="property-detail-page">
      <div className="container">
        {/* Image Gallery */}
        <div className="property-gallery">
          {galleryImages.length > 0 ? (
            <>
              <div className="gallery-container">
                <img 
                  src={galleryImages[currentImageIndex].full_image_url} 
                  alt={`Property ${currentImageIndex + 1}`} 
                  className="main-image"
                />
                {galleryImages.length > 1 && (
                  <>
                    <button className="nav-btn prev-btn" onClick={prevImage}>
                      <KeyboardArrowLeftOutlinedIcon />
                    </button>
                    <button className="nav-btn next-btn" onClick={nextImage}>
                      <KeyboardArrowRightOutlinedIcon />
                    </button>
                  </>
                )}
                <div className="image-counter">
                  {currentImageIndex + 1} / {galleryImages.length}
                </div>
              </div>
              
              {galleryImages.length > 1 && (
                <div className="thumbnail-grid">
                  {galleryImages.slice(0, 6).map((image, index) => (
                    <div 
                      key={index} 
                      className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <img src={image.full_image_url} alt={`Thumbnail ${index + 1}`} />
                    </div>
                  ))}
                  {galleryImages.length > 6 && (
                    <div className="thumbnail more-count">
                      +{galleryImages.length - 6}
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="gallery-container">
              <img 
                src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
                alt="Property placeholder" 
                className="main-image"
              />
            </div>
          )}
        </div>

        {/* Property Header */}
        <div className="property-header">
          <div className="header-left">
            <div className="property-info-bar">
              <div className="property-type">
                {property.propertytype?.[0] || 'Property'}
              </div>
              <div className="property-rating">
                <div className="rating-stars">
                  {[...Array(5)].map((_, i) => (
                    <StarOutlineOutlinedIcon key={i} className={`star ${i < Math.floor(property.rating) ? '' : 'inactive'}`} />
                  ))}
                </div>
                <span className="rating-number">{property.rating}</span>
              </div>
            </div>
            <h1>{property.title.rendered}</h1>
            <div className="property-location">
              <FmdGoodOutlinedIcon />
              <span>{property.acf?.address}</span>
            </div>
          </div>
          <div className="header-right">
            <div className="property-price-large">
              ₹{property.acf?.price?.toLocaleString('en-IN')}
            </div>
            <div className="property-actions">
              <button className="action-btn">
                <ShareOutlinedIcon />
              </button>
              <button className="action-btn">
                <FavoriteBorderOutlinedIcon />
              </button>
            </div>
          </div>
        </div>

        {/* Property Highlights */}
        <div className="property-highlights">
          <div className="highlight-card">
            <div className="highlight-icon">
              <BedOutlinedIcon />
            </div>
            <div className="highlight-info">
              <strong>{property.acf?.bedrooms || 'N/A'}</strong>
              <span>Bedrooms</span>
            </div>
          </div>
          <div className="highlight-card">
            <div className="highlight-icon">
              <BathtubOutlinedIcon />
            </div>
            <div className="highlight-info">
              <strong>{property.acf?.bathrooms || 'N/A'}</strong>
              <span>Bathrooms</span>
            </div>
          </div>
          <div className="highlight-card">
            <div className="highlight-icon">
              <StraightenOutlinedIcon />
            </div>
            <div className="highlight-info">
              <strong>{property.acf?.area || 'N/A'}</strong>
              <span>Square Feet</span>
            </div>
          </div>
          <div className="highlight-card">
            <div className="highlight-icon">
              <FmdGoodOutlinedIcon />
            </div>
            <div className="highlight-info">
              <strong>Prime</strong>
              <span>Location</span>
            </div>
          </div>
        </div>

        {/* Property Description */}
        <div className="property-section">
          <h2>Property Description</h2>
          <div className="property-description">
            {property.acf?.description ? (
              <p style={{ whiteSpace: 'pre-line' }}>{property.acf.description}</p>
            ) : (
              <p>This beautiful property offers modern amenities and comfortable living spaces in a prime location.</p>
            )}
          </div>
        </div>

        {/* Amenities */}
        {property.amenity?.length > 0 && (
          <div className="property-section">
            <h2>Amenities & Features</h2>
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
        {galleryImages.length > 1 && (
          <div className="property-section">
            <h2>Property Gallery</h2>
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
          <p>Contact our expert team for more information, virtual tours, or to schedule a viewing</p>
          <div className="contact-buttons">
            <button className="contact-btn phone-btn">
              <PhoneIcon />
              Call Now
            </button>
            <button className="contact-btn whatsapp-btn">
              <WhatsAppIcon />
              WhatsApp
            </button>
            <button className="contact-btn email-btn">
              <EmailOutlinedIcon />
              Email Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;