import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, Calendar, BookOpen } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getReviewById } from "@/data/reviews";

const ReviewPage = () => {
  const { id } = useParams<{ id: string }>();
  const review = id ? getReviewById(id) : undefined;

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
              to="/#reviews" 
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
        <section className={`${review.coverColor} py-16 md:py-24`}>
          <div className="container mx-auto px-4">
            <Link 
              to="/#reviews" 
              className="inline-flex items-center gap-2 text-background/80 hover:text-background mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Все рецензии
            </Link>
            
            <div className="max-w-4xl">
              <span className="inline-block text-background/70 text-sm font-medium tracking-widest uppercase mb-4">
                {review.genre}
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-4">
                {review.title}
              </h1>
              <p className="text-xl text-background/80 mb-6">{review.author}</p>
              
              <div className="flex flex-wrap items-center gap-6 text-background/70">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < review.rating ? "text-gold fill-gold" : "text-background/30"
                      }`}
                    />
                  ))}
                  <span className="ml-2">{review.rating}/5</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {review.publishedDate}
                </div>
                <div className="flex items-center gap-2">
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

              {/* Full Review */}
              <article className="prose prose-lg max-w-none">
                {review.fullReview.split('\n\n').map((paragraph, index) => {
                  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return (
                      <h3 key={index} className="font-serif text-xl font-bold text-foreground mt-8 mb-4">
                        {paragraph.replace(/\*\*/g, '')}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith('**')) {
                    const [title, ...rest] = paragraph.split(':**');
                    return (
                      <div key={index} className="my-6">
                        <h4 className="font-semibold text-foreground mb-2">
                          {title.replace(/\*\*/g, '')}:
                        </h4>
                        <p className="text-muted-foreground leading-relaxed">
                          {rest.join(':**')}
                        </p>
                      </div>
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
                  to="/#reviews" 
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
