import { useState, lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Check, ChevronDown, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Lazy load components to avoid loading issues
const WalletBalances = lazy(() => import("@/components/WalletBalances").then(module => ({ default: module.WalletBalances })));
const TokenInfoCard = lazy(() => import("@/components/TokenInfoCard").then(module => ({ default: module.TokenInfoCard })));

const tokens = [
  { symbol: "MONAD", name: "Monad", contractAddress: "0x760AfE86e5de5fa0Ee542fc7B7B713e1c5425701" },
  { symbol: "YAKI", name: "Yaki", contractAddress: "0xfe140e1dce99be9f4f15d657cd9b7bf622270c50" },
  { symbol: "GMON", name: "GMON", contractAddress: "0xaeef2f6b429cb59c9b2d7bb2141ada993e8571c3" },
  { symbol: "SHMON", name: "SHMON", contractAddress: "0x3a98250f98dd388c211206983453837c8365bdc1" },
  { symbol: "WMON", name: "Wrapped MON", contractAddress: "0x760afe86e5de5fa0ee542fc7b7b713e1c5425701" },
  { symbol: "USDC", name: "USD Coin", contractAddress: "0xf817257fed379853cde0fa4f97ab987181b1e5ea" },
  { symbol: "USDT", name: "Tether USD", contractAddress: "0x88b8e2161dedc77ef4ab7585569d2415a1c1055d" },
  { symbol: "USDM", name: "USD Monad", contractAddress: "0x5d876d73f4441d5f2438b1a3e2a51771b337f27a" },
  { symbol: "CHOG", name: "CHOG", contractAddress: "0xe0590015a873bf326bd645c3e1266d4db41c4e6b" },
  { symbol: "DAK", name: "DAK", contractAddress: "0x0f0bdebf0f83cd1ee3974779bcb7315f9808c714" },
  { symbol: "MOON", name: "Moon", contractAddress: "0x4aa50e8208095d9594d18e8e3008abb811125dce" },
  { symbol: "BEAN", name: "Bean", contractAddress: "0x268e4e24e0051ec27b3d27a95977e71ce6875a05" },
  { symbol: "WETH", name: "Wrapped Ethereum", contractAddress: "0xb5a30b0fdc5ea94a52fdc42e3e9760cb8449fb37" },
  { symbol: "WBTC", name: "Wrapped Bitcoin", contractAddress: "0x6bb379a2056d1304e73012b99338f8f581ee2e18" }
];

// Loading component for Suspense fallback
const LoadingCard = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-6 w-32" />
    </CardHeader>
    <CardContent className="space-y-3">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </CardContent>
  </Card>
);

// Error fallback component
const ErrorFallback = ({ message }: { message: string }) => (
  <Card>
    <CardContent className="pt-6">
      <p className="text-center text-muted-foreground">{message}</p>
    </CardContent>
  </Card>
);

export default function Swap() {
  const { t } = useTranslation();
  const [selectedFromToken, setSelectedFromToken] = useState(tokens[0]);
  const [selectedToToken, setSelectedToToken] = useState(tokens[1]);
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [showFromTokenList, setShowFromTokenList] = useState(false);
  const [showToTokenList, setShowToTokenList] = useState(false);
  const [selectedTokenForInfo, setSelectedTokenForInfo] = useState<string | null>(tokens[0].contractAddress);

  const handleFromTokenSelect = (token: typeof tokens[0]) => {
    setSelectedFromToken(token);
    setShowFromTokenList(false);
    setSelectedTokenForInfo(token.contractAddress);
  };

  const handleToTokenSelect = (token: typeof tokens[0]) => {
    setSelectedToToken(token);
    setShowToTokenList(false);
    setSelectedTokenForInfo(token.contractAddress);
  };

  const handleSwapTokens = () => {
    const tempToken = selectedFromToken;
    const tempAmount = fromAmount;
    setSelectedFromToken(selectedToToken);
    setSelectedToToken(tempToken);
    setFromAmount(toAmount);
    setToAmount(tempAmount);
    setSelectedTokenForInfo(selectedToToken.contractAddress);
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            {t('swap.title', 'Swap Tokens')}
          </h1>
          <p className="text-muted-foreground">
            {t('swap.selectToken', 'Select tokens to swap on Monad Testnet')}
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Swap Interface */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-gradient-card shadow-card border-border/50">
              <CardHeader>
                <CardTitle className="text-center">{t('swap.title', 'Swap Tokens')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* From Token Section */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    {t('swap.from', 'From')}
                  </label>
                  <div className="flex space-x-2">
                    <Input
                      type="number"
                      placeholder="0.0"
                      value={fromAmount}
                      onChange={(e) => setFromAmount(e.target.value)}
                      className="flex-1 h-16 text-2xl bg-background border-border/50"
                    />
                    <Popover open={showFromTokenList} onOpenChange={setShowFromTokenList}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-40 justify-between h-16 text-left bg-background hover:bg-accent"
                        >
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 rounded-full bg-gradient-primary"></div>
                            <span className="font-medium">{selectedFromToken.symbol}</span>
                          </div>
                          <ChevronDown className="h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80 p-0 bg-popover border border-border" align="start">
                        <div className="max-h-80 overflow-auto">
                          {tokens.map((token) => (
                            <button
                              key={token.symbol}
                              onClick={() => handleFromTokenSelect(token)}
                              className="w-full px-4 py-3 text-left hover:bg-accent transition-colors flex items-center justify-between group"
                            >
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-primary"></div>
                                <div>
                                  <div className="font-medium">{token.symbol}</div>
                                  <div className="text-sm text-muted-foreground">{token.name}</div>
                                </div>
                              </div>
                              <Badge variant="secondary" className="bg-purple-500/20 text-purple-600 border-purple-500/30">
                                <Check className="h-3 w-3" />
                              </Badge>
                            </button>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Swap Button */}
                <div className="flex justify-center">
                  <Button
                    onClick={handleSwapTokens}
                    variant="outline"
                    size="icon"
                    className="h-12 w-12 rounded-full border-2 hover:rotate-180 transition-transform duration-300"
                  >
                    <ArrowUpDown className="h-6 w-6" />
                  </Button>
                </div>

                {/* To Token Section */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    {t('swap.to', 'To')}
                  </label>
                  <div className="flex space-x-2">
                    <Input
                      type="number"
                      placeholder="0.0"
                      value={toAmount}
                      onChange={(e) => setToAmount(e.target.value)}
                      className="flex-1 h-16 text-2xl bg-background border-border/50"
                    />
                    <Popover open={showToTokenList} onOpenChange={setShowToTokenList}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-40 justify-between h-16 text-left bg-background hover:bg-accent"
                        >
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 rounded-full bg-gradient-primary"></div>
                            <span className="font-medium">{selectedToToken.symbol}</span>
                          </div>
                          <ChevronDown className="h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80 p-0 bg-popover border border-border" align="start">
                        <div className="max-h-80 overflow-auto">
                          {tokens.map((token) => (
                            <button
                              key={token.symbol}
                              onClick={() => handleToTokenSelect(token)}
                              className="w-full px-4 py-3 text-left hover:bg-accent transition-colors flex items-center justify-between group"
                            >
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-primary"></div>
                                <div>
                                  <div className="font-medium">{token.symbol}</div>
                                  <div className="text-sm text-muted-foreground">{token.name}</div>
                                </div>
                              </div>
                              <Badge variant="secondary" className="bg-purple-500/20 text-purple-600 border-purple-500/30">
                                <Check className="h-3 w-3" />
                              </Badge>
                            </button>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <Separator />

                {/* Swap Execute Button */}
                <Button 
                  className="w-full h-14 text-lg font-semibold bg-gradient-primary hover:opacity-90 transition-opacity"
                  disabled={!fromAmount || !toAmount}
                >
                  {t('swap.execute', 'Swap')}
                </Button>
              </CardContent>
            </Card>

            {/* Token Information Card */}
            {selectedTokenForInfo && (
              <Suspense fallback={<LoadingCard />}>
                <TokenInfoCard 
                  contractAddress={selectedTokenForInfo}
                  className="bg-gradient-card shadow-card border-border/50"
                />
              </Suspense>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Wallet Balances */}
            <Suspense fallback={<LoadingCard />}>
              <WalletBalances />
            </Suspense>
            
            {/* Quick Info */}
            <Card className="bg-gradient-card shadow-card border-border/50">
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  {t('swap.quickInfo', 'Quick Info')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Network:</span>
                  <span className="font-medium">Monad Testnet</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Chain ID:</span>
                  <span className="font-medium">10143</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Slippage:</span>
                  <span className="font-medium">0.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fee:</span>
                  <span className="font-medium">0.3%</span>
                </div>
              </CardContent>
            </Card>

            {/* API Status */}
            <Card className="bg-gradient-card shadow-card border-border/50">
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  API Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Monad API:</span>
                  <Badge variant="secondary" className="bg-green-500/20 text-green-600 border-green-500/30">
                    Active
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Balances:</span>
                  <Badge variant="secondary" className="bg-green-500/20 text-green-600 border-green-500/30">
                    Live
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Token Info:</span>
                  <Badge variant="secondary" className="bg-green-500/20 text-green-600 border-green-500/30">
                    Live
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}