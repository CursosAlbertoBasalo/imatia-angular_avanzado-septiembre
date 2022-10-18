import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { LoggerBaseService } from "./logger-base.service";

export type ErrorCategory = "app" | "auth" | "client" | "server";
export type AppError = {
  category: ErrorCategory;
  message: string;
  error: Error;
};

@Injectable({
  providedIn: "root",
})
export class ErrorMediatorService {
  error$: Subject<AppError> = new Subject();

  constructor(private logger: LoggerBaseService, private router: Router) {
    this.error$.subscribe((appError) => this.onError(appError));
  }

  private onError(appError: AppError) {
    switch (appError.category) {
      case "app":
        this.logger.error("😨 App Error", appError.error);
        break;
      case "auth":
        this.logger.error("👮🏼‍♀️ Security error", appError.error);
        this.router.navigate(["/", "auth", "login"]);
        break;
      case "client":
        this.logger.error("🧑🏼‍💻 Client error", appError.error);
        break;
      case "server":
        this.logger.error("👩🏼‍💼 Server error", appError.error);
        break;
      default:
        break;
    }
  }
}
