export default class FileNotFound extends Error {
  public readonly reason;
  constructor(public readonly filePath: string) {
    super();
    this.reason = "file not found";
  }
}
