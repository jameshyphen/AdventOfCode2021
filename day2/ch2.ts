import * as fs from "fs";
import { CourseInstruction, Direction, Position } from "./obj";
import { calculatePosition } from "./util";

fs.readFile("day2/input.txt", function (err, data) {
  if (err) throw err;

  const courseInstructions: CourseInstruction[] = data
    .toString()
    .trim()
    .split("\n")
    .map((x) => new CourseInstruction(x));

  const endPosition: { [key in Position]: number } = calculatePosition(
    courseInstructions,
    true
  );

  console.log("Position after moving:");
  console.log(
    `Moved ${endPosition[Position.Horizontal]} chunks forward\nand ${
      endPosition[Position.Depth]
    } chunks in depth`
  );

  console.log(
    "The outcome for the challenge is multiplication of horizontal & depth chunks resulting in:"
  );
  console.log(endPosition[Position.Horizontal] * endPosition[Position.Depth]);
});
