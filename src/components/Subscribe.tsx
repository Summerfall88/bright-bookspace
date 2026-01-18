import { Mail, Sparkles } from "lucide-react";
import { useState } from "react";
const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
    }
  };
  return <section id="subscribe" className="py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">Не пропустите новые рецензии и обзоры</h2>
          <p className="text-muted-foreground text-lg mb-8">Подпишитесь на рассылку и получайте свежие обзоры книг прямо на почту. Никакого спама - только литература.</p>

          {isSubscribed ? <div className="bg-primary/10 text-primary p-6 rounded-2xl inline-flex items-center gap-3">
              <Sparkles className="w-6 h-6" />
              <span className="font-medium">Спасибо за подписку! Скоро напишем.</span>
            </div> : <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Ваш email" required className="flex-1 px-6 py-4 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
              <button type="submit" className="px-8 py-4 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-all hover-lift shadow-warm whitespace-nowrap">
                Подписаться
              </button>
            </form>}

          <p className="text-sm text-muted-foreground mt-4">Присоединяйтесь к моим читателям</p>
        </div>
      </div>
    </section>;
};
export default Subscribe;