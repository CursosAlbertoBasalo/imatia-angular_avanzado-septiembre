import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { LoggerBaseService } from "./logger-base.service";
import { LOG_LEVEL } from "./logger.tokens";

@Injectable()
export class LoggerHttpService extends LoggerBaseService {
  logEntriesUrl = `${environment.apiServerUrl}/log-entries`;
  private logEntries$ = new Subject<any>();

  constructor(private http: HttpClient) {
    super();
    this.logLevel = inject(LOG_LEVEL);
    this.logEntries$.pipe().subscribe((logEntry) => {
      console.log("🌩️ Processing logEntry", logEntry);
    });
  }

  log(message: string) {
    if (this.logLevel !== "verbose") return;
    const logEntry = this.createLogEntry(message, "log");
    this.queueLogEntry(logEntry);
  }
  warn(message: string) {
    const logEntry = this.createLogEntry(message, "warn");
    this.queueLogEntry(logEntry);
  }
  error(message: string, error: Error) {
    if (error instanceof HttpErrorResponse) {
      console.warn("HttpErrorResponse not sent", error);
      return;
    }
    const logEntry = this.createLogEntry(message, "error");
    logEntry.error = error.message;
    this.queueLogEntry(logEntry);
  }
  private createLogEntry(message: string, category: string): any {
    return {
      timestamp: new Date().toISOString(),
      message,
      appVersion: this.appVersion,
      category,
    };
  }

  private queueLogEntry(logEntry: any) {
    this.logEntries$.next(logEntry);
  }

  private createPostLogEntry$(logEntry: any) {
    return this.http.post(this.logEntriesUrl, logEntry);
  }
}
