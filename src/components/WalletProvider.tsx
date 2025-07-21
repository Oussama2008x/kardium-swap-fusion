import { createThirdwebClient } from "thirdweb";
import { ThirdwebProvider } from "thirdweb/react";
import { defineChain } from "thirdweb/chains";

const client = createThirdwebClient({
  clientId: "c00fe9c793b50c8a0bbaab1a561f74ce",
});

// Define Monad Testnet
const monadTestnet = defineChain({
  id: 10143,
  name: "Monad Testnet",
  nativeCurrency: {
    name: "Monad",
    symbol: "MON",
    decimals: 18,
  },
  rpc: "https://10143.rpc.thirdweb.com/$19c0ffb997d9e0d9ea54ddc15ebaff6f",
  blockExplorers: [
    {
      name: "Monad Explorer",
      url: "https://monad-testnet.socialscan.io",
    },
  ],
  testnet: true,
});

export function WalletProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThirdwebProvider>
      {children}
    </ThirdwebProvider>
  );
}