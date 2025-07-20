import { ConnectButton } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";
import { lightTheme, darkTheme } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { defineChain } from "thirdweb/chains";
import { useTheme } from "./ThemeProvider";

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

const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("io.rabby"),
  createWallet("com.okex.wallet"),
  createWallet("walletConnect"),
  createWallet("com.bitget.web3"),
  createWallet("app.phantom"),
];

export function WalletConnect() {
  const { theme } = useTheme();
  
  const currentTheme = theme === "dark" ? darkTheme({
    colors: {
      borderColor: "hsl(0, 0%, 15%)",
      success: "hsl(142, 76%, 36%)",
    },
  }) : lightTheme({
    colors: {
      borderColor: "hsl(142, 15%, 89%)",
      success: "hsl(142, 76%, 36%)",
    },
  });

  return (
    <ConnectButton
      client={client}
      connectButton={{ label: "Connect Wallet" }}
      connectModal={{ size: "compact" }}
      theme={currentTheme}
      wallets={wallets}
      chains={[monadTestnet]}
    />
  );
}