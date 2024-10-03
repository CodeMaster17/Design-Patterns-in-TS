class Snake {
  constructor(public start: number, public end: number) {
    if (start <= end) {
      throw new Error("Start should be greater than end");
    }
  }
}

class Ladder {
  constructor(public start: number, public end: number) {
    if (start >= end) {
      throw new Error("Start should be less than end");
    }
  }
}

class Player {
  constructor(public name: string, public position: number = 0) {}
}

class Dice {
  roll(): number {
    return Math.floor(Math.random() * 6) + 1;
  }
}

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

class Game {
  private board: Board;
  private players: Player[];
  private dice: Dice;

  constructor(board: Board, players: Player[]) {
    this.board = board;
    this.players = players;
    this.dice = new Dice();
  }

  start(): void {
    let isGameOver = false;
    while (!isGameOver) {
      for (const player of this.players) {
        const diceRoll = this.dice.roll();
        console.log(`${player.name} roll a ${diceRoll}`);

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

const snakes = [
  new Snake(14, 7),
  new Snake(31, 26),
  new Snake(35, 5),
  new Snake(98, 79),
];
const ladders = [
  new Ladder(3, 22),
  new Ladder(8, 30),
  new Ladder(28, 84),
  new Ladder(58, 77),
];

// Initialize players
const players = [new Player("Alice"), new Player("Bob")];

// Create the game board
const board = new Board(100, snakes, ladders);

// Start the game
const game = new Game(board, players);
game.start();
