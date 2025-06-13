import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Benefits from '../components/Benefits';
import About from '../components/About';
import Services from '../components/Services';
import BookingSteps from '../components/BookingSteps';
import Testimonials from '../components/Testimonials';
import Booking from '../pages/Booking';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Stats from '../components/Stats';
import PaymentMethods from '../components/PaymentMethods';

export default function Home() {
  return (
    <main className="bg-white min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <Stats />
      <About />
      <Testimonials />
      <BookingSteps />
      <PaymentMethods />
      <Booking />
      <Contact  />
      <Footer />
    </main>
  );
}