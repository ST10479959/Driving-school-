import { Toaster } from "@/components/ui/sonner";
import "@/App.css";
import Header from "@/components/site/Header";
import Hero from "@/components/site/Hero";
import TrustMarquee from "@/components/site/TrustMarquee";
import Services from "@/components/site/Services";
import About from "@/components/site/About";
import Gallery from "@/components/site/Gallery";
import Reviews from "@/components/site/Reviews";
import QuoteForm from "@/components/site/QuoteForm";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";
import FloatingCTA from "@/components/site/FloatingCTA";

function App() {
  return (
    <div className="App font-body bg-neutral-50 text-neutral-950">
      <Header />
      <main>
        <Hero />
        <TrustMarquee />
        <Services />
        <About />
        <Gallery />
        <Reviews />
        <QuoteForm />
        <Contact />
      </main>
      <Footer />
      <FloatingCTA />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: 0,
            border: "1px solid #e5e5e5",
            fontFamily: "Manrope, sans-serif",
          },
        }}
      />
    </div>
  );
}

export default App;
