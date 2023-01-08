import Link from "next/link";
import Header from "../components/Header";

export default function Home() {
  return (
    <div>
      <Header />
      <section className="header-h-100 d-flex flex-column justify-content-center align-items-center">
        <div className="text-center d-flex justify-content-center">
          <h1 className="text-header text-white">CALENDAR.IO O APP QUE TE LEMBRA DO SEU EVENTO</h1>
        </div>
        <div className="py-3">
          <button className="btn btn-outline-pastel" type="submit">Criar meu lembrete</button>
          <span className="text-white px-2">ou</span>
          <Link href={`/login`}>
            <span className="text-pastel" >Entrar</span>
          </Link>
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
