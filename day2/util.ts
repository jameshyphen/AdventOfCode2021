import { CourseInstruction, Direction, Position } from "./obj";

export const calculatePosition = (
  courseInstructions: CourseInstruction[],
  aimIncluded?: boolean
) => {
  let endPosition: { [key in Position]: number } = {
    [Position.Horizontal]: 0,
    [Position.Depth]: 0,
    [Position.Aim]: 0,
  };

  for (const instr of courseInstructions) {
    switch (instr.Direction) {
      case Direction.Down: {
        endPosition[aimIncluded ? Position.Aim : Position.Depth] +=
          instr.Distance;
        break;
      }
      case Direction.Up: {
        endPosition[aimIncluded ? Position.Aim : Position.Depth] -=
          instr.Distance;
        break;
      }
      case Direction.Forward: {
        endPosition[Position.Horizontal] += instr.Distance;
        if (aimIncluded)
          endPosition[Position.Depth] +=
            endPosition[Position.Aim] * instr.Distance;
      }
    }
  }
  return endPosition;
};
