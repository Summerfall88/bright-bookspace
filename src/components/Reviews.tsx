import BookCard from "./BookCard";

const reviews = [
  {
    title: "Дом, в котором...",
    author: "Мариам Петросян",
    rating: 5,
    genre: "Современная проза",
    verdict: "fire" as const,
    excerpt: "Абсолютный шедевр. Книга, которая засядет в голове навсегда. Атмосфера, персонажи, язык — всё на высшем уровне.",
  },
  {
    title: "Сара Дж. Маас — Дом Земли и Крови",
    author: "Сара Дж. Маас",
    rating: 2,
    genre: "Фэнтези",
    verdict: "trash" as const,
    excerpt: "700 страниц скуки. Романтика уровня фанфика, сюжет предсказуем. Хайп не оправдан.",
  },
  {
    title: "Имя ветра",
    author: "Патрик Ротфусс",
    rating: 5,
    genre: "Фэнтези",
    verdict: "fire" as const,
    excerpt: "Лучшее фэнтези десятилетия. Квоут — гений, проза — поэзия. Жаль, что третьей книги не будет никогда.",
  },
  {
    title: "Убийство в Восточном экспрессе",
    author: "Агата Кристи",
    rating: 4,
    genre: "Детектив",
    verdict: "okay" as const,
    excerpt: "Классика, которая до сих пор держит планку. Финал спорный, но это Кристи — её можно.",
  },
  {
    title: "Четвёртое крыло",
    author: "Ребекка Яррос",
    rating: 3,
    genre: "Романтическое фэнтези",
    verdict: "okay" as const,
    excerpt: "Guilty pleasure. Драконы горячие, романтика предсказуемая, но затягивает. На один раз сойдёт.",
  },
  {
    title: "После",
    author: "Анна Тодд",
    rating: 1,
    genre: "Современный роман",
    verdict: "trash" as const,
    excerpt: "Токсичные отношения, возведённые в романтику. Не рекомендую никому с самоуважением.",
  },
];

const Reviews = () => {
  return (
    <section id="reviews" className="py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4">
            Обзоры
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6">
            Последние жертвы
          </h2>
          <p className="text-muted-foreground text-lg">
            Честные оценки без цензуры. Огонь, мусор или так себе — узнаете здесь.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="opacity-0 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <BookCard {...review} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
