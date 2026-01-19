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
}

const BookCard = ({ id, title, author, rating, genre, excerpt, coverColor }: BookCardProps) => {
  return (
    <Link to={`/review/${id}`}>
      <article className="group bg-card rounded-2xl overflow-hidden shadow-soft hover-lift hover:shadow-warm transition-all duration-300 cursor-pointer">
        {/* Book Cover Simulation */}
        <div 
          className={`aspect-[3/4] relative overflow-hidden ${coverColor}`}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-1 bg-background/30 mb-4 rounded-full" />
            <h3 className="font-serif text-xl text-background/90 font-semibold mb-2 line-clamp-2">
              {title}
            </h3>
            <p className="text-sm text-background/70">{author}</p>
            <div className="w-8 h-1 bg-background/30 mt-4 rounded-full" />
          </div>
          
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-foreground/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-background font-medium">Читать рецензию →</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
              {genre}
            </span>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < rating ? "text-gold fill-gold" : "text-border"
                  }`}
                />
              ))}
            </div>
          </div>
          
          <h3 className="font-serif text-lg font-semibold text-card-foreground mb-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">{author}</p>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {excerpt}
          </p>
        </div>
      </article>
    </Link>
  );
};

export default BookCard;
