import { Mail, Zap } from "lucide-react";
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

  return (
    <section id="subscribe" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="border-brutal bg-card p-8 md:p-12 shadow-brutal">
            <div className="text-center">
              <Mail className="w-12 h-12 text-primary mx-auto mb-6" />
              
              <h2 className="font-serif text-3xl md:text-4xl font-black text-foreground mb-4">
                Хочешь ещё?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Подписывайся на рассылку — свежие обзоры, эксклюзивный контент и никакого спама.
              </p>

              {isSubscribed ? (
                <div className="bg-primary text-primary-foreground p-6 border-2 border-foreground inline-flex items-center gap-3">
                  <Zap className="w-6 h-6" />
                  <span className="font-bold uppercase">Ты в деле! Жди писем.</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="твой@email.com"
                    required
                    className="flex-1 px-6 py-4 bg-background border-brutal text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all font-medium"
                  />
                  <button
                    type="submit"
                    className="px-8 py-4 bg-primary text-primary-foreground font-bold uppercase tracking-wide border-2 border-primary hover:bg-foreground hover:border-foreground transition-all whitespace-nowrap"
                  >
                    Подписаться
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Subscribe;
