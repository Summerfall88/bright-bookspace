import BookCard from "./BookCard";

const reviews = [
  {
    title: "Маленькая Жзн",
    author: "Ханья Янагихара",
    rating: 5,
    genre: "Современная проза",
    excerpt: "Книга, которая разобьёт вам сердце и соберёт его заново. История о дружбе, травме и силе человеческого духа.",
    coverColor: "bg-gradient-to-br from-primary to-primary/70",
  },
  {
    title: "Сто лет одиночества",
    author: "Габриэль Гарсиа Маркес",
    rating: 5,
    genre: "Магический реализм",
    excerpt: "Эпическая сага о семье Буэндиа — это не просто книга, это целый мир, в который погружаешься с головой.",
    coverColor: "bg-gradient-to-br from-warm-brown to-warm-brown/70",
  },
  {
    title: "Норвежский лес",
    author: "Харуки Мураками",
    rating: 4,
    genre: "Современная проза",
    excerpt: "Нежная и меланхоличная история о любви, потере и взрослении. Мураками в своём лучшем проявлении.",
    coverColor: "bg-gradient-to-br from-sage to-sage/50",
  },
  {
    title: "Думай медленно... решай быстро",
    author: "Даниэль Канеман",
    rating: 4,
    genre: "Нон-фикшн",
    excerpt: "Увлекательное путешествие в мир когнитивных искажений. Книга изменит ваш взгляд на принятие решений.",
    coverColor: "bg-gradient-to-br from-gold/80 to-gold/50",
  },
  {
    title: "1984",
    author: "Джордж Оруэлл",
    rating: 5,
    genre: "Классика",
    excerpt: "Пугающе актуальная антиутопия о тоталитаризме и свободе мысли. Классика, которую нужно перечитывать.",
    coverColor: "bg-gradient-to-br from-foreground to-foreground/70",
  },
  {
    title: "Атлант расправил плечи",
    author: "Айн Рэнд",
    rating: 4,
    genre: "Философская проза",
    excerpt: "Монументальный роман о творцах и тех, кто живёт за их счёт. Книга вызывает споры, но заставляет думать.",
    coverColor: "bg-gradient-to-br from-terracotta to-terracotta/70",
  },
];

const Reviews = () => {
  return (
    <section id="reviews" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-primary font-medium tracking-widest uppercase text-sm mb-4">
            Рецензии
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Последние прочитанные
          </h2>
          <p className="text-muted-foreground text-lg">
            Честные отзывы о книгах, которые стоит прочитать — от классики до современных бестселлеров
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
