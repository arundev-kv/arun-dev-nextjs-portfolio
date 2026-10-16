import AboutSection from '@/components/AboutSection';
import BackgroundSection from '@/components/BackgroundSection';
import CareerTrack from '@/components/CareerTrack';
import FieldNotes from '@/components/FieldNotes';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import SiteHeader from '@/components/SiteHeader';
import SystemsMap from '@/components/SystemsMap';
import { portfolio } from '@/data/portfolio';

export default function HomePage() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content">
        <Hero />
        <AboutSection />
        <CareerTrack items={portfolio.experience} />
        <SystemsMap />
        <FieldNotes />
        <BackgroundSection />
      </main>
      <Footer />
    </>
  );
}
