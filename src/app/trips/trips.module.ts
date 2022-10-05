import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";
import { TripsRoutingModule } from "./trips-routing.module";
import { TripsPage } from "./trips.page";

@NgModule({
  declarations: [TripsPage],
  imports: [CommonModule, TripsRoutingModule, SharedModule],
})
export class TripsModule {}
