import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground mb-1">{t('home.ceoTitle')}</p>
            <p className="font-semibold text-foreground">{t('home.ceoName')}</p>
          </div>
          
          <div className="flex items-center space-x-6">
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