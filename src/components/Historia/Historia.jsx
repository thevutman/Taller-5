import "./Historia.scss"
import Logo from "../../assets/Logo.png"
import { useNavigate } from "react-router-dom"


export default function HistoriaPage() {
    const navigate = useNavigate()
  const historiaItems = [
    {
      title: "Totem Candanga",
      subtitle: "Orígenes",
      description: "Descubre los orígenes ancestrales de La Candanga en la tradición bogotana.",
      
    },
    {
      title: "Totem Candanga",
      subtitle: "Vestimenta",
      description: "Conoce el significado de cada elemento del traje tradicional.",
    },
    {
      title: "Totem Candanga",
      subtitle: "Música y Danza",
      description: "Explora los ritmos y bailes que acompañan esta tradición.",
    },
  ]

  return (
    <div className="historia">
      {/* Header */}
      <header className="historia__header">
        <button onClick={() => navigate("/intro")}>
          back
        </button>
        <div className="historia__header-logo">
            <img src={Logo} alt="Logo Retumbó" />
        </div>
      </header>

      {/* Contenido */}
      <main className="historia__main">
        <h1 className="historia__title">Nuestra historia</h1>

        {/* Cards de historia */}
        <div className="historia__list">
          {historiaItems.map((item, index) => (
              <div className="historia__card">
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
