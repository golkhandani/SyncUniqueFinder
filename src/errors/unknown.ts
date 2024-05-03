export default class UnknownError extends Error {
  public readonly reason;
  constructor(public readonly error: unknown) {
    super();
    if (error && typeof error === "object" && error.hasOwnProperty("message")) {
      this.reason = `UnknownError Happened ${
        (error as { message: string }).message
      }`;
    } else {
      this.reason = `UnknownError Happened ${error}`;
    }
  }
}
