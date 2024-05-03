import path, { dirname } from "node:path";

/**
 * The root directory path of the Node.js application.
 */
export const rootPath = path.join(dirname(require!.main!.filename), "..");
