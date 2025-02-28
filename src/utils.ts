export function percentDifference(a: number, b: number) {
  return +Math.abs(100 - (b * 100) / a).toFixed(2);
}

console.log(percentDifference(10, 1000));

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.substr(1);
}
