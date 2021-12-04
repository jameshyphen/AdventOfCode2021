import * as fs from "fs";

function InvertDirection(direction: Direction) {
  switch (direction) {
    case Direction.Up:
      return Direction.Down;
    case Direction.Down:
      return Direction.Up;
    case Direction.Left:
      return Direction.Right;
    case Direction.Right:
      return Direction.Left;
    // case Direction.ULeft:
    //   return Direction.DRight;
    // case Direction.DRight:
    //   return Direction.ULeft;
    // case Direction.URight:
    //   return Direction.DLeft;
    // case Direction.DLeft:
    //   return Direction.URight;
  }
}

enum Direction {
  Up = "Up",
  Down = "Down",
  Left = "Left",
  Right = "Right",
  // ULeft = "ULeft",
  // URight = "URight",
  // DLeft = "DLeft",
  // DRight = "DRight",
}

const Directions: { [key in Direction]: number[] } = {
  [Direction.Up]: [-1, 0],
  [Direction.Down]: [1, 0],
  [Direction.Left]: [0, -1],
  [Direction.Right]: [0, 1],
  // [Direction.ULeft]: [-1, -1],
  // [Direction.URight]: [1, -1],
  // [Direction.DLeft]: [-1, 1],
  // [Direction.DRight]: [1, 1],
};

class BingoNumber {
  Number: number;
  Checked: boolean;
}

class BingoCard {
  CardId: number;
  BingoNumbers: BingoNumber[][] = [...Array(5)].map(() => Array(5));

  constructor(cardId: number, cardInput: number[]) {
    let x = 0;
    let y = 0;
    cardInput.forEach((number) => {
      let bingNumber = new BingoNumber();
      bingNumber.Number = +number;
      bingNumber.Checked = false;
      this.BingoNumbers[y][x++] = bingNumber;
      if (x === 5) {
        y++;
        x = 0;
      }
    });
  }

  GetAllCheckedCords() {
    let cords = [];
    for (let i = 0; i < this.BingoNumbers.length; i++) {
      for (let y = 0; y < this.BingoNumbers[i].length; y++) {
        if (this.BingoNumbers[i][y].Checked) {
          cords.push([i, y]);
        }
      }
    }
    return cords;
  }

  CheckNumber(number: number) {
    for (let i = 0; i < this.BingoNumbers.length; i++) {
      for (let y = 0; y < this.BingoNumbers[i].length; y++) {
        if (number === this.BingoNumbers[i][y].Number) {
          this.BingoNumbers[i][y].Checked = true;
          break;
        }
      }
    }
  }

  FetchChecked(
    vertical: number,
    horizontal: number,
    direction: Direction
  ): number {
    if (
      typeof this.BingoNumbers[vertical + Directions[direction][0]] ===
        "undefined" ||
      typeof this.BingoNumbers[vertical + Directions[direction][0]][
        horizontal + Directions[direction][1]
      ] === "undefined"
    ) {
      return 0;
    }
    const cardUp =
      this.BingoNumbers[vertical + Directions[direction][0]][
        horizontal + Directions[direction][1]
      ];
    if (cardUp.Checked) {
      return (
        1 +
        this.FetchChecked(
          vertical + Directions[direction][0],
          horizontal + Directions[direction][1],
          direction
        )
      );
    }
    return 0;
  }
}

fs.readFile("day4/input.txt", function (err, data) {
  if (err) throw err;

  let arr: string[] = data.toString().split("\n");
  const inputs: number[] = arr[0].split(",").map((x) => +x);

  const cardsRaw: string[] = arr.slice(1, arr.length);
  let cards: BingoCard[] = [];
  let cardId: number = 1;

  let numbers: number[] = [];
  for (let i = 0; i < cardsRaw.length; i++) {
    if (numbers.length > 0 && cardsRaw[i].length === 0) {
      cards.push(new BingoCard(cardId++, numbers));
      numbers = [];
    } else if (cardsRaw[i].length > 0) {
      numbers.push(
        ...cardsRaw[i]
          .trim()
          .split(/\s+/)
          .map((x) => +x)
      );
    }
  }

  let winners: BingoCard[] = [];
  let numberCalledLast: number;

  for (let input of inputs) {
    if (winners.length == cards.length) break;
    for (let card of cards) {
      if (winners.length == cards.length) break;
      card.CheckNumber(input);
      for (let direction in Direction) {
        if (winners.length == cards.length) break;
        const allCheckedCords = card.GetAllCheckedCords();
        for (let checkedCord of allCheckedCords) {
          if (winners.length == cards.length) break;
          const checkedAmount =
            1 +
            card.FetchChecked(
              checkedCord[0],
              checkedCord[1],
              direction as Direction
            ) +
            card.FetchChecked(
              checkedCord[0],
              checkedCord[1],
              InvertDirection(direction as Direction)
            );
          if (checkedAmount === 5 && !winners.includes(card)) {
            console.log("We have a winner!");
            winners.push(card);
            numberCalledLast = input;
          }
        }
      }
    }
  }

  let total = 0;
  winners[winners.length - 1].BingoNumbers.forEach((x) => {
    x.forEach((card) => {
      if (!card.Checked) total += card.Number;
    });
  });
  // cards.forEach((x) => console.log(x.BingoNumbers));
  console.log(
    "First winner's total of unchecked card values multiplied by the last called number is:"
  );
  console.log(total * numberCalledLast);
});
