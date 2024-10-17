// this file showcases snake and ladder game with different design patterns
// Factory Method
// Observer pattern
// Strategy Pattern

// Snake class
class SnakeDP {
  constructor(public start: number, public end: number) {
    if (start <= end) {
      throw new Error("Start should be greater than end");
    }
  }
}

// Ladder class
class Ladder {
  constructor(public start: number, public end: number) {
    if (start >= end) {
      throw new Error("Start should be less than end");
    }
  }
}

// Player class
class Player {
  constructor(public name: string, public position: number = 0) {}
}

// Dice class
class Dice {
  roll(): number {
    return Math.floor(Math.random() * 6) + 1;
  }
}

// Board class
class Board {
  private snakes: Snake[] = [];
  private ladders: Ladder[] = [];
  private size: number;

  constructor(size: number, snakes: Snake[], ladders: Ladder[]) {
    this.size = size;
    this.snakes = snakes;
    this.ladders = ladders;
  }

  getFinalPosition(initialPosition: number): number {
    let finalPosition = initialPosition;

    for (const snake of this.snakes) {
      if (snake.start === finalPosition) {
        console.log(
          `Snake bite! Going down from ${snake.start} to ${snake.end}`
        );
        finalPosition = snake.end;
      }
    }

    for (const ladder of this.ladders) {
      if (ladder.start === finalPosition) {
        console.log(
          `Ladder climb! Going up from ${ladder.start} to ${ladder.end}`
        );
        finalPosition = ladder.end;
      }
    }

    return finalPosition;
  }

  isWinningPosition(position: number): boolean {
    return position === this.size;
  }

  getSize(): number {
    return this.size;
  }
}

// Factory for creating Snake objects
class SnakeFactory {
  static createSnake(start: number, end: number): Snake {
    return new Snake(start, end);
  }
}

// Factory for creating Ladder objects
class LadderFactory {
  static createLadder(start: number, end: number): Ladder {
    return new Ladder(start, end);
  }
}

// Factory for creating Player objects
class PlayerFactory {
  static createPlayer(name: string): Player {
    return new Player(name);
  }
}

// Factory for creating Dice objects
class DiceFactory {
  static createDice(): Dice {
    return new Dice();
  }
}

// Factory for creating Board objects
class BoardFactory {
  static createBoard(size: number, snakes: Snake[], ladders: Ladder[]): Board {
    return new Board(size, snakes, ladders);
  }
}

// Game class using Factory Pattern
class GameDP {
  private board: Board;
  private players: Player[];
  private dice: Dice;

  constructor(board: Board, players: Player[], dice: Dice) {
    this.board = board;
    this.players = players;
    this.dice = dice;
  }

  start(): void {
    let isGameOver = false;
    while (!isGameOver) {
      for (const player of this.players) {
        const diceRoll = this.dice.roll();
        console.log(`${player.name} rolled a ${diceRoll}`);

        let newPosition = player.position + diceRoll;
        if (newPosition > this.board.getSize()) {
          console.log(
            `${player.name} cannot move, stays at position ${player.position}`
          );
          continue;
        }
        player.position = this.board.getFinalPosition(newPosition);
        console.log(`${player.name} moves to position ${player.position}`);

        if (this.board.isWinningPosition(player.position)) {
          console.log(`${player.name} wins the game!`);
          isGameOver = true;
          break;
        }
      }
    }
  }
}

// Create snakes and ladders using their factories
const snakes = [
  SnakeFactory.createSnake(14, 7),
  SnakeFactory.createSnake(31, 26),
  SnakeFactory.createSnake(35, 5),
  SnakeFactory.createSnake(98, 79),
];
const ladders = [
  LadderFactory.createLadder(3, 22),
  LadderFactory.createLadder(8, 30),
  LadderFactory.createLadder(28, 84),
  LadderFactory.createLadder(58, 77),
];

// Initialize players using PlayerFactory
const players = [
  PlayerFactory.createPlayer("Alice"),
  PlayerFactory.createPlayer("Bob"),
];

// Create the game board using the BoardFactory
const board = BoardFactory.createBoard(100, snakes, ladders);

// Create the dice using DiceFactory
const dice = DiceFactory.createDice();

// Start the game
const game = new GameDP(board, players, dice);
game.start();
