import PropertyList from '../components/PropertyList';
import HeroSection from '../components/HeroSection';
import StatsSection from '../components/StatsSection';

const Home = () => {
  return (
    <div className="home-page">
      <HeroSection />
      <StatsSection />
      <PropertyList />
    </div>
  );
};

export default Home;