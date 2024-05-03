import fs from "node:fs";
import path from "node:path";
import { IReadLine, fileReadLine } from "./file_read_line";
import { FileNotFound, UnknownError } from "../errors";
import { extractEmails } from "./extract_emails";
import { rootPath } from "./root_path";

export type TFindUniqueEmailsInput = {
  filePaths: string[];
  excludeDomain: string;
};

export type TFindUniqueEmailsOutput = {
  emails: string[];
  errors: Error[];
};

/**
 * @name findUniqueEmails
 * @description Finds unique emails from the specified file paths while excluding a given domain.
 * This function takes an array of strings, where each string represents a file path.
 * It proceeds to extract emails from each file and adds them to a Set to ensure uniqueness.
 *
 * In cases where there are issues within the loop, instead of throwing errors immediately,
 * the function accumulates these errors and includes them in the final results. 
 * This approach ensures that all files are processed, 
 * and a list of errors is available for handling as needed.
 * @param {TFindUniqueEmailsInput} input
 * @param {String[]} input.filePaths list of files that we have to check
 * @param {String} input.excludeDomain exclude given domain

 * @returns {Promise<TFindUniqueEmailsOutput>} list of unique emails and errors
 */
export async function findUniqueEmails({
  filePaths,
  excludeDomain,
}: TFindUniqueEmailsInput): Promise<TFindUniqueEmailsOutput> {
  // Initialize a set to store unique emails and an array to collect errors.
  const uniqueEmails = new Set<string>();
  let errors: Error[] = [];

  // Asynchronously process each file path concurrently.
  // This will keep the loop performant
  // Also, using allSettled will prevent function collapse on error
  const results = await Promise.allSettled(
    filePaths.map(async (filePath) => {
      let lines: IReadLine | undefined;
      try {
        // Build the absolute file path based on the index.js/ts file location.
        const fileLocation = path.join(rootPath, filePath);
        console.log(fileLocation);
        // If the file doesn't exist, keep the record for an error and return.
        // When we are done with the filePaths iteration we can handle errors separately.
        if (!fs.existsSync(fileLocation)) {
          errors.push(new FileNotFound(filePath));
          return;
        }

        // Using async iteration to keep it performant while keeping the memory footprint
        // as small as possible.
        lines = fileReadLine(fileLocation);
        // Iterate over lines and extract emails
        // passing references to uniqueEmails, errors
        // so the extractEmails can directly add data to these variables
        await extractEmails({
          filePath,
          excludeDomain,
          lines,
          uniqueEmails,
          errors,
        });
      } catch (error) {
        // In case of any unknown error, just adding it to the list of errors for further processing.
        errors.push(new UnknownError(error));
        return;
      } finally {
        lines?.close();
      }
    })
  );

  // To make sure that there is no missing error we simple check
  // the allSettled results for any rejected promise.
  errors = errors.concat(
    results
      .filter((r) => r.status === "rejected")
      .map((e) => new UnknownError((e as PromiseRejectedResult).reason))
  );
  return { emails: [...uniqueEmails], errors };
}
