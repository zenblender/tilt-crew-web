// Adapted from https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore to avoid lodash.
export function range(length: number): number[] {
  return Array.from({ length }, (_, i) => i);
}

/**
 * 1-based.
 */
export function columnToLetter(column: number): string {
  let temp;
  let letter = "";
  let col = column;
  while (col > 0) {
    temp = (col - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    col = (col - temp - 1) / 26;
  }
  return letter;
}

/**
 * 1-based.
 */
export function letterToColumn(letter: string): number {
  let column = 0;
  const { length } = letter;
  for (let i = 0; i < length; i++) {
    column += (letter.charCodeAt(i) - 64) * 26 ** (length - i - 1);
  }
  return column;
}
