import { useState } from "react";

interface TokenIconProps {
  symbol: string;
  size?: number;
  className?: string;
}

const TokenIcon = ({ symbol, size = 24, className = "" }: TokenIconProps) => {
  const [imageError, setImageError] = useState(false);

  // Token icon mapping
  const getTokenIconUrl = (symbol: string) => {
    const iconMap: { [key: string]: string } = {
      'WBTC': 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
      'WETH': 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
      'USDC': 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png',
      'USDT': 'https://cryptologos.cc/logos/tether-usdt-logo.png',
      'MONAD': 'https://s2.coinmarketcap.com/static/img/coins/64x64/27657.png',
      'WMON': 'https://s2.coinmarketcap.com/static/img/coins/64x64/27657.png',
    };

    return iconMap[symbol.toUpperCase()] || null;
  };

  const iconUrl = getTokenIconUrl(symbol);

  if (imageError || !iconUrl) {
    // Fallback to gradient circle with first letter
    return (
      <div 
        className={`flex items-center justify-center rounded-full bg-gradient-primary text-white font-bold ${className}`}
        style={{ width: size, height: size, fontSize: size * 0.4 }}
      >
        {symbol.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <img
      src={iconUrl}
      alt={`${symbol} logo`}
      width={size}
      height={size}
      className={`rounded-full ${className}`}
      onError={() => setImageError(true)}
      onLoad={() => setImageError(false)}
    />
  );
};

export { TokenIcon };