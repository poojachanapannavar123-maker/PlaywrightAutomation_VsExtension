/**
 * Get the Random index to handle the calculation.
 * @param count
 * @returns number
 * @author Pooja
 */

export function getRandomIndex(count: number): number {
  if (count <= 0) {
    throw new Error("Count must be greater than zero");
  }
  return Math.floor(Math.random() * count);
}
