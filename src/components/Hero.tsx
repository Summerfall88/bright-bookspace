import { Play, ArrowDown } from "lucide-react";
import heroImage from "@/assets/hero-books.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Image with dark overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Книги и атмосфера"
          className="w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <span 
            className="inline-block text-primary font-bold tracking-[0.3em] uppercase text-sm mb-6 opacity-0 animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            Книжный блог
          </span>
          
          <h1 
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-background leading-none mb-6 opacity-0 animate-fade-up tracking-tight"
            style={{ animationDelay: "0.2s" }}
          >
            Christina
            <span className="block text-primary">Evil</span>
          </h1>
          
          <p 
            className="text-lg md:text-xl text-background/80 max-w-xl mx-auto mb-10 opacity-0 animate-fade-up font-medium"
            style={{ animationDelay: "0.3s" }}
          >
            Честные обзоры на фэнтези, романы и современную литературу. Без розовых очков.
          </p>
          
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            <a
              href="#reviews"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-bold uppercase tracking-wide border-2 border-primary hover:bg-transparent hover:text-primary transition-all"
            >
              Читать обзоры
            </a>
            <a
              href="#videos"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-background font-bold uppercase tracking-wide border-2 border-background hover:bg-background hover:text-foreground transition-all"
            >
              <Play className="w-5 h-5" />
              Смотреть видео
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-up" style={{ animationDelay: "0.6s" }}>
        <a href="#about" className="text-background/50 hover:text-primary transition-colors">
          <ArrowDown className="w-8 h-8 animate-bounce" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
