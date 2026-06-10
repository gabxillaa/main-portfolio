import Footer from "./components/footer";
import AboutMe from "./components/landing-page/about-me";
import ContactSection from "./components/landing-page/contact-me";
import DidYouLikeIt from "./components/landing-page/did-you-like-it";
import Hero from "./components/landing-page/hero";
import ArcCarousel from "./components/landing-page/projects";
import TechStack from "./components/landing-page/tech-stack";
import Navbar from "./components/navbar";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-(--background) text-(--text) font-(--font-urbanist)">
      <Navbar />
      <Hero />

      <AboutMe />

      {/* Subtle Dissolving Divider with Transparent Background */}
      <div
        className="w-full h-[1px]"
        style={{
          background: "linear-gradient(90deg, transparent 5%, #e5e7eb 50%, transparent 95%)"
        }}
      />

      <ArcCarousel />

      <div
        className="w-full h-[1px]"
        style={{
          background: "linear-gradient(90deg, transparent 5%, #e5e7eb 50%, transparent 95%)"
        }}
      />

      <DidYouLikeIt />

      {/* Subtle Dissolving Divider with Transparent Background */}
      <div
        className="w-full h-[1px]"
        style={{
          background: "linear-gradient(90deg, transparent 5%, #e5e7eb 50%, transparent 95%)"
        }}
      />

      <TechStack />

      {/* Subtle Dissolving Divider with Transparent Background */}
      <div
        className="w-full h-[1px]"
        style={{
          background: "linear-gradient(90deg, transparent 5%, #e5e7eb 50%, transparent 95%)"
        }}
      />

      <ContactSection />

      <Footer />
    </main>
  );
}