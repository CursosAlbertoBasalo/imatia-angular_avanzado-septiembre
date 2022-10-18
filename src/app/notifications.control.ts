import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from "@angular/core";
import { ErrorMediatorService } from "./services/error-mediator.service";

@Component({
  selector: "app-notifications",
  template: `
    <span [attr.aria-busy]="busy">{{ icon }} {{ message }}</span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsControl {
  busy = false;
  icon = "🔔";
  message = "Notifications ready";
  private errorMediator: ErrorMediatorService = inject(ErrorMediatorService);
  constructor(cdr: ChangeDetectorRef) {
    this.errorMediator.error$.subscribe((appError) => {
      this.icon = "💣";
      this.message = appError.message;
      this.busy = false;
      cdr.markForCheck();
    });
  }
}
