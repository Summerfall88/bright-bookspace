import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Reviews from "@/components/Reviews";
import Videos from "@/components/Videos";
import Subscribe from "@/components/Subscribe";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <About />
        <Reviews />
        <Videos />
        <Subscribe />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
