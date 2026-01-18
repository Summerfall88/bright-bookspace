import { BookMarked, Video, Flame, Skull } from "lucide-react";

const About = () => {
  const stats = [
    { icon: BookMarked, value: "200+", label: "Книг прочитано" },
    { icon: Video, value: "100+", label: "Видеообзоров" },
    { icon: Flame, value: "15K", label: "Подписчиков" },
  ];

  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image placeholder with brutal style */}
          <div className="relative order-2 lg:order-1">
            <div className="aspect-[4/5] bg-charcoal border-brutal overflow-hidden shadow-brutal">
              <div className="w-full h-full flex items-center justify-center">
                <Skull className="w-32 h-32 text-primary/50" />
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-primary -z-10" />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <span className="inline-block text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4">
              Обо мне
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6 leading-tight">
              Привет, я Кристина
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              Книжный маньяк, который не боится говорить правду о книгах. 
              Здесь вы найдёте честные обзоры и видеообзоры на <strong className="text-foreground">фэнтези</strong>, 
              <strong className="text-foreground"> романы</strong> и <strong className="text-foreground">современную литературу</strong>.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Никаких слащавых рецензий и притворной любви к каждой книге. 
              Если книга — отстой, вы об этом узнаете. Если шедевр — тоже.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="text-center p-4 border-brutal bg-card hover-brutal"
                >
                  <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="font-serif text-2xl font-black text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wide font-semibold">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
