import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Star, Calendar, BookOpen, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useReview } from "@/hooks/useReviews";
import { Skeleton } from "@/components/ui/skeleton";

const ReviewPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { id } = useParams<{ id: string }>();
  const { review, loading } = useReview(id || "");

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="pt-24">
          <Skeleton className="h-[400px] w-full" />
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-3xl mx-auto space-y-8">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!review) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-24">
          <div className="text-center">
            <h1 className="font-serif text-3xl font-bold text-foreground mb-4">
              Рецензия не найдена
            </h1>
            <Link
              to="/reviews"
              className="text-primary hover:underline inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Вернуться к рецензиям
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className={`relative overflow-hidden py-16 md:py-24 ${!review.cover_image_url ? review.cover_color : 'bg-foreground'}`}>
          {review.cover_image_url && (
            <>
              <div className="absolute inset-0 z-0">
                <img
                  src={review.cover_image_url}
                  alt=""
                  className="w-full h-full object-cover blur-sm opacity-50 scale-105"
                />
                <div className="absolute inset-0 bg-black/60 shadow-inner" />
              </div>
            </>
          )}

          <div className="container relative z-10 mx-auto px-4">
            <Link
              to="/reviews"
              className="inline-flex items-center gap-2 text-background/80 hover:text-background mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Все рецензии
            </Link>

            <div className="max-w-4xl text-background">
              <span className="inline-block text-background/70 text-sm font-medium tracking-widest uppercase mb-4">
                {review.genre}
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-sm">
                {review.title}
              </h1>
              <p className="text-xl text-background/80 mb-6">{review.author}</p>

              <div className="flex flex-wrap items-center gap-6 text-background/70">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < review.rating ? "text-gold fill-gold" : "text-background/30"
                        }`}
                    />
                  ))}
                  <span className="ml-2 font-medium">{review.rating}/5</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {review.published_date}
                </div>
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <BookOpen className="w-4 h-4" />
                  ~5 мин чтения
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              {/* Excerpt */}
              <blockquote className="text-xl md:text-2xl text-muted-foreground italic border-l-4 border-primary pl-6 mb-12">
                {review.excerpt}
              </blockquote>

              {/* Full Review Content */}
              <article className="prose prose-lg dark:prose-invert max-w-none">
                {review.full_review.split('\n\n').map((paragraph, index) => {
                  // This is a simple Markdown-like parser for the database content
                  if (paragraph.startsWith('# ')) {
                    return <h1 key={index} className="font-serif font-bold text-foreground mt-12 mb-6">{paragraph.replace('# ', '')}</h1>;
                  }
                  if (paragraph.startsWith('## ')) {
                    return <h2 key={index} className="font-serif font-bold text-foreground mt-10 mb-5">{paragraph.replace('## ', '')}</h2>;
                  }
                  if (paragraph.startsWith('### ')) {
                    return <h3 key={index} className="font-serif font-bold text-foreground mt-8 mb-4">{paragraph.replace('### ', '')}</h3>;
                  }
                  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return (
                      <h3 key={index} className="font-serif text-xl font-bold text-foreground mt-8 mb-4">
                        {paragraph.replace(/\*\*/g, '')}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith('- ')) {
                    const items = paragraph.split('\n');
                    return (
                      <ul key={index} className="list-disc list-inside space-y-2 my-4 text-muted-foreground">
                        {items.map((item, i) => (
                          <li key={i}>{item.replace('- ', '')}</li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p key={index} className="text-muted-foreground leading-relaxed mb-6">
                      {paragraph}
                    </p>
                  );
                })}
              </article>

              {/* Back Link */}
              <div className="mt-16 pt-8 border-t border-border">
                <Link
                  to="/reviews"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Вернуться к списку рецензий
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ReviewPage;
