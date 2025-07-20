import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-6">
          <Link to="/">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            {t('about.title')}
          </h1>
          <p className="text-muted-foreground">
            Learn more about our mission, vision, and the team behind Kardium Finance
          </p>
        </div>

        <Card className="bg-gradient-card shadow-card border-border/50">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center space-x-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-primary"></div>
              <span>{t('about.title')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <div className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                {t('about.content')}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}