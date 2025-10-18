// src/data/welcomeSlides.js
import retumbo1 from '../assets/retumbo_1.png';
import retumbo2 from '../assets/retumbo_2.png';
import retumbo3 from '../assets/retumbo_3.png';
import candangaObregon from '../assets/candanga_obregon.mp4';
import resilienciaLogo from '../assets/resiliencia_logo.png';

export const welcomeSlides = [
    {
        id: 1,
        title: "Retumbo",
        subtitle: "¡Vive la magia y la tradición de Santa Fe de Antioquia como nunca antes!",
        text: "Retumbo es tu compañero ideal para sumergirte en el corazón de las  festividades más emblemáticas: el vibrante Bunde, la enérgica Candanga y la mística danza de Los Diablitos.",
        images: [retumbo1, retumbo2, retumbo3], // Imágenes del carrusel de Retumbo
        video: null,
        buttonText: null,
        showButton: false
    },
    {
        id: 2,
        title: "Candanga de Obregón",
        subtitle: null,
        text: "Sumérgete en el ritmo auténtico de La Candanga, una herencia musical que, con  guitarras, tiples y coplas, narra la historia viva de Santa Fe de  Antioquia. Más que un folclor, es la persistencia de una cultura que se  niega a ser olvidada.",
        image: null,
        video: candangaObregon, // Video de la Candanga de Obregón
        buttonText: null,
        showButton: false
    },
    {
        id: 3,
        title: "¡Bienvenido a Retumbo!",
        subtitle: null,
        text: "Explora la esencia de Santa Fe de Antioquia. Descubre el Bunde. Conoce la Candanga de Obregón. Vive a Los Diablitos.",
        image: resilienciaLogo,
        video: null,
        buttonText: "Comenzar",
        showButton: true
    }
];

// NOTA: Asegúrate de colocar las imágenes (retumbo_1.jpg, etc.) en tu carpeta public/assets/