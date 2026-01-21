import BookCard from "./BookCard";
import { reviews } from "@/data/reviews/index";

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
          {reviews.slice(0, 6).map((review, index) => (
            <div 
              key={review.id} 
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