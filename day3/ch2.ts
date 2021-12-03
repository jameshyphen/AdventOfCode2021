import * as fs from "fs";
import { convertFromBits, getAmountsOfOnesPerPositionInArray } from "./util";

fs.readFile("day3/input.txt", function (err, data) {
  if (err) throw err;

  let arr: string[] = data
    .toString()
    .split("\n")
    .map((x) => x.trim());

  let arrOx: string[] = [...arr];
  let arrCo2: string[] = [...arr];

  for (let x = 0; x < arr[0].length; x++) {
    if (arrOx.length > 1) arrOx = filterBitsArray(arrOx, x, true);
    if (arrCo2.length > 1) arrCo2 = filterBitsArray(arrCo2, x, false);
  }
  console.log(arrOx);
  console.log(arrCo2);

  let OxygenGeneratorRating = arrOx[0];
  let Co2ScrubberRating = arrCo2[0];

  const resultCh1 =
    convertFromBits(OxygenGeneratorRating) * convertFromBits(Co2ScrubberRating);
  console.log(OxygenGeneratorRating);
  console.log(Co2ScrubberRating);
  console.log(resultCh1);
});

function filterBitsArray(arr: string[], pos: number, oxygen: boolean = true) {
  let amountOfOnesPerPosition: number = 0;
  let amountOfZeroesPerPosition: number = 0;
  arr.forEach((x) => {
    if (x.charAt(pos) == "1") amountOfOnesPerPosition++;
    else amountOfZeroesPerPosition++;
  });
  if (arr.length === 1)
    return [replaceAt(arr[0], pos, arr[0].charAt(pos) == "1" ? "0" : "1")];
  if (amountOfOnesPerPosition >= amountOfZeroesPerPosition) {
    return arr
      .filter((x) => x.charAt(pos) == (oxygen ? "1" : "0"))
      .slice(0, amountOfOnesPerPosition > 0 ? amountOfOnesPerPosition : 1);
  } else {
    return arr
      .filter((x) => x.charAt(pos) == (oxygen ? "0" : "1"))
      .slice(0, amountOfZeroesPerPosition > 0 ? amountOfZeroesPerPosition : 1);
  }
}

const replaceAt = (word: string, index: number, replacement: string) => {
  return (
    word.substr(0, index) +
    replacement +
    word.substr(index + replacement.length)
  );
};
