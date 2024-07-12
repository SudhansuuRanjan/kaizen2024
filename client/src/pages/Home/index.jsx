import About from '../../components/HomePage/About'
import ArtistLineup from '../../components/HomePage/ArtistLineup'
import EventCategory from '../../components/HomePage/EventCategory'
import FAQs from '../../components/HomePage/FAQs'
import Highlights from '../../components/HomePage/Highlights'
import ParallaxComponent from '../../components/HomePage/ParallaxComponent'
import Timer from '../../components/HomePage/Timer'
import Sponsors from '../../components/HomePage/Sponsors'
import NavBar from '../../components/HomePage/NavBar'
import ChiefPatron from '../../components/HomePage/ChiefPatron'
import CAPopup from '../../components/HomePage/CAPopup'
import EventSchedule from '../../components/HomePage/EventSchedule'


const Home = () => {
  document.title = "KAIZEN 2024"
  return (
    <div className="w-[100%] overflow-hidden">
      <ParallaxComponent />
      <Timer />
      <EventCategory />
      <ArtistLineup />
      <About />
      <Highlights />
      <CAPopup />
      <ChiefPatron />
      <Sponsors />
      <FAQs />
      <EventSchedule />
    </div>
  )
}

export default Home