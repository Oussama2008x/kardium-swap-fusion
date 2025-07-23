import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useTokenBalances, useEtherBalance } from "@/hooks/useMonadAPI";
import { useActiveAccount } from "thirdweb/react";

export function WalletBalances() {
  const account = useActiveAccount();
  const address = account?.address;

  const { balances, loading: balancesLoading, error: balancesError, refetch: refetchBalances } = useTokenBalances(address || null);
  const { balance: etherBalance, loading: etherLoading, error: etherError, refetch: refetchEther } = useEtherBalance(address || null);

  const handleRefresh = () => {
    refetchBalances();
    refetchEther();
  };

  if (!address) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">Connect your wallet to view balances</p>
        </CardContent>
      </Card>
    );
  }

  const formatBalance = (balance: string, decimals: string = "18") => {
    try {
      const divisor = Math.pow(10, parseInt(decimals));
      const formatted = (parseFloat(balance) / divisor).toFixed(6);
      return parseFloat(formatted).toString();
    } catch {
      return balance;
    }
  };

  const formatEtherBalance = (balance: string) => {
    try {
      const divisor = Math.pow(10, 18); // Wei to Ether conversion
      const formatted = (parseFloat(balance) / divisor).toFixed(6);
      return parseFloat(formatted).toString();
    } catch {
      return balance;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Wallet Balances</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={balancesLoading || etherLoading}
          >
            <RefreshCw className={`h-4 w-4 ${(balancesLoading || etherLoading) ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Native Token Balance */}
        <div className="border-b pb-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">MON (Monad)</p>
              <p className="text-xs text-muted-foreground">Native Token</p>
            </div>
            <div className="text-right">
              {etherLoading ? (
                <Skeleton className="h-5 w-20" />
              ) : etherError ? (
                <p className="text-xs text-destructive">Error</p>
              ) : (
                <p className="font-medium">{etherBalance ? formatEtherBalance(etherBalance) : '0'} MON</p>
              )}
            </div>
          </div>
        </div>

        {/* Token Balances */}
        <div className="space-y-3">
          {balancesLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="space-y-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
                <Skeleton className="h-4 w-20" />
              </div>
            ))
          ) : balancesError ? (
            <p className="text-sm text-destructive">Failed to load token balances</p>
          ) : balances.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">No token balances found</p>
          ) : (
            balances.map((token, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{token.symbol}</p>
                    <Badge variant="outline" className="bg-purple-500/10 text-purple-600 border-purple-500/20">
                      Verified
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{token.tokenName}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    {formatBalance(token.balance, token.tokenDecimal)} {token.symbol}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {address && (
          <div className="pt-4 border-t">
            <p className="text-xs text-muted-foreground">
              Address: <span className="font-mono">{address.slice(0, 6)}...{address.slice(-4)}</span>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}