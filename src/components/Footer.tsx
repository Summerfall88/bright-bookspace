import { BookOpen, Instagram, Send, Youtube, Music, Globe } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const Footer = () => {
  const { settings } = useSiteSettings("branding", "social_links");
  const branding = settings.branding || {};
  const socialLinksData = settings.social_links || {};

  const allSocialLinks = [
    {
      icon: Instagram,
      href: socialLinksData.instagram,
      customIcon: socialLinksData.instagram_icon_url,
      label: "Instagram",
    },
    {
      icon: Send,
      href: socialLinksData.telegram,
      customIcon: socialLinksData.telegram_icon_url,
      label: "Telegram",
    },
    {
      icon: Youtube,
      href: socialLinksData.youtube,
      customIcon: socialLinksData.youtube_icon_url,
      label: "YouTube",
    },
    {
      icon: Music,
      href: socialLinksData.tiktok,
      customIcon: socialLinksData.tiktok_icon_url,
      label: "TikTok",
    },
    {
      icon: Globe,
      href: socialLinksData.vk,
      customIcon: socialLinksData.vk_icon_url,
      label: "VK",
    },
  ];

  const socialLinks = allSocialLinks.filter((link) => link.href);

  return <footer className="py-12 bg-foreground text-background">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          {branding.logo_icon_url ? (
            <img src={branding.logo_icon_url} alt="Logo" className="w-6 h-6 object-contain" />
          ) : (
            <BookOpen className="w-6 h-6 text-primary-foreground/80 group-hover:text-primary transition-colors" />
          )}
          <span className="font-serif text-xl font-semibold">
            {branding.site_name || "Evilbook"}
          </span>
        </a>

        {/* Social Links */}
        <div className="flex items-center gap-4">
          {socialLinks.map((social, index) => <a key={index} href={social.href} aria-label={social.label} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all overflow-hidden p-2">
            {social.customIcon ? (
              <img src={social.customIcon} alt={social.label} className="w-full h-full object-contain" />
            ) : (
              <social.icon className="w-5 h-5" />
            )}
          </a>)}
        </div>

        {/* Copyright */}
        <p className="text-sm text-background/60">
          {branding.copyright || `© ${new Date().getFullYear()} Evilbook. Все права защищены.`}
        </p>
      </div>
    </div>
  </footer>;
};
export default Footer;