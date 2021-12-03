export const convertFromBits = (bits: string) => {
  let total = 0;
  let power = 0;
  for (let x = bits.length - 1; x >= 0; x--) {
    if (bits.charAt(x) == "1") total += Math.pow(2, power);
    power++;
  }
  return total;
};

export const getAmountsOfOnesPerPositionInArray = (arr: string[]) => {
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
  return amountOfOnesPerPosition;
};
