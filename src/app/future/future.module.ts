import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { FutureRoutingModule } from "./future-routing.module";
import { FuturePage } from "./future.page";
import * as fromFuture from "./state";

@NgModule({
  declarations: [FuturePage],
  imports: [
    CommonModule,
    FutureRoutingModule,
    StoreModule.forFeature(fromFuture.futureFeatureKey, fromFuture.reducers, {
      metaReducers: fromFuture.metaReducers,
    }),
    EffectsModule.forFeature([fromFuture.TripsEffects]),
  ],
})
export class FutureModule {}
