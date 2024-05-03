import { IReadLine } from "./file_read_line";
import { InvalidFileLine, UnknownError } from "../errors";

export type TExtractEmailsInput = {
  // file path without __dirname
  filePath: string;
  excludeDomain: string;
  lines: IReadLine;
  // passing references to add processed data of each line
  uniqueEmails: Set<string>;
  errors: Error[];
};
/**
 * @name extractEmails
 * @description Asynchronously extracts email addresses from a file and adds them to a set.
 * Any errors encountered during the process are accumulated in the errors array.
 * @param {TExtractEmailsInput} input - Input parameters for email extraction.
 * @param {string} input.filePath - The file path to extract emails from.
 * @param {string} input.excludeDomain - The domain to exclude from the final list of emails.
 * @param {AsyncIterable<string>} input.lines - AsyncIterable of lines from the file.
 * @param {Set<string>} input.uniqueEmails - reference to the Set which is storing unique email addresses.
 * @param {Error[]} input.errors - reference to the Array that collect errors during extraction.
 * @returns {Promise<void>}
 */
export async function extractEmails({
  filePath,
  excludeDomain,
  lines,
  uniqueEmails,
  errors,
}: TExtractEmailsInput): Promise<void> {
  let lineNumber = 0;
  for await (const line of lines) {
    try {
      lineNumber++;
      const separatedLine = line.split("@");
      // If after splitting the line by @ (all valid emails contain @)
      // if there are more than 2 parts it means it's not a valid email address
      // or the line has more than 1 email which is not valid
      // so we will add an error and continue to the next line.
      if (separatedLine.length !== 2) {
        errors.push(new InvalidFileLine(filePath, line, lineNumber));
        continue;
      }
      const domain = separatedLine[1];
      // If email domain is the same as excluded domain we do not want it in our final
      // list of emails, so we have to continue to the next line.
      if (domain === excludeDomain) {
        continue;
      }
      // If everything was okay, we add it to the uniqueEmails set and it will ensure
      // the uniqueness by default.
      uniqueEmails.add(line);
    } catch (error) {
      // In case of any unknown error, just adding it to the list of errors for further processing.
      errors.push(new UnknownError(error));
      continue;
    }
  }
}
