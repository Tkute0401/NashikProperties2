import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import PropertySingle from './Pages/PropertySingle';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/property/:id" element={<PropertySingle />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;