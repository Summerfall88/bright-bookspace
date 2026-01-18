import { Star, Flame, Skull } from "lucide-react";

interface BookCardProps {
  title: string;
  author: string;
  rating: number;
  genre: string;
  verdict: "fire" | "trash" | "okay";
  excerpt: string;
}

const BookCard = ({ title, author, rating, genre, verdict, excerpt }: BookCardProps) => {
  const verdictConfig = {
    fire: { icon: Flame, label: "Огонь", color: "bg-primary text-primary-foreground" },
    trash: { icon: Skull, label: "Мусор", color: "bg-charcoal text-background" },
    okay: { icon: Star, label: "Норм", color: "bg-smoke text-background" },
  };

  const VerdictIcon = verdictConfig[verdict].icon;

  return (
    <article className="group bg-card border-brutal hover-brutal transition-all duration-200">
      {/* Book Cover */}
      <div className="aspect-[3/4] relative overflow-hidden bg-charcoal">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <h3 className="font-serif text-xl text-background font-bold mb-2 line-clamp-3">
            {title}
          </h3>
          <p className="text-sm text-background/60">{author}</p>
        </div>
        
        {/* Verdict Badge */}
        <div className={`absolute top-3 right-3 ${verdictConfig[verdict].color} px-3 py-1 flex items-center gap-1 font-bold text-xs uppercase`}>
          <VerdictIcon className="w-3 h-3" />
          {verdictConfig[verdict].label}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 border-t-2 border-foreground">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-primary uppercase tracking-wide">
            {genre}
          </span>
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < rating ? "text-primary fill-primary" : "text-border"
                }`}
              />
            ))}
          </div>
        </div>
        
        <h3 className="font-serif text-lg font-bold text-card-foreground mb-1 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mb-3">{author}</p>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {excerpt}
        </p>
      </div>
    </article>
  );
};

export default BookCard;
