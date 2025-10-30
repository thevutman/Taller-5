// import Link from "next/link"
// import { ArrowLeft, Home, Info, Music, Trophy } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import "./totem.scss"

// const totemData = [
//   {
//     title: "Candanga",
//     subtitle: "Música/Ritmo",
//     description:
//       "El ritmo de La Candanga representa el latido del corazón de Bogotá, con tambores que resuenan en las calles coloniales.",
//     color: "bg-orange-600",
//   },
//   {
//     title: "Candanga",
//     subtitle: "Orígenes",
//     description:
//       "Los orígenes de La Candanga se remontan a las tradiciones indígenas y españolas que se fusionaron en Santa Fe.",
//     color: "bg-red-700",
//   },
//   {
//     title: "Candanga",
//     subtitle: "Vestimenta",
//     description:
//       "La vestimenta tradicional incluye máscaras talladas, trajes coloridos y elementos que representan la dualidad del bien y el mal.",
//     color: "bg-amber-700",
//   },
// ]

// export default async function TotemPage({ params }: { params: Promise<{ id: string }> }) {
//   const { id } = await params
//   const totemIndex = Number.parseInt(id)
//   const totem = totemData[totemIndex] || totemData[0]

//   return (
//     <div className="totem">
//       {/* Header */}
//       <header className="totem__header">
//         <Link href="/historia">
//           <Button variant="ghost" size="icon" className="totem__header-back">
//             <ArrowLeft className="totem__icon" />
//           </Button>
//         </Link>
//         <div className="totem__header-title">
//           <div className="totem__header-logo">
//             <span className="totem__header-logo-text">R</span>
//           </div>
//           <span className="totem__header-text">Totems</span>
//         </div>
//         <div className="totem__header-spacer" />
//       </header>

//       {/* Contenido */}
//       <main className="totem__main">
//         {/* Título */}
//         <div className="totem__title-section">
//           <h1 className="totem__title">{totem.title}</h1>
//           <p className="totem__subtitle">{totem.subtitle}</p>
//         </div>

//         {/* Totem */}
//         <div className="totem__image-container">
//           <div className="totem__image-wrapper">
//             <img src="/colombian-totem-pole-carved-wood.jpg" alt="Totem" className="totem__image" />
//           </div>
//         </div>

//         {/* Descripción */}
//         <div className="totem__description">
//           <p className="totem__description-text">{totem.description}</p>
//         </div>
//       </main>
//     </div>
//   )
// }

// import React from 'react'


// function Totems() {
//   return (
//     <div>
//       <div className='totem'>Tótem de la Música - La Candanga
      
//       <model-viewer
//           src="../../assets/totem_musica.glb"
//           alt="Un modelo 3D de un robot"
//           auto-rotate
//           camera-controls
//           shadow-intensity="1"
//           style="width: 100%; height: 500px;"
//       ></model-viewer>
//       </div>
//     </div>
//   )
// }

// export default Totems

import React from 'react'
import './Totems.scss';
import useNavigate from 'react-router-dom';
import Totem from '../../assets/Totems.png';

function Totems() {
  navigate = useNavigate();
  return (
    <div className='totem'> 
      <header className='totem__header'> 
        <div className="totem__header-logo" onClick={() => navigate("/")}>
          <img src={Totem} alt="Logo Tótem"/>
        </div>
        <h1 className='totem__header-title'>Totems</h1>
      </header>
      <div className='totem__content'>
        <div className='totem__title'>Candanga</div>
        <div className='totem__subtitle'>Musica</div>
      <model-viewer 
        src="/totem_musica.glb"
        alt="Tótem 3D"
        poster="/models/totem_musica.webp"
        ar
        ar-modes="scene-viewer quick-look webxr"
        // environment-image="/environments/moon_1k.hdr"
        camera-controls
        auto-rotate
        shadow-intensity="1"
        style={{ width: '100%', height: '100%' }}
      ></model-viewer>
      </div>
    </div>
  )
}

export default Totems
