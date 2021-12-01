import * as fs from "fs";

fs.readFile("day1/input.txt", function (err, data) {
  if (err) throw err;

  const arr: number[] = data
    .toString()
    .split("\n")
    .map((x) => +x);

  let depthMeasurementIncreases = 0;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[i - 1]) depthMeasurementIncreases++;
  }
  console.log("Depth measurement increases:");
  console.log(depthMeasurementIncreases);
});
