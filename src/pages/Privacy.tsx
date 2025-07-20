import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Privacy() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            {t('privacy.title')}
          </h1>
          <p className="text-muted-foreground">
            Your privacy and data protection are our top priorities
          </p>
        </div>

        <Card className="bg-gradient-card shadow-card border-border/50">
          <CardHeader>
            <CardTitle className="text-center">{t('privacy.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <div className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                {t('privacy.content')}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}