import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { LoggerBaseService } from "./logger-base.service";

@Injectable()
export class LoggerHttpService extends LoggerBaseService {
  logEntriesUrl = `${environment.apiServerUrl}/log-entries`;
  constructor(private http: HttpClient) {
    super();
  }

  log(message: string) {
    this.postLogEntry({
      timestamp: new Date().toISOString(),
      message,
      appVersion: this.appVersion,
      category: "log",
    });
  }

  warn(message: string) {
    this.postLogEntry({
      timestamp: new Date().toISOString(),
      message,
      appVersion: this.appVersion,
      category: "warn",
    });
  }
  error(message: string, error: Error) {
    if (error instanceof HttpErrorResponse) {
      console.warn("HttpErrorResponse not sent", error);
      return;
    }
    this.postLogEntry({
      timestamp: new Date().toISOString(),
      message,
      appVersion: this.appVersion,
      category: "error",
      error: error.message,
    });
  }

  private postLogEntry(logEntry: any) {
    this.http.post(this.logEntriesUrl, logEntry).subscribe();
  }
}
