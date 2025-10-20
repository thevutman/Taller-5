// src/data/welcomeSlides.js
import Liborio from '../assets/Liborio.png';
import DonLiborio from '../assets/DonLiborio.mp4';
import DonLiborio2 from '../assets/DonLiborio2.mp4';

export const LiborioSlides = [
    {
        id: 1,
        title: "Hola soy Liborio",
        subtitle: null,
        text: null,
        images: [Liborio], // Imágen de Liborio
        video: null,
        buttonText: null,
        showButton: false
    },
    {
        id: 2,
        title: "Perdí mis tradiciones en Santa Fe de Antoquia",
        subtitle: null,
        text: null,
        image: null,
        video: DonLiborio2, // Video de don liborio triste
        buttonText: null,
        showButton: false
    },
    {
        id: 3,
        title: "No puedo celebrar las festividades ¡Ayudame a Recuperalos! ",
        subtitle: null,
        text: null,
        image: null,
        video: null,
        video2: DonLiborio, // Mismo video de don liborio triste
        buttonText: null,
        showButton: false
    },
];

// NOTA: Asegúrate de colocar las imágenes (retumbo_1.jpg, etc.) en tu carpeta public/assets/