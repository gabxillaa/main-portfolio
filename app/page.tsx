import Footer from "./components/footer";
import AboutMe from "./components/landing-page/about-me";
import ContactSection from "./components/landing-page/contact-me";
import DidYouLikeIt from "./components/landing-page/did-you-like-it";
import Hero from "./components/landing-page/hero";
import ArcCarousel from "./components/landing-page/projects";
import TechStack from "./components/landing-page/tech-stack";
import Navbar from "./components/navbar";
import Divider from "./components/ui/divider";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-(--background) text-(--text) font-(--font-urbanist)">
      <Navbar />
      <Hero />
      <AboutMe />
      <Divider />
      <ArcCarousel />
      <Divider />
      <DidYouLikeIt />
      <Divider />
      <TechStack />
      <Divider />
      <ContactSection />
      <Footer />
    </main>
  );
}