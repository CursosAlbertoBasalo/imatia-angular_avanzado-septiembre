import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { ErrorMediatorService } from "./error-mediator.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private errorMediator: ErrorMediatorService) {}

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
    }
    return throwError(() => error);
  }

  private processHttpError(error: HttpErrorResponse) {
    const statusCode = error.status;
    if (statusCode === 401) {
      this.errorMediator.error$.next({
        category: "auth",
        message: "👮🏼‍♀️ Security error",
        error,
      });
      return;
    }
    if (statusCode >= 500) {
      this.errorMediator.error$.next({
        category: "server",
        message: "👩🏼‍💼 Server error",
        error,
      });
      return;
    }
    this.errorMediator.error$.next({
      category: "client",
      message: "🧑🏼‍💻 Client error",
      error,
    });
  }
}
