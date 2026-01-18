import { BookOpen, Instagram, Send, Youtube } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Send, href: "#", label: "Telegram" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="py-12 bg-foreground text-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <BookOpen className="w-6 h-6 text-primary-foreground/80 group-hover:text-primary transition-colors" />
            <span className="font-serif text-xl font-semibold">
              Между строк
            </span>
          </a>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-background/60">
            © 2024 Между строк. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
