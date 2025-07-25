// Monad Testnet API Configuration
const API_BASE_URL = 'https://api.socialscan.io/monad-testnet/v1/developer/api';
const API_KEY = '8f9d3e27-a516-4c08-b235-7d94f02ca91b';

// API Response Types
export interface TokenTransferEvent {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  from: string;
  to: string;
  value: string;
  tokenName: string;
  tokenSymbol: string;
  tokenDecimal: string;
  contractAddress: string;
}

export interface BalanceResult {
  account: string;
  balance: string;
}

export interface TokenInfo {
  contractAddress: string;
  tokenName: string;
  symbol: string;
  divisor: string;
  tokenType: string;
  totalSupply: string;
  blueCheckmark: string;
  description: string;
  website: string;
  email: string;
  blog: string;
  reddit: string;
  slack: string;
  facebook: string;
  twitter: string;
  github: string;
  telegram: string;
  wechat: string;
  linkedin: string;
  discord: string;
  whitepaper: string;
  tokenPriceUSD: string;
}

export interface TokenHolder {
  TokenHolderAddress: string;
  TokenHolderQuantity: string;
}

export interface TokenBalance {
  contractAddress: string;
  tokenName: string;
  symbol: string;
  balance: string;
  tokenDecimal: string;
}

// API Service Class
export class MonadAPI {
  private static buildUrl(params: Record<string, string | number>): string {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, value.toString());
    });
    searchParams.append('apikey', API_KEY);
    return `${API_BASE_URL}?${searchParams.toString()}`;
  }

  private static async makeRequest<T>(url: string): Promise<T> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.status !== '1') {
        throw new Error(data.message || 'API request failed');
      }
      return data.result;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Get ERC20 Token Transfer Events by Address
  static async getTokenTransferEvents(
    contractAddress: string,
    address: string,
    page: number = 1,
    offset: number = 5,
    startBlock: number = 0,
    endBlock: number = 27025780,
    sort: 'asc' | 'desc' = 'asc'
  ): Promise<TokenTransferEvent[]> {
    const url = this.buildUrl({
      module: 'account',
      action: 'tokentx',
      contractaddress: contractAddress,
      address,
      page,
      offset,
      startblock: startBlock,
      endblock: endBlock,
      sort
    });
    return this.makeRequest<TokenTransferEvent[]>(url);
  }

  // Get Ether Balance for Multiple Addresses
  static async getMultipleBalances(addresses: string[]): Promise<BalanceResult[]> {
    const url = this.buildUrl({
      module: 'account',
      action: 'balancemulti',
      addresses: addresses.join(','),
      tag: 'latest'
    });
    return this.makeRequest<BalanceResult[]>(url);
  }

  // Get Ether Balance for Single Address
  static async getSingleBalance(address: string): Promise<string> {
    const url = this.buildUrl({
      module: 'account',
      action: 'balance',
      address,
      tag: 'latest'
    });
    return this.makeRequest<string>(url);
  }

  // Get Address ERC20 Token Holdings
  static async getTokenHoldings(
    address: string,
    page: number = 1,
    offset: number = 100
  ): Promise<TokenBalance[]> {
    const url = this.buildUrl({
      module: 'account',
      action: 'addresstokenbalance',
      address,
      page,
      offset
    });
    return this.makeRequest<TokenBalance[]>(url);
  }

  // Get Multiple Token Balances for specific contract addresses
  static async getMultipleTokenBalances(
    address: string,
    contractAddresses: string[]
  ): Promise<{ [contractAddress: string]: string }> {
    const balancePromises = contractAddresses.map(async (contractAddress) => {
      try {
        const balance = await this.getTokenBalance(contractAddress, address);
        return { contractAddress, balance };
      } catch (error) {
        console.warn(`Failed to fetch balance for ${contractAddress}:`, error);
        return { contractAddress, balance: '0' };
      }
    });

    const results = await Promise.all(balancePromises);
    return results.reduce((acc, { contractAddress, balance }) => {
      acc[contractAddress] = balance;
      return acc;
    }, {} as { [contractAddress: string]: string });
  }

  // Get Token Info by Contract Address
  static async getTokenInfo(contractAddress: string): Promise<TokenInfo> {
    const url = this.buildUrl({
      module: 'token',
      action: 'tokeninfo',
      contractaddress: contractAddress
    });
    return this.makeRequest<TokenInfo>(url);
  }

  // Get Token Holder List by Contract Address
  static async getTokenHolders(
    contractAddress: string,
    page: number = 1,
    offset: number = 5
  ): Promise<TokenHolder[]> {
    const url = this.buildUrl({
      module: 'token',
      action: 'tokenholderlist',
      contractaddress: contractAddress,
      page,
      offset
    });
    return this.makeRequest<TokenHolder[]>(url);
  }

  // Get Historical ERC20 Token Balance by Block Number
  static async getTokenBalanceHistory(
    contractAddress: string,
    address: string,
    blockNumber: number
  ): Promise<string> {
    const url = this.buildUrl({
      module: 'account',
      action: 'tokenbalancehistory',
      contractaddress: contractAddress,
      address,
      blockno: blockNumber
    });
    return this.makeRequest<string>(url);
  }

  // Get ERC20 Token Balance
  static async getTokenBalance(
    contractAddress: string,
    address: string
  ): Promise<string> {
    const url = this.buildUrl({
      module: 'account',
      action: 'tokenbalance',
      contractaddress: contractAddress,
      address,
      tag: 'latest'
    });
    return this.makeRequest<string>(url);
  }

  // Get ERC20 Token Total Supply
  static async getTokenSupply(contractAddress: string): Promise<string> {
    const url = this.buildUrl({
      module: 'stats',
      action: 'tokensupply',
      contractaddress: contractAddress
    });
    return this.makeRequest<string>(url);
  }

  // Get Contract ABI
  static async getContractABI(address: string): Promise<string> {
    const url = this.buildUrl({
      module: 'contract',
      action: 'getabi',
      address
    });
    return this.makeRequest<string>(url);
  }

  // Check Transaction Status
  static async getTransactionStatus(txHash: string): Promise<{ isError: string; errDescription: string }> {
    const url = this.buildUrl({
      module: 'transaction',
      action: 'getstatus',
      txhash: txHash
    });
    return this.makeRequest<{ isError: string; errDescription: string }>(url);
  }

  // Check Transaction Receipt Status
  static async getTransactionReceiptStatus(txHash: string): Promise<{ status: string }> {
    const url = this.buildUrl({
      module: 'transaction',
      action: 'gettxreceiptstatus',
      txhash: txHash
    });
    return this.makeRequest<{ status: string }>(url);
  }

  // Get Block Number by Timestamp
  static async getBlockNumberByTimestamp(
    timestamp: number,
    closest: 'before' | 'after' = 'before'
  ): Promise<string> {
    const url = this.buildUrl({
      module: 'block',
      action: 'getblocknobytime',
      timestamp,
      closest
    });
    return this.makeRequest<string>(url);
  }

  // Get Event Logs by Address
  static async getEventLogs(
    address: string,
    fromBlock: number = 0,
    toBlock: number = 20000000,
    page: number = 1,
    offset: number = 100
  ): Promise<any[]> {
    const url = this.buildUrl({
      module: 'logs',
      action: 'getLogs',
      address,
      fromBlock,
      toBlock,
      page,
      offset
    });
    return this.makeRequest<any[]>(url);
  }

  // Get Event Logs by Topics
  static async getEventLogsByTopics(
    fromBlock: number = 0,
    toBlock: number = 20000000,
    topic0: string,
    topic1?: string,
    topic0_1_opr: string = 'and',
    page: number = 1,
    offset: number = 100
  ): Promise<any[]> {
    const params: Record<string, string | number> = {
      module: 'logs',
      action: 'getLogs',
      fromBlock,
      toBlock,
      topic0,
      page,
      offset
    };

    if (topic1) {
      params.topic1 = topic1;
      params.topic0_1_opr = topic0_1_opr;
    }

    const url = this.buildUrl(params);
    return this.makeRequest<any[]>(url);
  }

  // Get Event Logs by Address filtered by Topics
  static async getEventLogsByAddressAndTopics(
    address: string,
    topic0: string,
    topic1?: string,
    topic0_1_opr: string = 'and',
    fromBlock: number = 0,
    toBlock: number = 20000000,
    page: number = 1,
    offset: number = 100
  ): Promise<any[]> {
    const params: Record<string, string | number> = {
      module: 'logs',
      action: 'getLogs',
      address,
      fromBlock,
      toBlock,
      topic0,
      page,
      offset
    };

    if (topic1) {
      params.topic1 = topic1;
      params.topic0_1_opr = topic0_1_opr;
    }

    const url = this.buildUrl(params);
    return this.makeRequest<any[]>(url);
  }

  // Get token images from event logs
  static async getTokenImagesFromLogs(contractAddress: string): Promise<string | null> {
    try {
      const logs = await this.getEventLogs(contractAddress, 0, 20000000, 1, 10);
      
      // Look for image-related data in logs
      for (const log of logs) {
        if (log.data && log.topics) {
          // Check for metadata or image URLs in log data
          const data = log.data.toLowerCase();
          if (data.includes('http') || data.includes('ipfs') || data.includes('image')) {
            // Extract potential image URL from hex data
            try {
              const decoded = Buffer.from(data.slice(2), 'hex').toString('utf8');
              const urlMatch = decoded.match(/(https?:\/\/[^\s]+\.(png|jpg|jpeg|svg|webp))/i);
              if (urlMatch) {
                return urlMatch[0];
              }
            } catch (e) {
              // Continue to next log if decoding fails
            }
          }
        }
      }
      return null;
    } catch (error) {
      console.warn('Failed to fetch token images from logs:', error);
      return null;
    }
  }
}