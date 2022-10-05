import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ReloadingComponent } from "./reloading.component";
import { ListComponent } from './list.component';
import { EmailControl } from './email.control';
import { InputControl } from './input.control';
import { SearchControl } from './search.control';

@NgModule({
  declarations: [ReloadingComponent, ListComponent, EmailControl, InputControl, SearchControl],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [ReloadingComponent, ReactiveFormsModule, ListComponent, EmailControl, InputControl, SearchControl],
})
export class SharedModule {}
