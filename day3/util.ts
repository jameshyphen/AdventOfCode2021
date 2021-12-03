export const convertFromBits = (bits: string) => {
  let total = 0;
  let power = 0;
  for (let x = bits.length - 1; x >= 0; x--) {
    if (bits.charAt(x) == "1") total += Math.pow(2, power);
    power++;
  }
  return total;
};
