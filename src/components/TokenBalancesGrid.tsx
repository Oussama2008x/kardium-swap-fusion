import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useSpecificTokenBalances } from "@/hooks/useMonadAPI";
import { useActiveAccount } from "thirdweb/react";
import { TokenIcon } from "@/components/TokenIcon";

interface Token {
  symbol: string;
  name: string;
  contractAddress: string;
  decimals?: number;
}

interface TokenBalancesGridProps {
  tokens: Token[];
  className?: string;
}

function TokenBalancesGrid({ tokens, className }: TokenBalancesGridProps) {
  const account = useActiveAccount();
  const address = account?.address;

  const contractAddresses = tokens.map(token => token.contractAddress);
  const { balances, loading, error, refetch } = useSpecificTokenBalances(address || null, contractAddresses);

  const formatBalance = (balance: string, decimals: number = 18) => {
    try {
      if (!balance || balance === '0') return '0';
      const divisor = Math.pow(10, decimals);
      const formatted = (parseFloat(balance) / divisor);
      
      if (formatted === 0) return '0';
      if (formatted < 0.000001) return '< 0.000001';
      if (formatted < 1) return formatted.toFixed(6);
      if (formatted < 1000) return formatted.toFixed(4);
      if (formatted < 1000000) return (formatted / 1000).toFixed(2) + 'K';
      return (formatted / 1000000).toFixed(2) + 'M';
    } catch {
      return balance;
    }
  };

  if (!address) {
    return (
      <Card className={className}>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">Connect your wallet to view token balances</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Token Balances</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={refetch}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-2 p-3 border rounded-lg">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-5 w-24" />
              </div>
            ))}
          </div>
        ) : error ? (
          <p className="text-sm text-destructive text-center py-4">Failed to load token balances</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tokens.map((token) => {
              const balance = balances[token.contractAddress] || '0';
              const formattedBalance = formatBalance(balance, token.decimals || 18);
              const hasBalance = parseFloat(balance) > 0;

              return (
                <div 
                  key={token.contractAddress} 
                  className={`p-3 border rounded-lg transition-all hover:shadow-sm ${
                    hasBalance ? 'bg-accent/30 border-primary/20' : 'bg-muted/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <TokenIcon symbol={token.symbol} size={24} />
                      <span className="font-semibold text-sm">{token.symbol}</span>
                    </div>
                    {hasBalance && (
                      <Badge variant="secondary" className="bg-green-500/20 text-green-600 border-green-500/30 text-xs">
                        Active
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{token.name}</p>
                  <p className={`font-bold text-sm ${hasBalance ? 'text-primary' : 'text-muted-foreground'}`}>
                    {formattedBalance} {token.symbol}
                  </p>
                  {hasBalance && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Raw: {parseFloat(balance).toLocaleString()}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {address && (
          <div className="pt-4 mt-4 border-t">
            <p className="text-xs text-muted-foreground text-center">
              Address: <span className="font-mono">{address.slice(0, 6)}...{address.slice(-4)}</span>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export { TokenBalancesGrid };