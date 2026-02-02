import { BookMarked, Coffee, Heart, type LucideIcon } from "lucide-react";
import aboutPhoto from "@/assets/about-photo.jpg";
import { useContent } from "@/hooks/useContent";

const iconMap: Record<string, LucideIcon> = {
  BookMarked,
  Coffee,
  Heart
};

interface AboutContent {
  badge: string;
  heading: string;
  paragraph1: string;
  paragraph2: string;
  photo_url?: string;
  stats: Array<{
    icon: string;
    value: string;
    label: string;
  }>;
}

const About = () => {
  const { content, loading, isVisible } = useContent<AboutContent>("about");

  if (!isVisible) return null;

  return <section id="about" className="py-24 bg-white/[0.03]">
    <div className="container mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Image */}
        <div className="relative order-2 lg:order-1">
          <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-soft">
            <img
              src={content?.photo_url || aboutPhoto}
              alt="Кристина - автор блога"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Decorative elements */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-gold/20 rounded-full blur-2xl" />
        </div>

        {/* Content */}
        <div className="order-1 lg:order-2">
          <span className="inline-block text-primary font-medium tracking-widest uppercase text-sm mb-4">
            {content?.badge || "Обо мне"}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {content?.heading || "Привет, я Кристина - книжный энтузиаст"}
          </h2>
          <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
            {content?.paragraph1 || "Уже более 8 лет я делюсь своей любовью к литературе."}
          </p>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            {content?.paragraph2 || "Моя миссия - помочь вам найти книгу..."}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {content?.stats?.map((stat, index) => {
              const Icon = iconMap[stat.icon] || Heart;
              return (
                <div key={index} className="text-center p-4 rounded-xl bg-background shadow-soft hover-lift">
                  <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="font-serif text-2xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  </section>;
};
export default About;