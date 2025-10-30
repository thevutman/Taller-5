import "./Historia.scss"
import Logo from "../../assets/Logo.png"
import video from "../../assets/videoHistoriaCandanga.mp4"
import { useNavigate } from "react-router-dom"


export default function HistoriaPage() {
  const navigate = useNavigate()
  const historiaItems = [
    {
      title: "Totem Candanga",
      subtitle: "Musica y ritmo",
      description: "Entra en la inmersion de la candanga explorando los bailes tradicionales mediante esta experiencia.",
      
    },
    {
      title: "Totem Candanga",
      subtitle: "Orignes",
      description: "Entra en la inmersion de la candanga explorando los bailes tradicionales mediante esta experiencia",
    },
    {
      title: "Totem Candanga",
      subtitle: "Vestimenta",
      description: "Entra en la inmersion de la candanga explorando los bailes tradicionales mediante esta experiencia",
    },
  ]

  return (
    <div className="historia">
      <header className='historia__header'> 
        <div className="historia__header-logo" onClick={() => navigate("/")}>
          <img src={Logo} alt="Logo"/>
        </div>
        <h1 className='historia__header-title'>La Candanga</h1>
      </header>

      {/* Contenido */}
      <main className="historia__main">
        <h1 className="historia__title">Nuestra historia</h1>

        {/* Video debajo del título */}
        <div className="historia__video-wrap">
          <video
            src={video}
            className="historia__video"
            controls
            playsInline
            preload="metadata"
          />
        </div>

        {/* Cards de historia */}
        <div className="historia__list">
          {historiaItems.map((item, index) => (
              <div className="historia__card" key={index}>
                <div className="historia__card-content">
                  <div className="historia__card-icon">{item.icon}</div>
                  <div className="historia__card-info">
                    <h3 className="historia__card-title">{item.title}</h3>
                    <p className="historia__card-subtitle">{item.subtitle}</p>
                    <p className="historia__card-description">{item.description}</p>
                  </div>
                </div>
              </div>
          ))}
        </div>
      </main>
    </div>
  )
}
