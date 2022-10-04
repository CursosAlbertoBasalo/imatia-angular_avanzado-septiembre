import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request);
  }
}

// export const HTTP_INTERCEPTORS = new InjectionToken<HttpInterceptor[]>('HTTP_INTERCEPTORS');

// @NgModule({
//   providers: [ { provide:HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true   } ]
// })
// class AppModule {
// }

// @Injectable()
// class HttpClient{

//   //interceptors : HttpInterceptor[];

//   constructor(@Inject(HTTP_INTERCEPTORS) private interceptors : HttpInterceptor[]) {
//   }
//   get() {
//     this.interceptors.forEach(interceptor => {
//       interceptor.intercept();
//     }
//   }
// }
