import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map, Observable, switchMap } from "rxjs";
import { Trip } from "../models/trip.interface";
import { ApiService } from "../services/api.service";

@Component({
  template: `
    <app-search-control (search)="onSearch($event)"></app-search-control>
    <h3>{{ searchTerm }}</h3>
    <pre> {{ trips$ | async | json }}</pre>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPage {
  searchTerm: string = "";
  trips$: Observable<Trip[]> = this.route.queryParamMap.pipe(
    map((qpMap) => qpMap.get("searchTerm") || ""),
    switchMap((searchTerm) => this.api.getTripsByQuery$(searchTerm))
  );

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    // this.classicalSubscribe();
  }

  classicalSubscribe() {
    this.route.queryParamMap.subscribe((qpMap) => {
      const searchTerm = qpMap.get("searchTerm") || "";
      this.trips$ = this.api.getTripsByQuery$(searchTerm);
      this.cdr.markForCheck();
    });
  }

  onSearch(searchTerm: string) {
    this.searchTerm = searchTerm;
    console.log("Searching for", this.searchTerm);
    this.trips$ = this.api.getTripsByQuery$(this.searchTerm);
  }
}
