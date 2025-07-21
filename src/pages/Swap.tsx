import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Check, ChevronDown, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { WalletBalances } from "@/components/WalletBalances";
import { TokenInfoCard } from "@/components/TokenInfoCard";

const tokens = [
  { symbol: "MONAD", name: "Monad", contractAddress: "0x201eba5cc46d216ce6dc03f6a759e8e766e956ae" },
  { symbol: "KARDIUM", name: "Kardium", contractAddress: "0x9bcd29c774ba0ce762fc56fde806bd43ed9786da" },
  { symbol: "YAKI", name: "Yaki", contractAddress: "0x34d1ae6076aee4072f54e1156d2e507dd564a355" },
  { symbol: "GMON", name: "GMON", contractAddress: "0xe0fa8195ae92b9c473c0c0c12c2d6bcbd245de47" },
  { symbol: "SHMON", name: "SHMON", contractAddress: "0x0bd4ece3939ce5163d8f4ede3740987107c6f586" },
  { symbol: "WMON", name: "Wrapped MON", contractAddress: "0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae" },
  { symbol: "USDC", name: "USD Coin", contractAddress: "0x63a9975ba31b0b9626b34300f7f627147df1f526" },
  { symbol: "USDT", name: "Tether USD", contractAddress: "0x198ef1ec325a96cc354c7266a038be8b5c558f67" },
  { symbol: "USDM", name: "USD Monad", contractAddress: "0xbe18aad013699c1cdd903cb3e6d596ef99c37650" },
  { symbol: "CHOG", name: "CHOG", contractAddress: "0x4cd096de94913d2e57235dde8869afde791327f1" },
  { symbol: "DAK", name: "DAK", contractAddress: "0x8f9d3e27a516c08b2357d94f02ca91b562c3f1a9" },
  { symbol: "MOON", name: "Moon", contractAddress: "0x742536751a516c08b2357d94f02ca91b562c3f1a9" },
  { symbol: "BEAN", name: "Bean", contractAddress: "0x85e40f4cb697bae8740590c1327f1f64d272fdd1" },
  { symbol: "WETH", name: "Wrapped Ethereum", contractAddress: "0xbe503e0b679e74327fdd1be503e0b679e74327fd" },
  { symbol: "WBTC", name: "Wrapped Bitcoin", contractAddress: "0x8f9d3e27a516c08b2357d94f02ca91b562c3f1a8" }
];

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
              <TokenInfoCard 
                contractAddress={selectedTokenForInfo}
                className="bg-gradient-card shadow-card border-border/50"
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Wallet Balances */}
            <WalletBalances />
            
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