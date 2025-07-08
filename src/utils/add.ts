export function add(...digits: number[]): number {
  return digits.reduce((sum, digit) => sum + digit, 0);
}
