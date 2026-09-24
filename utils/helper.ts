export function getRandomIndex(count: number): number {
  if (count <= 0) {
    throw new Error("Count must be greater than zero");
  }
  return Math.floor(Math.random() * count);
}
