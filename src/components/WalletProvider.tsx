import { createThirdwebClient } from "thirdweb";
import { ThirdwebProvider } from "thirdweb/react";

const client = createThirdwebClient({
  clientId: "c00fe9c793b50c8a0bbaab1a561f74ce",
});

export function WalletProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThirdwebProvider>
      {children}
    </ThirdwebProvider>
  );
}