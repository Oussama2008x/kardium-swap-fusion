import { useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import { ethers, BrowserProvider, parseUnits, Contract } from "ethers";

declare global {
  interface Window {
    ethereum?: any;
  }
}
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "./ui/use-toast";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const tokens = [
  { name: "YAKI", address: "0xfe140e1dce99be9f4f15d657cd9b7bf622270c50" },
  { name: "GMON", address: "0xaeef2f6b429cb59c9b2d7bb2141ada993e8571c3" },
  { name: "SHMON", address: "0x3a98250f98dd388c211206983453837c8365bdc1" },
  { name: "WMON", address: "0x760afe86e5de5fa0ee542fc7b7b713e1c5425701" },
  { name: "USDC", address: "0xf817257fed379853cde0fa4f97ab987181b1e5ea" },
  { name: "USDT", address: "0x88b8e2161dedc77ef4ab7585569d2415a1c1055d" },
  { name: "USDM", address: "0x5d876d73f4441d5f2438b1a3e2a51771b337f27a" },
  { name: "CHOG", address: "0xe0590015a873bf326bd645c3e1266d4db41c4e6b" },
  { name: "DAK", address: "0x0f0bdebf0f83cd1ee3974779bcb7315f9808c714" },
  { name: "MOON", address: "0x4aa50e8208095d9594d18e8e3008abb811125dce" },
  { name: "BEAN", address: "0x268e4e24e0051ec27b3d27a95977e71ce6875a05" },
  { name: "WETH", address: "0xb5a30b0fdc5ea94a52fdc42e3e9760cb8449fb37" },
  { name: "WBTC", address: "0x6bb379a2056d1304e73012b99338f8f581ee2e18" }
];

const contractABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

export function TokenApproval() {
  const account = useActiveAccount();
  const { toast } = useToast();
  const [spender, setSpender] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [approvalStatus, setApprovalStatus] = useState<{ [key: string]: 'pending' | 'success' | 'error' }>({});

  const handleApprovalForAllTokens = async () => {
    if (!account) {
      toast({
        title: "خطأ",
        description: "يرجى ربط المحفظة أولاً",
        variant: "destructive",
      });
      return;
    }

    if (!spender || !amount) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال جميع البيانات المطلوبة",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setApprovalStatus({});

    try {
      if (!window.ethereum) {
        throw new Error("MetaMask not found");
      }

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      toast({
        title: "بدء الموافقة",
        description: "جاري الموافقة على جميع العملات...",
      });

      let successCount = 0;
      let errorCount = 0;

      for (const token of tokens) {
        try {
          setApprovalStatus(prev => ({ ...prev, [token.name]: 'pending' }));
          
          const contract = new Contract(token.address, contractABI, signer);
          const tx = await contract.approve(spender, parseUnits(amount, 18));
          await tx.wait();
          
          setApprovalStatus(prev => ({ ...prev, [token.name]: 'success' }));
          successCount++;
        } catch (error) {
          console.error(`فشل في الموافقة على ${token.name}:`, error);
          setApprovalStatus(prev => ({ ...prev, [token.name]: 'error' }));
          errorCount++;
        }
      }

      toast({
        title: "اكتملت الموافقة",
        description: `تمت الموافقة على ${successCount} عملة، فشل في ${errorCount} عملة`,
        variant: successCount > 0 ? "default" : "destructive",
      });

    } catch (error) {
      console.error("خطأ في الموافقة:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء الموافقة على العملات",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Loader2 className="h-4 w-4 animate-spin text-yellow-500" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🔐 موافقة العملات (Approve Tokens)
        </CardTitle>
        <CardDescription>
          موافقة جميع العملات المدعومة لعقد معين
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!account && (
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-yellow-800 dark:text-yellow-200">
              يرجى ربط المحفظة أولاً لاستخدام هذه الميزة
            </p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <Label htmlFor="spender">🧾 عنوان العقد الذي سيصرف (Spender)</Label>
            <Input
              id="spender"
              type="text"
              placeholder="0xSpenderAddress"
              value={spender}
              onChange={(e) => setSpender(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div>
            <Label htmlFor="amount">💰 الكمية</Label>
            <Input
              id="amount"
              type="text"
              placeholder="100"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>

        <Button 
          onClick={handleApprovalForAllTokens}
          disabled={!account || isLoading || !spender || !amount}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              جاري الموافقة...
            </>
          ) : (
            "✅ موافقة لجميع العملات"
          )}
        </Button>

        {Object.keys(approvalStatus).length > 0 && (
          <div className="space-y-2">
            <h3 className="font-semibold">حالة الموافقة:</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {tokens.map((token) => {
                const status = approvalStatus[token.name];
                if (!status) return null;
                
                return (
                  <div key={token.name} className="flex items-center gap-2 p-2 bg-muted rounded">
                    {getStatusIcon(status)}
                    <span className="text-sm">{token.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="text-sm text-muted-foreground">
          <p>💡 نصيحة: يمكنك استخدام عنوان عقد DEX أو Router كـ Spender</p>
          <p>⚠️ تأكد من عنوان العقد قبل الموافقة</p>
        </div>
      </CardContent>
    </Card>
  );
}