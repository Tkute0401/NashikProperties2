import PropertyList from '../components/PropertyList';

const Home = () => {
  return (
    <div className="home-page">
      <header className="page-header">
        <h1>Featured Properties</h1>
        <p>Find your dream home from our exclusive listings</p>
      </header>
      <PropertyList />
    </div>
  );
};

export default Home;