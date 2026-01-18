import { BookMarked, Coffee, Heart } from "lucide-react";

const About = () => {
  const stats = [
    { icon: BookMarked, value: "150+", label: "Прочитанных книг" },
    { icon: Coffee, value: "300+", label: "Чашек кофе" },
    { icon: Heart, value: "50+", label: "Рецензий" },
  ];

  return (
    <section id="about" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-soft bg-accent">
              <div className="w-full h-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center">
                <BookMarked className="w-24 h-24 text-primary/30" />
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-gold/20 rounded-full blur-2xl" />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <span className="inline-block text-primary font-medium tracking-widest uppercase text-sm mb-4">
              Обо мне
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Привет, я Анна — <br />
              <span className="text-primary">книжный энтузиаст</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              Уже более 5 лет я делюсь своей любовью к литературе. Здесь вы найдёте 
              честные рецензии на современную прозу, классику и нон-фикшн. Каждая книга — 
              это новое приключение, и я приглашаю вас в это путешествие вместе со мной.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Моя миссия — помочь вам найти книгу, которая изменит ваш взгляд на мир 
              или просто подарит уютный вечер с чашкой чая.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="text-center p-4 rounded-xl bg-background shadow-soft hover-lift"
                >
                  <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="font-serif text-2xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
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
