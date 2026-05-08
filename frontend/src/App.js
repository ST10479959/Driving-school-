import { Toaster } from "@/components/ui/sonner";
import "@/App.css";
import Header from "@/components/site/Header";
import Hero from "@/components/site/Hero";
import TrustMarquee from "@/components/site/TrustMarquee";
import Services from "@/components/site/Services";
import About from "@/components/site/About";
import WhyChoose from "@/components/site/WhyChoose";
import Hours from "@/components/site/Hours";
import Testimonials from "@/components/site/Testimonials";
import BookLesson from "@/components/site/QuoteForm";
import FAQ from "@/components/site/FAQ";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";
import FloatingCTA from "@/components/site/FloatingCTA";

function App() {
  return (
    <div className="App font-body bg-[#fafafa] text-[#0a0a0a]">
      <Header />
      <main>
        <Hero />
        <TrustMarquee />
        <Services />
        <About />
        <WhyChoose />
        <Hours />
        <Testimonials />
        <BookLesson />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingCTA />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: 0,
            border: "2px solid #0a0a0a",
            fontFamily: "Work Sans, sans-serif",
            boxShadow: "4px 4px 0 0 rgba(10, 10, 10, 1)",
          },
        }}
      />
    </div>
  );
}

export default App;
