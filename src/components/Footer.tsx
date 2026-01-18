import { Skull, Instagram, Youtube, Send } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Send, href: "#", label: "Telegram" },
  ];

  return (
    <footer className="py-12 bg-charcoal text-background border-t-2 border-background/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <Skull className="w-6 h-6 text-primary group-hover:rotate-12 transition-transform" />
            <span className="font-serif text-xl font-bold uppercase tracking-tight">
              Christina Evil
            </span>
          </a>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                aria-label={social.label}
                className="w-12 h-12 border-2 border-background/30 flex items-center justify-center hover:bg-primary hover:border-primary transition-all"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-background/50 font-medium">
            © 2024 Christina Evil. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
