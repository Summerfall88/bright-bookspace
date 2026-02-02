import heroImage from "@/assets/hero-books.jpg";
import { useContent } from "@/hooks/useContent";

interface HeroContent {
  badge: string;
  heading: string;
  description: string;
  cta_text: string;
  cta_link: string;
  background_image?: string;
}

const Hero = () => {
  const { content, loading, isVisible } = useContent<HeroContent>("hero");

  if (!isVisible) return null;

  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
    {/* Background Image */}
    <div className="absolute inset-0 z-0">
      <img
        src={content?.background_image || heroImage}
        alt="Уютная атмосфера с книгами"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
    </div>

    {/* Content */}
    <div className="relative z-10 container mx-auto px-4 text-center">
      <div className="max-w-3xl mx-auto">
        <span className="inline-block text-primary font-medium tracking-widest uppercase text-sm mb-6 opacity-0 animate-fade-up" style={{
          animationDelay: "0.1s"
        }}>
          {content?.badge || "Книжный блог"}
        </span>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6 opacity-0 animate-fade-up break-words" style={{
          animationDelay: "0.2s"
        }}>
          {content?.heading || "Christina Evilbook"}
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 opacity-0 animate-fade-up" style={{
          animationDelay: "0.3s"
        }}>
          {content?.description || "Путешествия по страницам книг, честные рецензии и литературные открытия для настоящих книголюбов"}
        </p>

        <div className="flex justify-center opacity-0 animate-fade-up" style={{
          animationDelay: "0.4s"
        }}>
          <a href={content?.cta_link || "#reviews"} className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-all hover-lift shadow-warm">
            {content?.cta_text || "Читать рецензии"}
          </a>
        </div>
      </div>
    </div>

    {/* Scroll Indicator */}
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-up" style={{
      animationDelay: "0.6s"
    }}>
      <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center opacity-5">
        <div className="w-1.5 h-3 bg-primary rounded-full mt-2 animate-bounce" />
      </div>
    </div>
  </section>;
};
export default Hero;