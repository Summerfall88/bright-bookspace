import { Star } from "lucide-react";
import { Link } from "react-router-dom";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  rating: number;
  genre: string;
  excerpt: string;
  coverColor: string;
  coverImage?: string;
}

const BookCard = ({ id, title, author, rating, genre, excerpt, coverColor, coverImage }: BookCardProps) => {
  return (
    <Link to={`/review/${id}`}>
      <article className="group cursor-pointer">
        {/* 3D Book Container */}
        <div className="relative mb-6" style={{ perspective: "1000px" }}>
          <div
            className="relative transition-transform duration-500 group-hover:rotate-y-[-5deg]"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Book Shadow */}
            <div className="absolute -bottom-4 left-4 right-4 h-8 bg-foreground/10 blur-xl rounded-full transition-all duration-300 group-hover:blur-2xl group-hover:-bottom-6" />

            {/* Book Spine (Left Edge) */}
            <div
              className={`absolute left-0 top-0 bottom-0 w-4 ${coverColor} rounded-l-md`}
              style={{
                transform: "translateX(-12px) rotateY(-90deg)",
                transformOrigin: "right center",
                boxShadow: "inset -2px 0 4px rgba(0,0,0,0.2)"
              }}
            />

            {/* Book Pages (Right Edge) */}
            <div
              className="absolute right-0 top-2 bottom-2 w-3 bg-gradient-to-r from-cream to-background rounded-r-md"
              style={{
                boxShadow: "inset -1px 0 2px rgba(0,0,0,0.1)",
                background: "repeating-linear-gradient(to bottom, hsl(var(--cream)) 0px, hsl(var(--cream)) 2px, hsl(var(--background)) 2px, hsl(var(--background)) 4px)"
              }}
            />

            {/* Main Book Cover */}
            <div
              className={`aspect-[3/4] relative overflow-hidden ${coverColor} rounded-md shadow-2xl`}
              style={{
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.35), 0 12px 24px -8px rgba(0, 0, 0, 0.2)"
              }}
            >
              {coverImage ? (
                <img
                  src={coverImage}
                  alt={title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <>
                  {/* Cover Texture Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20" />

                  {/* Cover Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                    <div className="w-16 h-0.5 bg-background/40 mb-6 rounded-full" />
                    <h3 className="font-serif text-xl md:text-2xl text-background font-bold mb-3 line-clamp-3 drop-shadow-sm">
                      {title}
                    </h3>
                    <p className="text-sm text-background/80 font-medium tracking-wide">
                      {author}
                    </p>
                    <div className="w-10 h-0.5 bg-background/40 mt-6 rounded-full" />
                  </div>
                </>
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-foreground/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm shadow-inner">
                <span className="text-background font-medium text-lg">Читать рецензию →</span>
              </div>

              {/* Spine highlight */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-r from-black/30 to-transparent" />
            </div>
          </div>
        </div>

        {/* Content Below Book */}
        <div className="px-2">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
              {genre}
            </span>
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < rating ? "text-gold fill-gold" : "text-border"
                    }`}
                />
              ))}
            </div>
          </div>

          <h3 className="font-serif text-lg font-semibold text-card-foreground mb-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">{author}</p>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {excerpt}
          </p>
        </div>
      </article>
    </Link>
  );
};

export default BookCard;
