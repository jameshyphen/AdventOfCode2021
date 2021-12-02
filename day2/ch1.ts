import * as fs from "fs";

enum position {
  horizontal,
  depth,
}

enum direction {
  forward = 0,
  up = 1,
  down = 2,
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

  let positionInstance: { [key in direction]: number } = {
    [direction.forward]: 0,
    [direction.up]: 0,
    [direction.down]: 0,
  };

  for (const instr of courseInstructions) {
    positionInstance[instr.direction] += instr.distance;
  }
  const endPosition: { [key in position]: number } = {
    0: positionInstance[direction.forward],
    1: positionInstance[direction.down] - positionInstance[direction.up],
  };
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
