import { Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Pool() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Card className="w-full max-w-md mx-4 bg-gradient-card shadow-card">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <Lock className="h-16 w-16 mx-auto text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Pool Access Restricted</h1>
          <p className="text-muted-foreground">
            This page is currently not accessible. Please check back later for liquidity pool features.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}