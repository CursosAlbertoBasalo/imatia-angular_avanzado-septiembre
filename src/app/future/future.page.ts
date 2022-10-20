import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { FutureState, loadTrips } from "./state";
import { selectLoading } from "./state/trips.selectors";

@Component({
  template: `
    <h3>Future trips</h3>
    <pre>Loading: {{ loading$ | async }}</pre>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FuturePage {
  loading$: Observable<boolean> = this.store.select(selectLoading);

  constructor(private store: Store<FutureState>) {
    this.store.dispatch(loadTrips());
  }
}
