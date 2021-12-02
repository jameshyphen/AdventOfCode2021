import * as fs from "fs";

enum position {
  horizontal,
  depth,
  aim,
}

enum direction {
  forward,
  up,
  down,
}
class courseInstruction {
  direction: direction;
  distance: number;

  constructor(input: string) {
    const splitVals = input.split(" ");
    this.direction = direction[splitVals[0]];
    this.distance = +splitVals[1];
  }
}

fs.readFile("day2/input.txt", function (err, data) {
  if (err) throw err;

  const courseInstructions: courseInstruction[] = data
    .toString()
    .trim()
    .split("\n")
    .map((x) => new courseInstruction(x));

  const endPosition: { [key in position]: number } = {
    [position.horizontal]: 0,
    [position.depth]: 0,
    [position.aim]: 0,
  };
  for (const instr of courseInstructions) {
    switch (instr.direction) {
      case direction.down: {
        endPosition[position.aim] += instr.distance;
        break;
      }
      case direction.up: {
        endPosition[position.aim] -= instr.distance;
        break;
      }
      case direction.forward: {
        endPosition[position.horizontal] += instr.distance;
        endPosition[position.depth] +=
          endPosition[position.aim] * instr.distance;
      }
    }
  }
  console.log("Position after moving:");
  console.log(
    `Moved ${endPosition[position.horizontal]} chunks forward\nand ${
      endPosition[position.depth]
    } chunks in depth`
  );

  console.log(
    "The outcome for the challenge is multiplication of horizontal & depth chunks resulting in:"
  );
  console.log(endPosition[position.horizontal] * endPosition[position.depth]);
});
