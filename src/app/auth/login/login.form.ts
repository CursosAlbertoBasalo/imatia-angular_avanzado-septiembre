import { Component, EventEmitter, Output } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl } from "@angular/forms";
import { Credentials } from "src/app/models/credentials.interface";
import { ValidatorsService } from "src/app/services/validators.service";

@Component({
  selector: "app-login-form",
  template: `
    <form [formGroup]="formGroup">
      <div>
        <label for="email">Your email address</label>
        <small *ngIf="mustShowError('email')">
          {{ getErrorMessage("email") }}
        </small>
        <input
          id="email"
          name="email"
          type="email"
          formControlName="email"
          placeholder="email address"
          [attr.aria-invalid]="hasError('email')"
        />
      </div>
      <input
        type="password"
        formControlName="password"
        placeholder="password"
      />
      <button (click)="onLogInClick()">Log me in</button>
      <button (click)="onGoHomeClick()">Go Home</button>
    </form>
  `,
  styles: [],
})
export class LoginForm {
  @Output() logIn = new EventEmitter<Credentials>();
  @Output() goHome = new EventEmitter();
  @Output() formDirty = new EventEmitter<boolean>();

  emailControl = new FormControl("", this.validators.emailValidator);
  passwordControl = new FormControl("", this.validators.passwordValidators);

  formGroup = this.formBuilder.group({
    email: this.emailControl,
    password: this.passwordControl,
  });

  constructor(
    private formBuilder: FormBuilder,
    private validators: ValidatorsService
  ) {}

  getControl(controlName: string): AbstractControl | null {
    return this.formGroup.get(controlName);
  }
  hasError(controlName: string) {
    const control = this.getControl(controlName);
    if (!control) return false;
    return control.invalid;
  }
  mustShowError(controlName: string) {
    const control = this.getControl(controlName);
    return this.validators.mustShowMessage(control);
  }
  getErrorMessage(controlName: string) {
    const control = this.getControl(controlName);
    return this.validators.getErrorMessage(control);
  }

  onLogInClick() {}
  onGoHomeClick() {}
}
