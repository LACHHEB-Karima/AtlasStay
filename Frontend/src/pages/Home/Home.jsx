import Hero from "../../components/Hero";
import SearchBar from "../../components/SearchBar";
import Activities from "../../components/Activities";
import RoomsSection from "../../components/Rooms/RoomSection";
import Testimonials from "../../components/Testimonials/Testimonials";
import Footer from "../../components/Footer";

const Home = () => {
    return (
        <>
        <Hero />
        <SearchBar />
        <Activities />
        <RoomsSection />
        <Testimonials />
        <Footer />
      </>
      );
}

export default Home;