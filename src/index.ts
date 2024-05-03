/**
  Question: 
  Write a function that
  - takes in an array of filepaths as parameter
  - return a list of unique emails that don't belong to sync.com
  Note: 
  The filepaths and paths to actual files, 
  for example:
  /home/surya/emailfiles/file1.txt 
  and 
  /home/surya/emailfiles/file2.txt.
  And these files contain email addresses. 
  One address per line.
 */

import { PerformanceObserver } from "perf_hooks";
import { findUniqueEmails } from "./utils/find_unique_emails";

async function main() {
  // Create a performance observer
  let gcCallsCount = 0;
  const obs = new PerformanceObserver((list) => {
    const entry = list.getEntries()[0];
    console.debug(
      `GC called -> Duration: ${entry.duration} - heap: ${
        process.memoryUsage().heapUsed
      }`
    );
    gcCallsCount++;
  });
  // Subscribe notifications of GCs
  obs.observe({ entryTypes: ["gc"] });
  const startTime = Date.now();
  const syncEmailDomain = "sync.com";
  const files = [
    "/home/surya/emailfiles/file1.txt",
    "/home/surya/emailfiles/x.txt",
    "/home/surya/emailfiles/file2.txt",
    "/home/surya/emailfiles/file3.txt",
    "/home/surya/emailfiles/file4.txt",
    "/home/surya/emailfiles/file5.txt",
    "/home/surya/emailfiles/file6.txt",
    "/home/surya/emailfiles/file7.txt",
  ];
  const { emails, errors } = await findUniqueEmails({
    filePaths: files,
    excludeDomain: syncEmailDomain,
  });

  const endTime = Date.now();
  const timeDiff = endTime - startTime;
  console.table(errors);
  console.table(emails);
  console.log(`Time: ${timeDiff}ms -- Done, GC Calls: ${gcCallsCount}`);

  // Stop subscription
  obs.disconnect();
}

main();
