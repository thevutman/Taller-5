import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './components/HomeScreen';
import MapScreen from './components/MapScreen';
import ParkDetailScreen from './components/ParkDetailScreen';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/mapa" element={<MapScreen />} />
          <Route path="/parque/:parqueId" element={<ParkDetailScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;