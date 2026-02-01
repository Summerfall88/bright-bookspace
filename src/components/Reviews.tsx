import { Link } from "react-router-dom";
import BookCard from "./BookCard";
import { useReviews } from "@/hooks/useReviews";
import { useContent } from "@/hooks/useContent";
import { Skeleton } from "./ui/skeleton";

const Reviews = () => {
  const { reviews, loading: reviewsLoading } = useReviews();
  const { content, loading: contentLoading, isVisible } = useContent("reviews_section");

  if (!isVisible) return null;

  const loading = reviewsLoading || contentLoading;

  return (
    <section id="reviews" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Link
            to="/reviews"
            className="inline-block text-primary font-medium tracking-widest uppercase text-sm mb-4 hover:text-primary/80 transition-colors"
          >
            {content?.badge || "Рецензии"}
          </Link>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {content?.heading || "Последние прочитанные"}
          </h2>
          <p className="text-muted-foreground text-lg">
            {content?.description || "Честные отзывы о книгах, которые стоит прочитать — от классики до современных бестселлеров"}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-[400px] w-full rounded-xl" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))
          ) : (
            reviews.slice(0, content?.cards_count || 6).map((review, index) => (
              <div
                key={review.id}
                className="opacity-0 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <BookCard
                  id={review.id}
                  title={review.title}
                  author={review.author}
                  rating={review.rating}
                  genre={review.genre}
                  excerpt={review.excerpt}
                  coverColor={review.cover_color}
                  coverImage={review.cover_image_url || undefined}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Reviews;