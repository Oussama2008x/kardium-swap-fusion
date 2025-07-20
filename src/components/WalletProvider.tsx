import { createThirdwebClient } from "thirdweb";
import { ThirdwebProvider } from "thirdweb/react";
import { defineChain } from "thirdweb/chains";

const client = createThirdwebClient({
  clientId: "c00fe9c793b50c8a0bbaab1a561f74ce",
});

// Define Monad Testnet
const monadTestnet = defineChain({
  id: 41454,
  name: "Monad Testnet",
  nativeCurrency: {
    name: "Monad",
    symbol: "MON",
    decimals: 18,
  },
  rpc: "https://testnet-rpc.monad.xyz",
  blockExplorers: [
    {
      name: "Monad Explorer",
      url: "https://testnet-explorer.monad.xyz",
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