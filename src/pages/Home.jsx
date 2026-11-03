
import CompanyLogoMarquee from "../components/CompanyLogoMarquee"
import FireSafetyCarousel from "../components/FireSafetyCarousel"
import OurProducts from "../components/OurProducts"
import OurServices from "../components/OurServices"
import TextScrollWordReveal from "../components/TextScrollWordReveal"

function Home() {
  return (
    <>
      <section className="" id="home">
      <FireSafetyCarousel/>
      </section>

      <section className="" id="home">
      <CompanyLogoMarquee/>
      </section>

      <section className="" id="services">
      <OurServices/>
      </section>
      <section className="" id="products">
      <OurProducts/>
      </section>

      <TextScrollWordReveal/>

    </>
  )
}

export default Home
