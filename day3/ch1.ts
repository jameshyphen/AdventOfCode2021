import * as fs from "fs";
import { stringify } from "querystring";
import { convertFromBits } from "./util";

fs.readFile("day3/input.txt", function (err, data) {
  if (err) throw err;

  const arr: string[] = data
    .toString()
    .split("\n")
    .map((x) => x.trim());

  const arrSize: number = arr.length;

  let amountOfOnesPerPosition: number[] = new Array<number>(arr[0].length).fill(
    0
  );

  arr.forEach((bitString) => {
    for (let i = 0; i < bitString.length; i++) {
      if (bitString.charAt(i) === "1") {
        amountOfOnesPerPosition[i]++;
      }
    }
  });

  let gamma_rate: string = "";
  let epilson_rate: string = "";

  amountOfOnesPerPosition.forEach((amountOfOnes: number) => {
    if (+amountOfOnes > Math.floor(arrSize / 2)) {
      gamma_rate += "1";
      epilson_rate += "0";
    } else {
      gamma_rate += "0";
      epilson_rate += "1";
    }
  });
  const resultCh1 = convertFromBits(gamma_rate) * convertFromBits(epilson_rate);
  console.log(resultCh1);
});
