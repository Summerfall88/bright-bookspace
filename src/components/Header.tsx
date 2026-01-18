import { BookOpen, Menu, X } from "lucide-react";
import { useState } from "react";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = [{
    href: "#about",
    label: "Обо мне"
  }, {
    href: "#reviews",
    label: "Рецензии"
  }, {
    href: "#subscribe",
    label: "Подписка"
  }];
  return <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <BookOpen className="w-6 h-6 text-primary transition-transform group-hover:rotate-12" />
            <span className="font-serif text-xl font-semibold text-foreground">
              EvilBook
            </span>
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map(link => <li key={link.href}>
                <a href={link.href} className="text-muted-foreground hover:text-primary transition-colors font-medium text-sm tracking-wide">
                  {link.label}
                </a>
              </li>)}
          </ul>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-foreground" aria-label="Toggle menu">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && <ul className="md:hidden mt-4 pb-4 flex flex-col gap-4 animate-fade-up">
            {navLinks.map(link => <li key={link.href}>
                <a href={link.href} onClick={() => setIsMenuOpen(false)} className="block text-muted-foreground hover:text-primary transition-colors font-medium">
                  {link.label}
                </a>
              </li>)}
          </ul>}
      </div>
    </header>;
};
export default Header;