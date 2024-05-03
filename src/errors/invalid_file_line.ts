export default class InvalidFileLine extends Error {
  constructor(
    public readonly filePath: string,
    public readonly reason: string,
    public readonly lineNumber: number
  ) {
    super();
  }
}
