import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';

const App = () => {
  return (
    <div className="App-Container">
      {/* Por ahora, mostramos solo la WelcomeScreen para probar Sass */}
      <WelcomeScreen />
      
      {/* Aquí iría el router en el futuro */}
    </div>
  );
};

export default App;
