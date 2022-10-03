import { Component, Input } from "@angular/core";
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import { ValidatorsService } from "../services/validators.service";

@Component({
  selector: "app-input-control",
  template: `
    <div>
      <label [for]="formControlName">{{ label | uppercase }}</label>
      <input
        [id]="formControlName"
        [name]="formControlName"
        [type]="type"
        [placeholder]="label"
        [value]="value"
        [attr.aria-invalid]="hasError()"
        [disabled]="isDisabled"
        (blur)="touchedCallback()"
        (keyup)="onChange($event)"
      />
      <small *ngIf="mustShowMessage()">
        {{ getErrorMessage() }}
      </small>
    </div>
  `,
  styles: [],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: InputControl, multi: true },
  ],
})
export class InputControl implements ControlValueAccessor {
  @Input() label: string = "";
  @Input() formControlName: string = "";
  @Input() type: "text" | "password" | "number" = "text";
  @Input() control!: AbstractControl | null;

  value: any;
  isDisabled: boolean = false;
  changeCallback!: (value: any) => void;
  touchedCallback!: () => void;

  constructor(private validators: ValidatorsService) {}

  onChange(event: any) {
    const value = event.target.value;
    this.changeCallback(value);
  }

  registerOnChange(changeCallback: any): void {
    this.changeCallback = changeCallback;
  }
  registerOnTouched(touchedCallback: any): void {
    this.touchedCallback = touchedCallback;
  }
  writeValue(value: any): void {
    this.value = value;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  hasError(): boolean {
    return this.control?.invalid || false;
  }
  mustShowMessage(): boolean {
    return this.validators.mustShowMessage(this.control);
  }
  getErrorMessage(): string {
    return this.validators.getErrorMessage(this.control);
  }
}
