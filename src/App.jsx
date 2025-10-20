import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';
import Liborio from './components/WelcomeScreen/Liborio';
import MapScreen from './components/MapScreen/MapScreen';

const App = () => {
  return (
    <div className="App-Container">
      {/* Por ahora, mostramos solo la WelcomeScreen para probar Sass */}
      <MapScreen />
      
      {/* Aquí iría el router en el futuro */}
    </div>
  );
};

export default App;
