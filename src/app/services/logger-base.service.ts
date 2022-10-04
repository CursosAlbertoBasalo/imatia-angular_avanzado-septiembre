import { Injectable } from "@angular/core";

@Injectable()
export abstract class LoggerBaseService {
  protected appVersion = "1.0.0";
  constructor() {}

  abstract log(message: string, payload?: any): void;

  abstract warn(message: string, payload?: any): void;

  abstract error(message: string, error: Error): void;
}
