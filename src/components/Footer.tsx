import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Twitter, Facebook, Github, Mail } from "lucide-react";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* CEO Info */}
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground mb-1">{t('home.ceoTitle')}</p>
            <p className="font-semibold text-foreground">{t('home.ceoName')}</p>
          </div>
          
          {/* Social Media & Contact */}
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                 className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
                <Twitter className="h-5 w-5 text-primary" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                 className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
                <Facebook className="h-5 w-5 text-primary" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                 className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
                <Github className="h-5 w-5 text-primary" />
              </a>
            </div>
            <a href="mailto:contact@kardium.finance" 
               className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <Mail className="h-4 w-4" />
              <span>Contact Us</span>
            </a>
          </div>
          
          {/* Logo & About */}
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 justify-center md:justify-end">
            <Link 
              to="/about" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {t('home.aboutButton')}
            </Link>
            <div className="text-center">
              <div className="h-8 w-8 rounded-lg bg-gradient-primary mx-auto mb-2"></div>
              <span className="text-xs font-medium bg-gradient-primary bg-clip-text text-transparent">
                Kardium Finance
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}