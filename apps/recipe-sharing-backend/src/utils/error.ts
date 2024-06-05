import { INTERNAL_SERVER_ERROR } from "./constants";

export default class CustomError {
  #error: Error;
  constructor(message: string, statusCode: number) {
    this.#error = new Error(JSON.stringify({ message, statusCode }));
  }
  errorInstance() {
    return this.#error;
  }
  static getStatusCode(err: { message: string }) {
    try {
      return JSON.parse(err.message).statusCode;
    } catch (error) {
      return 500;
    }
  }
  static getMessage(err: { message: string }) {
    try {
      return JSON.parse(err.message).message;
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
    }
  }
}
