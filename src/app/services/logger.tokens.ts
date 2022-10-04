import { InjectionToken } from "@angular/core";

export const LOG_LEVEL: InjectionToken<string> = new InjectionToken<string>(
  "logLevel"
);

export const LOG_APP_VERSION: InjectionToken<number> =
  new InjectionToken<number>("logAppVersion");
