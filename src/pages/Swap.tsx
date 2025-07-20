import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const tokens = [
  { symbol: "MONAD", name: "Monad" },
  { symbol: "KARDIUM", name: "Kardium" },
  { symbol: "YAKI", name: "Yaki" },
  { symbol: "GMON", name: "GMon" },
  { symbol: "SHMON", name: "SHMon" },
  { symbol: "WMON", name: "WMon" },
  { symbol: "USDC", name: "USD Coin" },
  { symbol: "USDT", name: "Tether" },
  { symbol: "USDM", name: "USD Mountain" },
  { symbol: "CHOG", name: "Chog" },
  { symbol: "DAK", name: "Dak" },
  { symbol: "MOON", name: "Moon" },
  { symbol: "BEAN", name: "Bean" },
  { symbol: "WETH", name: "Wrapped Ethereum" },
  { symbol: "WBTC", name: "Wrapped Bitcoin" },
];

export default function Swap() {
  const { t } = useTranslation();
  const [selectedToken, setSelectedToken] = useState<string | null>(null);
  const [showTokenList, setShowTokenList] = useState(false);

  const handleTokenSelect = (tokenSymbol: string) => {
    setSelectedToken(tokenSymbol);
    setShowTokenList(true);
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            {t('swap.title')}
          </h1>
          <p className="text-muted-foreground">
            {t('swap.selectToken')}
          </p>
        </div>

        <Card className="bg-gradient-card shadow-card border-border/50">
          <CardHeader>
            <CardTitle className="text-center">{t('swap.title')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Token Selector */}
            <div className="space-y-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between h-16 text-left bg-background hover:bg-accent"
                  >
                    <div className="flex items-center space-x-3">
                      {selectedToken ? (
                        <>
                          <div className="w-8 h-8 rounded-full bg-gradient-primary"></div>
                          <span className="font-medium">{selectedToken}</span>
                        </>
                      ) : (
                        <span className="text-muted-foreground">{t('swap.selectToken')}</span>
                      )}
                    </div>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0 bg-popover border border-border" align="start">
                  <div className="max-h-80 overflow-auto">
                    {tokens.map((token) => (
                      <button
                        key={token.symbol}
                        onClick={() => handleTokenSelect(token.symbol)}
                        className="w-full px-4 py-3 text-left hover:bg-accent transition-colors flex items-center justify-between group"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-primary"></div>
                          <div>
                            <div className="font-medium">{token.symbol}</div>
                            <div className="text-sm text-muted-foreground">{token.name}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1 text-verify">
                            <Check className="h-4 w-4" />
                            <span className="text-xs font-medium">{t('swap.verified')}</span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
        </Card>

        {/* Token List Table */}
        {showTokenList && (
          <Card className="mt-8 bg-gradient-card shadow-card border-border/50 animate-fade-in">
            <CardHeader>
              <CardTitle className="text-center text-primary">Available Tokens</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tokens.map((token) => (
                  <div
                    key={token.symbol}
                    className="p-4 rounded-lg border-2 border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-primary"></div>
                        <div>
                          <div className="font-bold text-primary">{token.symbol}</div>
                          <div className="text-sm text-muted-foreground">{token.name}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 text-verify">
                        <Check className="h-5 w-5" />
                        <span className="text-sm font-medium">{t('swap.verified')}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}