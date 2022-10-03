import { Component, Input } from "@angular/core";
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import { ValidatorsService } from "../services/validators.service";

@Component({
  selector: "app-email-control",
  template: `
    <div [formGroup]="formGroup">
      <label for="email">Your email address</label>
      <small *ngIf="mustShowError('email')">
        {{ getErrorMessage("email") }}
      </small>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="Your email address"
        formControlName="email"
        [attr.aria-invalid]="hasError('email')"
        (blur)="touchedCallback()"
      />
    </div>
  `,
  styles: [],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: EmailControl, multi: true },
  ],
})
export class EmailControl implements ControlValueAccessor {
  @Input() formControlName: string = "email";

  emailControl = new FormControl("", this.validators.emailValidator);
  formGroup = this.formBuilder.group({
    email: this.emailControl,
  });
  touchedCallback!: () => {};

  constructor(
    private formBuilder: FormBuilder,
    private validators: ValidatorsService
  ) {}

  registerOnChange(changeCallback: any): void {
    this.formGroup.valueChanges.subscribe(changeCallback);
  }
  registerOnTouched(touchedCallback: any): void {
    this.touchedCallback = touchedCallback;
  }
  writeValue(email: any): void {
    console.log("writeValue", email);
    this.formGroup.setValue({ email }, { emitEvent: false });
  }
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.formGroup.disable();
    } else {
      this.formGroup.enable();
    }
  }

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
}
