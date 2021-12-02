export enum Position {
  Horizontal,
  Depth,
  Aim,
}

export enum Direction {
  Forward = "forward",
  Up = "up",
  Down = "down",
}

export class CourseInstruction {
  Direction: Direction;
  Distance: number;

  constructor(input: string) {
    const splitVals = input.split(" ");
    this.Direction = splitVals[0] as Direction;
    this.Distance = +splitVals[1];
  }
}
