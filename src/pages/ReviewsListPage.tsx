import { useEffect, useState, useMemo } from "react";
import { Search, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookCard from "@/components/BookCard";
import { Input } from "@/components/ui/input";
import { useReviews } from "@/hooks/useReviews";
import { useContent } from "@/hooks/useContent";
import { Skeleton } from "@/components/ui/skeleton";

const ReviewsListPage = () => {
  const [search, setSearch] = useState("");
  const { reviews, loading: reviewsLoading } = useReviews();
  const { content, loading: contentLoading } = useContent("reviews_page");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredReviews = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return reviews;
    return reviews.filter(
      (r) =>
        r.title.toLowerCase().includes(q) || r.author.toLowerCase().includes(q)
    );
  }, [search, reviews]);

  const loading = reviewsLoading || contentLoading;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-block text-primary font-medium tracking-widest uppercase text-sm mb-4">
                {content?.badge || "Рецензии"}
              </span>
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                {content?.heading || "Все рецензии"}
              </h1>
              <p className="text-muted-foreground text-lg mb-10">
                {content?.description || "Честные отзывы о книгах, которые стоит прочитать — от классики до современных бестселлеров"}
              </p>

              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={content?.search_placeholder || "Поиск по названию книги или автору..."}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-12 h-12 text-base bg-background/50 border-border focus-visible:ring-primary"
                  aria-label="Поиск рецензий по названию или автору"
                />
              </div>
            </div>

            {loading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="h-[400px] w-full rounded-xl" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : filteredReviews.length === 0 ? (
              <p className="text-center text-muted-foreground py-12">
                {content?.empty_message?.replace("{query}", search.trim()) ||
                  `По запросу «${search.trim()}» ничего не найдено. Попробуйте изменить запрос.`}
              </p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredReviews.map((review, index) => (
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
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ReviewsListPage;
