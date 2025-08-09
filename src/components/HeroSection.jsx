import { Link } from 'react-router-dom';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <div className="hero-badge">
          <StarOutlinedIcon className="badge-icon" />
          <span>Premium Real Estate Solutions</span>
        </div>
        <h1 className="hero-title">Discover Your Perfect Property</h1>
        <p className="hero-subtitle">
          Experience luxury living with our curated selection of high-end residences in the most sought-after locations
        </p>
        <div className="hero-cta">
          <Link to="#properties" className="cta-button cta-primary">
            <SearchOutlinedIcon className="cta-icon" />
            <span>Explore Listings</span>
          </Link>
          <Link to="#video" className="cta-button cta-secondary">
            <PlayCircleOutlineOutlinedIcon className="cta-icon" />
            <span>View Showcase</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;