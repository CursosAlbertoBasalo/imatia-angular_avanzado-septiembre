import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { LoggerBaseService } from "./logger-base.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private logger: LoggerBaseService, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next
      .handle(request)
      .pipe(catchError((error) => this.handleError(error)));
  }

  private handleError(error: any) {
    if (error instanceof HttpErrorResponse) {
      this.processHttpError(error);
    } else {
      this.processApplicationError(error);
    }
    return throwError(() => error);
  }

  private processHttpError(error: HttpErrorResponse) {
    const statusCode = error.status;
    if (statusCode === 401) {
      this.logger.warn("👮🏼‍♀️ Security error", error);
      this.router.navigate(["/", "auth", "login"]);
    }
    if (statusCode >= 500) {
      this.logger.error("👩🏼‍💼 Server error", error);
    }
    this.logger.error("🧑🏼‍💻 Client error", error);
  }
  private processApplicationError(error: Error) {
    this.logger.error("😨 App Error", error);
  }
}
