import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useTokenInfo, useTokenSupply } from "@/hooks/useMonadAPI";

interface TokenInfoCardProps {
  contractAddress: string;
  className?: string;
}

export function TokenInfoCard({ contractAddress, className }: TokenInfoCardProps) {
  const { tokenInfo, loading: infoLoading, error: infoError } = useTokenInfo(contractAddress);
  const { supply, loading: supplyLoading, error: supplyError } = useTokenSupply(contractAddress);

  if (infoLoading || supplyLoading) {
    return (
      <Card className={className}>
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
  }

  if (infoError || supplyError) {
    return (
      <Card className={className}>
        <CardContent className="pt-6">
          <p className="text-destructive">Failed to load token information</p>
        </CardContent>
      </Card>
    );
  }

  if (!tokenInfo) return null;

  const formatSupply = (supplyValue: string) => {
    try {
      const divisor = Math.pow(10, 18); // Wei to Token conversion
      const formatted = (parseFloat(supplyValue) / divisor);
      return formatted.toLocaleString();
    } catch {
      return supplyValue;
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {tokenInfo.tokenName} ({tokenInfo.symbol})
          {tokenInfo.blueCheckmark === "1" && (
            <Badge variant="secondary" className="bg-purple-500 text-white">
              Verified
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Contract Address</p>
            <p className="text-sm font-mono break-all">{tokenInfo.contractAddress}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Token Type</p>
            <p className="text-sm">{tokenInfo.tokenType}</p>
          </div>
          {supply && (
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Supply</p>
              <p className="text-sm">{formatSupply(supply)} {tokenInfo.symbol}</p>
            </div>
          )}
          {tokenInfo.tokenPriceUSD && (
            <div>
              <p className="text-sm font-medium text-muted-foreground">Price (USD)</p>
              <p className="text-sm">${tokenInfo.tokenPriceUSD}</p>
            </div>
          )}
        </div>
        
        {tokenInfo.description && (
          <div>
            <p className="text-sm font-medium text-muted-foreground">Description</p>
            <p className="text-sm">{tokenInfo.description}</p>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {tokenInfo.website && (
            <a
              href={tokenInfo.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary hover:underline"
            >
              Website
            </a>
          )}
          {tokenInfo.twitter && (
            <a
              href={tokenInfo.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary hover:underline"
            >
              Twitter
            </a>
          )}
          {tokenInfo.github && (
            <a
              href={tokenInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary hover:underline"
            >
              GitHub
            </a>
          )}
          {tokenInfo.telegram && (
            <a
              href={tokenInfo.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary hover:underline"
            >
              Telegram
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}