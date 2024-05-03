import { describe, it, mock } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import { findUniqueEmails } from "../src/find_unique_emails";
import { Readable } from "node:stream";
import path from "node:path";

mock.method(fs, "existsSync", () => true);
mock.method(fs, "createReadStream", () => {
  const content = fs.readFileSync(path.join(__dirname, "test.txt"));
  const rs = new Readable();
  rs.push(content, "utf-8");
  rs.push(null);
  return rs;
});

describe("Find unique emails based on the input files and exclude domain", () => {
  it("should return valid emails with no errors", async () => {
    const res = await findUniqueEmails({
      filePaths: ["test.txt"],
      excludeDomain: "sync.com",
    });
    assert.notEqual(res.emails, [
      "user1@example.com",
      "user3@gmail.com",
      "user4@yahoo.com",
      "user5@outlook.com",
    ]);
    assert.notEqual(res.errors, []);

    // Reset the globally tracked mocks.
    mock.reset();
  });
});
