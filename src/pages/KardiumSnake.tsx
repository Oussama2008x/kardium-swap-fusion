import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Play, Pause, RotateCcw, Trophy, Zap } from "lucide-react";

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };

interface GameState {
  snake: Position[];
  food: Position[];
  direction: Direction;
  score: number;
  gameOver: boolean;
  isPaused: boolean;
  gameRunning: boolean;
}

const GRID_SIZE = 20;
const CANVAS_SIZE = 400;

export default function KardiumSnake() {
  const { t } = useTranslation();
  const { toast } = useToast();
  
  const [gameState, setGameState] = useState<GameState>({
    snake: [{ x: 10, y: 10 }],
    food: [],
    direction: 'RIGHT',
    score: 0,
    gameOver: false,
    isPaused: false,
    gameRunning: false
  });
  
  const [highScore, setHighScore] = useState(0);
  const [showTxModal, setShowTxModal] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  // Load high score from localStorage
  useEffect(() => {
    const savedHighScore = localStorage.getItem('kardiumsnake-highscore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
  }, []);

  // Save high score to localStorage
  useEffect(() => {
    if (gameState.score > highScore) {
      setHighScore(gameState.score);
      localStorage.setItem('kardiumsnake-highscore', gameState.score.toString());
    }
  }, [gameState.score, highScore]);

  // Generate random food position
  const generateFood = useCallback((): Position => {
    return {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };
  }, []);

  // Check if position is occupied by snake
  const isPositionOccupied = useCallback((pos: Position, snake: Position[]): boolean => {
    return snake.some(segment => segment.x === pos.x && segment.y === pos.y);
  }, []);

  // Add food after successful transaction
  const addFood = useCallback(() => {
    let newFood: Position;
    do {
      newFood = generateFood();
    } while (isPositionOccupied(newFood, gameState.snake));

    setGameState(prev => ({
      ...prev,
      food: [...prev.food, newFood]
    }));

    toast({
      title: "🍎 Food Added!",
      description: "Transaction successful! Food appeared on the grid.",
    });
  }, [gameState.snake, generateFood, isPositionOccupied, toast]);

  // Mock transaction execution
  const executeTx = async () => {
    if (!txHash.trim() || !recipient.trim() || !amount.trim()) {
      toast({
        title: "❌ Error",
        description: "Please fill all fields",
        variant: "destructive"
      });
      return;
    }

    // Simulate transaction
    toast({
      title: "⏳ Processing Transaction...",
      description: "Sending transaction to Monad Testnet",
    });

    // Simulate network delay
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% success rate
      
      if (success) {
        addFood();
        setTxHash("");
        setRecipient("");
        setAmount("");
        setShowTxModal(false);
      } else {
        toast({
          title: "❌ Transaction Failed",
          description: "Please try again",
          variant: "destructive"
        });
      }
    }, 2000);
  };

  // Move snake
  const moveSnake = useCallback(() => {
    if (gameState.gameOver || gameState.isPaused || !gameState.gameRunning) return;

    setGameState(prev => {
      const newSnake = [...prev.snake];
      const head = { ...newSnake[0] };

      // Move head based on direction
      switch (prev.direction) {
        case 'UP':
          head.y -= 1;
          break;
        case 'DOWN':
          head.y += 1;
          break;
        case 'LEFT':
          head.x -= 1;
          break;
        case 'RIGHT':
          head.x += 1;
          break;
      }

      // Check wall collision
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        return { ...prev, gameOver: true, gameRunning: false };
      }

      // Check self collision
      if (isPositionOccupied(head, newSnake)) {
        return { ...prev, gameOver: true, gameRunning: false };
      }

      // Add new head
      newSnake.unshift(head);

      // Check food collision
      const eatenFoodIndex = prev.food.findIndex(food => food.x === head.x && food.y === head.y);
      let newFood = [...prev.food];
      let newScore = prev.score;

      if (eatenFoodIndex !== -1) {
        // Food eaten - don't remove tail, increase score
        newFood.splice(eatenFoodIndex, 1);
        newScore += 10;
      } else {
        // No food eaten - remove tail
        newSnake.pop();
      }

      return {
        ...prev,
        snake: newSnake,
        food: newFood,
        score: newScore
      };
    });
  }, [gameState.gameOver, gameState.isPaused, gameState.gameRunning, isPositionOccupied]);

  // Game loop
  useEffect(() => {
    if (!gameState.gameRunning || gameState.gameOver || gameState.isPaused) return;

    const gameInterval = setInterval(moveSnake, 200);
    return () => clearInterval(gameInterval);
  }, [moveSnake, gameState.gameRunning, gameState.gameOver, gameState.isPaused]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameState.gameRunning || gameState.gameOver) return;

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          if (gameState.direction !== 'DOWN') {
            setGameState(prev => ({ ...prev, direction: 'UP' }));
          }
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (gameState.direction !== 'UP') {
            setGameState(prev => ({ ...prev, direction: 'DOWN' }));
          }
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (gameState.direction !== 'RIGHT') {
            setGameState(prev => ({ ...prev, direction: 'LEFT' }));
          }
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (gameState.direction !== 'LEFT') {
            setGameState(prev => ({ ...prev, direction: 'RIGHT' }));
          }
          break;
        case ' ':
          e.preventDefault();
          setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }));
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState.direction, gameState.gameRunning, gameState.gameOver]);

  // Start new game
  const startNewGame = () => {
    setGameState({
      snake: [{ x: 10, y: 10 }],
      food: [],
      direction: 'RIGHT',
      score: 0,
      gameOver: false,
      isPaused: false,
      gameRunning: true
    });
  };

  // Toggle pause
  const togglePause = () => {
    setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }));
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            🐍 Kardium Snake
          </h1>
          <p className="text-muted-foreground">
            Feed the snake by executing transactions on Monad Testnet!
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Game Canvas */}
            <div className="lg:col-span-2">
              <Card className="bg-gradient-card shadow-card border-border/50">
                <CardHeader className="text-center">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <Badge variant="secondary" className="bg-purple-500/20 text-purple-600 border-purple-500/30">
                        Score: {gameState.score}
                      </Badge>
                      <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-600 border-yellow-500/30">
                        <Trophy className="h-3 w-3 mr-1" />
                        Best: {highScore}
                      </Badge>
                    </div>
                    <div className="flex space-x-2">
                      {gameState.gameRunning && !gameState.gameOver && (
                        <Button
                          onClick={togglePause}
                          variant="outline"
                          size="sm"
                        >
                          {gameState.isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                        </Button>
                      )}
                      <Button
                        onClick={startNewGame}
                        variant="outline"
                        size="sm"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <div className="relative">
                    <svg
                      width={CANVAS_SIZE}
                      height={CANVAS_SIZE}
                      className="border border-border rounded-lg bg-background/50"
                    >
                      {/* Grid lines */}
                      {Array.from({ length: GRID_SIZE + 1 }).map((_, i) => (
                        <g key={i}>
                          <line
                            x1={i * (CANVAS_SIZE / GRID_SIZE)}
                            y1={0}
                            x2={i * (CANVAS_SIZE / GRID_SIZE)}
                            y2={CANVAS_SIZE}
                            stroke="hsl(var(--border))"
                            strokeWidth="0.5"
                            opacity="0.3"
                          />
                          <line
                            x1={0}
                            y1={i * (CANVAS_SIZE / GRID_SIZE)}
                            x2={CANVAS_SIZE}
                            y2={i * (CANVAS_SIZE / GRID_SIZE)}
                            stroke="hsl(var(--border))"
                            strokeWidth="0.5"
                            opacity="0.3"
                          />
                        </g>
                      ))}

                      {/* Snake */}
                      {gameState.snake.map((segment, index) => (
                        <rect
                          key={index}
                          x={segment.x * (CANVAS_SIZE / GRID_SIZE)}
                          y={segment.y * (CANVAS_SIZE / GRID_SIZE)}
                          width={CANVAS_SIZE / GRID_SIZE}
                          height={CANVAS_SIZE / GRID_SIZE}
                          fill={index === 0 ? "hsl(var(--primary))" : "hsl(var(--primary) / 0.7)"}
                          stroke="hsl(var(--background))"
                          strokeWidth="1"
                          rx="2"
                        />
                      ))}

                      {/* Food */}
                      {gameState.food.map((food, index) => (
                        <circle
                          key={index}
                          cx={food.x * (CANVAS_SIZE / GRID_SIZE) + (CANVAS_SIZE / GRID_SIZE) / 2}
                          cy={food.y * (CANVAS_SIZE / GRID_SIZE) + (CANVAS_SIZE / GRID_SIZE) / 2}
                          r={(CANVAS_SIZE / GRID_SIZE) / 3}
                          fill="hsl(var(--destructive))"
                          className="animate-pulse"
                        />
                      ))}
                    </svg>

                    {/* Game Over Overlay */}
                    {gameState.gameOver && (
                      <div className="absolute inset-0 bg-background/90 flex items-center justify-center rounded-lg">
                        <div className="text-center space-y-4">
                          <h3 className="text-2xl font-bold text-destructive">Game Over!</h3>
                          <p className="text-muted-foreground">Final Score: {gameState.score}</p>
                          <Button onClick={startNewGame} className="bg-gradient-primary">
                            Play Again
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Pause Overlay */}
                    {gameState.isPaused && gameState.gameRunning && !gameState.gameOver && (
                      <div className="absolute inset-0 bg-background/90 flex items-center justify-center rounded-lg">
                        <div className="text-center space-y-4">
                          <h3 className="text-2xl font-bold">Paused</h3>
                          <p className="text-muted-foreground">Press Space or click to continue</p>
                          <Button onClick={togglePause} className="bg-gradient-primary">
                            <Play className="h-4 w-4 mr-2" />
                            Resume
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Controls */}
              <Card className="mt-4 bg-gradient-card shadow-card border-border/50">
                <CardHeader>
                  <CardTitle className="text-sm">Controls</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-muted-foreground">Movement:</p>
                      <p>↑ ↓ ← → Arrow Keys</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Pause:</p>
                      <p>Space Bar</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Feed Snake Button */}
              <Card className="bg-gradient-card shadow-card border-border/50">
                <CardHeader>
                  <CardTitle className="text-center">
                    <Zap className="h-5 w-5 inline mr-2" />
                    Feed Snake
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Execute a transaction to add food for the snake!
                  </p>
                  
                  {!gameState.gameRunning ? (
                    <Button 
                      onClick={startNewGame} 
                      className="w-full bg-gradient-primary"
                    >
                      Start Game
                    </Button>
                  ) : (
                    <Dialog open={showTxModal} onOpenChange={setShowTxModal}>
                      <DialogTrigger asChild>
                        <Button className="w-full bg-gradient-primary">
                          Execute Transaction
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Execute Transaction on Monad Testnet</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="txhash">Transaction Hash</Label>
                            <Input
                              id="txhash"
                              placeholder="0x..."
                              value={txHash}
                              onChange={(e) => setTxHash(e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="recipient">Recipient Address</Label>
                            <Input
                              id="recipient"
                              placeholder="0x..."
                              value={recipient}
                              onChange={(e) => setRecipient(e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="amount">Amount (MON)</Label>
                            <Input
                              id="amount"
                              placeholder="0.1"
                              type="number"
                              value={amount}
                              onChange={(e) => setAmount(e.target.value)}
                            />
                          </div>
                          <Button onClick={executeTx} className="w-full bg-gradient-primary">
                            Send Transaction
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </CardContent>
              </Card>

              {/* Game Stats */}
              <Card className="bg-gradient-card shadow-card border-border/50">
                <CardHeader>
                  <CardTitle className="text-sm">Game Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Snake Length:</span>
                    <span className="font-medium">{gameState.snake.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Food Available:</span>
                    <span className="font-medium">{gameState.food.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Direction:</span>
                    <span className="font-medium">{gameState.direction}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge 
                      variant="secondary" 
                      className={
                        gameState.gameOver 
                          ? "bg-red-500/20 text-red-600 border-red-500/30"
                          : gameState.isPaused
                          ? "bg-yellow-500/20 text-yellow-600 border-yellow-500/30"
                          : gameState.gameRunning
                          ? "bg-green-500/20 text-green-600 border-green-500/30"
                          : "bg-gray-500/20 text-gray-600 border-gray-500/30"
                      }
                    >
                      {gameState.gameOver ? "Game Over" : gameState.isPaused ? "Paused" : gameState.gameRunning ? "Running" : "Stopped"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* How to Play */}
              <Card className="bg-gradient-card shadow-card border-border/50">
                <CardHeader>
                  <CardTitle className="text-sm">How to Play</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>1. Click "Start Game" to begin</p>
                  <p>2. Use arrow keys to control the snake</p>
                  <p>3. Click "Execute Transaction" to add food</p>
                  <p>4. Eat food to grow and increase score</p>
                  <p>5. Avoid hitting walls or yourself!</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}