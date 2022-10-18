import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable, of, Subject, switchMap } from "rxjs";
import { Trip } from "../models/trip.interface";
import { ApiService } from "../services/api.service";

@Component({
  template: `
    <app-search-control (search)="onSearchOutput($event)"></app-search-control>
    <pre> Searching for: {{ searchTerm }}</pre>
    <pre> {{ trips$ | async | json }}</pre>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPage {
  searchTerm = "";
  trips$: Observable<Trip[]> = of([]);
  searchTerm$ = new Subject<string>();
  constructor(route: ActivatedRoute, private api: ApiService) {
    // this.searchTerm$ = route.queryParamMap.pipe(
    //   map((params) => params.get("q") || ""),
    //   tap((searchTerm) => (this.searchTerm = searchTerm)),
    //   tap((searchTerm) => console.log("Searching for", this.searchTerm))
    // );
    // ! 2
    // this.onSearchTermClassical(searchTerm$);
    // * 3
    this.onSearchTermSwitched();
  }
  public onSearchOutput(searchTerm: string) {
    // ! 1 every response is processed
    // this.searchTerm = searchTerm;
    // console.log("Searching for", this.searchTerm);
    // this.trips$ = this.api.getTripsByQuery$(this.searchTerm);
    this.searchTerm$.next(searchTerm);
  }

  private onSearchTermClassical(searchTerm$: Observable<string>) {
    // ! 2 avoid nested subscription (same as 1 and may leave open subscriptions)
    searchTerm$.subscribe({
      next: (searchTerm) =>
        (this.trips$ = this.api.getTripsByQuery$(searchTerm)),
    });
  }
  private onSearchTermSwitched() {
    // * 3 switch map cancels pending requests and only repaints on latest results
    this.trips$ = this.searchTerm$.pipe(
      switchMap((searchTerm) => this.api.getTripsByQuery$(searchTerm))
    );
  }
}
