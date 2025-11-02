import { Routes, Route, Navigate } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';
import Intro from './components/Intro/Intro';
import Logros from './components/Logros/Logros';
import Mapa from './components/Mapa/Mapa';
import Totems from './components/Totems/Totems';
import HistoriaPage from './components/Historia/Historia';

const App = () => {
  return (
    <div className="App-Container" style={{ width: '100vw', maxWidth: '500px', overflow: 'hidden' }}>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/Intro" element={<Intro />} />
        <Route path="/Historia" element={<HistoriaPage />} />
        <Route path="/Logros" element={<Logros />} />
        <Route path="/Mapa" element={<Mapa />} />
        <Route path="/Totems" element={<Totems />} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
