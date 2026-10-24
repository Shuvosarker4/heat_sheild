
import FireSafetyCarousel from "../components/FireSafetyCarousel"
import Hero from "../components/Hero"
import TextScrollWordReveal from "../components/TextScrollWordReveal"
import About from "./About"

function Home() {
  return (
    <>
      <section className="" id="home">
      <FireSafetyCarousel/>
      </section>

      <TextScrollWordReveal/>

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
