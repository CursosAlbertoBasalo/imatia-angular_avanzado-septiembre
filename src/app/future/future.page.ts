import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Trip } from "../models/trip.interface";
import { FutureState, loadTrips } from "./state";
import {
  selectError,
  selectLoading,
  selectTrips,
} from "./state/trips.selectors";

@Component({
  template: `
    <h3>Future trips</h3>
    <pre>Loading: {{ loading$ | async }}</pre>
    <pre>Trips: {{ trips$ | async | json }}</pre>
    <pre>Error: {{ error$ | async }}</pre>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FuturePage {
  loading$: Observable<boolean> = this.store.select(selectLoading);
  trips$: Observable<Trip[]> = this.store.select(selectTrips);
  error$: Observable<string> = this.store.select(selectError);

  constructor(private store: Store<FutureState>) {
    this.store.dispatch(loadTrips());
  }
}
