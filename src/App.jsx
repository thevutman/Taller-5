import { Routes, Route, Navigate } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';
import MapScreen from './components/MapScreen/MapScreen';
import Liborio from './components/Liborio/Liborio';

const App = () => {
  return (
    <div className="App-Container">
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/map" element={<MapScreen />} />
        <Route path="/liborio" element={<Liborio />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
