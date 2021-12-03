import * as fs from "fs";
import { convertFromBits, getAmountsOfOnesPerPositionInArray } from "./util";

fs.readFile("day3/input.txt", function (err, data) {
  if (err) throw err;

  const arr: string[] = data
    .toString()
    .split("\n")
    .map((x) => x.trim());

  const arrSize: number = arr.length;

  let amountOfOnesPerPosition: number[] =
    getAmountsOfOnesPerPositionInArray(arr);

  let gammaRate: string = "";
  let epsilonRate: string = "";

  amountOfOnesPerPosition.forEach((amountOfOnes: number) => {
    if (+amountOfOnes > Math.floor(arrSize / 2)) {
      gammaRate += "1";
      epsilonRate += "0";
    } else {
      gammaRate += "0";
      epsilonRate += "1";
    }
  });
  const resultCh1 = convertFromBits(gammaRate) * convertFromBits(epsilonRate);
  console.log(resultCh1);
});
