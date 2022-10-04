import { Inject, Injectable } from "@angular/core";
import { LoggerBaseService } from "./logger-base.service";
import { LOG_LEVEL } from "./logger.tokens";

@Injectable()
export class LoggerConsoleService extends LoggerBaseService {
  constructor(@Inject(LOG_LEVEL) logLevel: string) {
    super();
    this.logLevel = logLevel;
  }

  log(message: string) {
    if (this.logLevel !== "verbose") return;
    console.log(this.getConsoleMessage(message));
  }
  warn(message: string) {
    console.warn(this.getConsoleMessage(message));
  }
  error(message: string, error: Error) {
    console.error(this.getConsoleError(message, error));
  }

  private getConsoleMessage(message: string): any {
    return `✏️ v[${this.appVersion}] : ${message}`;
  }
  private getConsoleError(message: string, error: Error): any {
    return `${this.getConsoleMessage(message)} -> 💣 ERR: ${error.message}`;
  }
}
