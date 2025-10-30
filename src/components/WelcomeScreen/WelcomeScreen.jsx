import { useNavigate } from 'react-router-dom';
import './WelcomeScreen.scss';
import Logo from '../../assets/Logo.png';
// import Button from '../Shared/Button';

export default function WelcomeScreen({ onStart }) {
    const navigate = useNavigate();

    const handleStart = () => {
      if (typeof onStart === 'function') onStart();
      navigate('/Intro'); // <-- asegúrate que coincide con la ruta en App.jsx
    };

    return (
        <div className="welcome-screen">
            <div className="welcome-screen__container">
                <div className="welcome-screen__container__logo">
                    <img src={Logo} alt="Logo Retumbó" className="welcome-screen__container__logo__image" />
                </div>
                <div className="welcome-screen__container-content">
                    <div className="welcome-screen__container__description">
                        <p className="">
                            Explora la esencia de Santa Fe de Antioquia. Descubre el Bunde. Conoce la Candanga de Obregón. Vive a Los Diablitos.
                        </p>
                    </div>
                    <button className="welcome-screen__container__button" onClick={handleStart}>
                        Comenzar
                    </button>
                </div>
            </div>
        </div>
    );
}