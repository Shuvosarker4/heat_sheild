import Hero from "../components/Hero"
import About from "./About"

function Home() {
  return (
    <>
      <section id="home">
        <Hero />
      </section>

      <section id="about">
        <About />
      </section>

    </>
  )
}

export default Home
