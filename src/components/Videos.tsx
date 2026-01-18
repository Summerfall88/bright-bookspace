import { Play, Youtube } from "lucide-react";

const videos = [
  {
    title: "Почему «Дом, в котором...» — лучшая книга",
    views: "45K просмотров",
    duration: "18:24",
  },
  {
    title: "ТОП-10 переоценённых книг BookTok",
    views: "120K просмотров",
    duration: "25:10",
  },
  {
    title: "Разбор «Четвёртого крыла» — хайп или годнота?",
    views: "78K просмотров",
    duration: "32:45",
  },
];

const Videos = () => {
  return (
    <section id="videos" className="py-24 bg-charcoal text-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4">
            Видеообзоры
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            Смотреть на YouTube
          </h2>
          <p className="text-background/60 text-lg">
            Подробные разборы, ранты и обсуждения книг в видеоформате
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {videos.map((video, index) => (
            <div
              key={index}
              className="group relative aspect-video bg-smoke/20 border-2 border-background/20 hover:border-primary transition-colors cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
                </div>
                <h3 className="font-bold text-center px-4 mb-2">{video.title}</h3>
                <div className="flex items-center gap-3 text-sm text-background/60">
                  <span>{video.views}</span>
                  <span>•</span>
                  <span>{video.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="#"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-bold uppercase tracking-wide border-2 border-primary hover:bg-transparent hover:text-primary transition-all"
          >
            <Youtube className="w-6 h-6" />
            Подписаться на канал
          </a>
        </div>
      </div>
    </section>
  );
};

export default Videos;
