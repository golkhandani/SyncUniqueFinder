import fs from "node:fs";
import rl, { Interface as IReadLine } from "node:readline";
export { IReadLine };

/**
 * @name fileReadLine
 * @description Reads a file line by line and returns a readline.Interface for iterating over the lines.
 *
 * @param {string} filePath The path to the file to be read.
 * @returns {readline.Interface} A readline interface for processing lines.
 * @example
 * ```ts
 * import { fileReadLine } from './your-module-path';
 *
 * async function processFileLines(filePath) {
 *   const readline = fileReadLine(filePath);
 *
 *   for await (const line of readline) {
 *     console.log(line);
 *   }
 *
 *   readline.close();
 * }
 * ```
 */
export function fileReadLine(filePath: string): IReadLine {
  const fileStream = fs.createReadStream(filePath);
  const readline = rl.createInterface({
    input: fileStream,
  });
  return readline;
}
