export default function Home() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="shadow-text navbar-brand text-white " href="#">Calendar.io</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="me-auto" />
          <div className="d-flex">
            <button className="btn btn-outline-pastel" type="submit">VER MEUS EVENTOS</button>
          </div>
        </div>
      </nav>
      <section className="header-h-100 d-flex flex-column justify-content-center align-items-center">
        <div className="text-center d-flex justify-content-center">
          <h1 className="text-header text-white">CALENDAR.IO O APP QUE TE LEMBRA DO SEU EVENTO</h1>
        </div>
        <div className="py-3">
          <button className="btn btn-lg btn-outline-pastel" type="submit">VER MEUS EVENTOS</button>
        </div>
      </section>
      {/* made by fixed bottom */}
      <footer className="footer fixed-bottom">
        <div className="d-flex justify-content-center">
          <p className="shadow-text text-white">Made with ❤️ by <a className="shadow-text text-white text-decoration-none" href="">FENOL64</a></p>
        </div>
      </footer>
    </div>
  )
}
