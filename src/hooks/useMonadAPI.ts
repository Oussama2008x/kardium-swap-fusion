import { useState, useEffect } from 'react';
import { MonadAPI, TokenInfo, TokenBalance, TokenHolder } from '@/lib/api/monad-api';
import { useToast } from '@/hooks/use-toast';

// Hook for getting token information
export function useTokenInfo(contractAddress: string | null) {
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!contractAddress) return;

    const fetchTokenInfo = async () => {
      setLoading(true);
      setError(null);
      try {
        const info = await MonadAPI.getTokenInfo(contractAddress);
        setTokenInfo(info);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch token info';
        setError(errorMessage);
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTokenInfo();
  }, [contractAddress, toast]);

  return { tokenInfo, loading, error };
}

// Hook for getting user token balances
export function useTokenBalances(address: string | null) {
  const [balances, setBalances] = useState<TokenBalance[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchBalances = async () => {
    if (!address) return;

    setLoading(true);
    setError(null);
    try {
      const tokenBalances = await MonadAPI.getTokenHoldings(address);
      setBalances(tokenBalances);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch token balances';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalances();
  }, [address, toast]);

  return { balances, loading, error, refetch: fetchBalances };
}

// Hook for getting Ether balance
export function useEtherBalance(address: string | null) {
  const [balance, setBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchBalance = async () => {
    if (!address) return;

    setLoading(true);
    setError(null);
    try {
      const etherBalance = await MonadAPI.getSingleBalance(address);
      setBalance(etherBalance);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch ether balance';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [address, toast]);

  return { balance, loading, error, refetch: fetchBalance };
}

// Hook for getting token holders
export function useTokenHolders(contractAddress: string | null) {
  const [holders, setHolders] = useState<TokenHolder[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!contractAddress) return;

    const fetchHolders = async () => {
      setLoading(true);
      setError(null);
      try {
        const tokenHolders = await MonadAPI.getTokenHolders(contractAddress);
        setHolders(tokenHolders);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch token holders';
        setError(errorMessage);
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchHolders();
  }, [contractAddress, toast]);

  return { holders, loading, error };
}

// Hook for getting token supply
export function useTokenSupply(contractAddress: string | null) {
  const [supply, setSupply] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!contractAddress) return;

    const fetchSupply = async () => {
      setLoading(true);
      setError(null);
      try {
        const tokenSupply = await MonadAPI.getTokenSupply(contractAddress);
        setSupply(tokenSupply);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch token supply';
        setError(errorMessage);
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSupply();
  }, [contractAddress, toast]);

  return { supply, loading, error };
}

// Hook for getting specific token balances
export function useSpecificTokenBalances(address: string | null, contractAddresses: string[]) {
  const [balances, setBalances] = useState<{ [contractAddress: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchSpecificBalances = async () => {
    if (!address || contractAddresses.length === 0) return;

    setLoading(true);
    setError(null);
    try {
      const tokenBalances = await MonadAPI.getMultipleTokenBalances(address, contractAddresses);
      setBalances(tokenBalances);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch specific token balances';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpecificBalances();
  }, [address, contractAddresses.join(','), toast]);

  return { balances, loading, error, refetch: fetchSpecificBalances };
}

// Generic hook for transaction operations
export function useTransactionOperations() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const checkTransactionStatus = async (txHash: string) => {
    setLoading(true);
    try {
      const status = await MonadAPI.getTransactionStatus(txHash);
      toast({
        title: "Transaction Status",
        description: status.isError === "0" ? "Transaction successful" : `Error: ${status.errDescription}`,
        variant: status.isError === "0" ? "default" : "destructive"
      });
      return status;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to check transaction status';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const checkReceiptStatus = async (txHash: string) => {
    setLoading(true);
    try {
      const status = await MonadAPI.getTransactionReceiptStatus(txHash);
      toast({
        title: "Receipt Status",
        description: status.status === "1" ? "Transaction receipt confirmed" : "Transaction receipt failed",
        variant: status.status === "1" ? "default" : "destructive"
      });
      return status;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to check receipt status';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    checkTransactionStatus,
    checkReceiptStatus
  };
}