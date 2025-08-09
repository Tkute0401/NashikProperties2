import { useEffect, useState } from 'react';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import SentimentVerySatisfiedOutlinedIcon from '@mui/icons-material/SentimentVerySatisfiedOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';

const StatsSection = () => {
  const [counters, setCounters] = useState({
    properties: 0,
    satisfaction: 0,
    locations: 0,
    support: 0
  });

  useEffect(() => {
    // Animation for counter increment
    const duration = 2000;
    const startTime = Date.now();
    
    const animateCounters = () => {
      const progress = Math.min(1, (Date.now() - startTime) / duration);
      
      setCounters({
        properties: Math.floor(progress * 500),
        satisfaction: Math.floor(progress * 95),
        locations: Math.floor(progress * 50),
        support: 24 // No animation for 24/7
      });

      if (progress < 1) {
        requestAnimationFrame(animateCounters);
      }
    };

    animateCounters();
  }, []);

  return (
    <section className="stats-section">
      <div className="stats-container">
        <div className="stat-item">
          <div className="stat-icon">
            <EmojiEventsOutlinedIcon />
          </div>
          <span className="stat-number">{counters.properties}+</span>
          <span className="stat-label">Properties Listed</span>
        </div>
        <div className="stat-item">
          <div className="stat-icon">
            <SentimentVerySatisfiedOutlinedIcon />
          </div>
          <span className="stat-number">{counters.satisfaction}%</span>
          <span className="stat-label">Client Satisfaction</span>
        </div>
        <div className="stat-item">
          <div className="stat-icon">
            <LocationOnOutlinedIcon />
          </div>
          <span className="stat-number">{counters.locations}+</span>
          <span className="stat-label">Locations Covered</span>
        </div>
        <div className="stat-item">
          <div className="stat-icon">
            <SupportAgentOutlinedIcon />
          </div>
          <span className="stat-number">24/7</span>
          <span className="stat-label">Customer Support</span>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;