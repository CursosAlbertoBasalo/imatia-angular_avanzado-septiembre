import { inject, Injectable } from "@angular/core";
import { LOG_APP_VERSION } from "./logger.tokens";

@Injectable()
export abstract class LoggerBaseService {
  protected logLevel = "minimal"; // "verbose"; // minimal
  protected appVersion = inject(LOG_APP_VERSION);
  constructor() {}

  abstract log(message: string, payload?: any): void;

  abstract warn(message: string, payload?: any): void;

  abstract error(message: string, error: Error): void;
}
