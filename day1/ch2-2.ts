import * as fs from "fs";

fs.readFile("day1/input.txt", function (err, data) {
  if (err) throw err;

  const arr: number[] = data
    .toString()
    .split("\n")
    .map((x) => +x);

  let depthMeasurementIncreases = 0;

  for (let i = 1; i < arr.length - 3; i++) {
    if (sumTotal(arr, i, 3) > sumTotal(arr, i - 1, 3))
      depthMeasurementIncreases++;
  }
  console.log("Depth measurement increases:");
  console.log(depthMeasurementIncreases);
});

function sumTotal(arr: number[], index: number, size: number) {
  let res: number = 0;
  for (let i = 0; i < size; i++) {
    res += arr[index + i];
  }
  return res;
}
