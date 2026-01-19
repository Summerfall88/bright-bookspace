import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookCard from "@/components/BookCard";
import { reviews } from "@/data/reviews";

const ReviewsListPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-block text-primary font-medium tracking-widest uppercase text-sm mb-4">
                Рецензии
              </span>
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Все рецензии
              </h1>
              <p className="text-muted-foreground text-lg">
                Честные отзывы о книгах, которые стоит прочитать — от классики до современных бестселлеров
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {reviews.map((review, index) => (
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
      </main>
      <Footer />
    </div>
  );
};

export default ReviewsListPage;
