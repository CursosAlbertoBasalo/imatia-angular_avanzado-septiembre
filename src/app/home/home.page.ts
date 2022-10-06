import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { forkJoin, Observable } from "rxjs";
import { data } from "../data.repository";
import { Agency } from "../models/agency.interface";
import { Trip } from "../models/trip.interface";
import { ApiService } from "../services/api.service";

@Component({
  selector: "app-home",
  changeDetection: ChangeDetectionStrategy.Default,
  template: `
    <app-agencies [agencies]="homeData.agencies"></app-agencies>
    <app-trips *ngIf="trips$ | async as trips" [trips]="trips"></app-trips>
    <app-reloading (reload)="onReload()"></app-reloading>
    <h1>{{ lang }}</h1>
    <pre>{{ result | json }}</pre>
  `,
  styles: [],
})
export class HomePage {
  homeData = data;

  trips$!: Observable<Trip[]>;
  agencies$!: Observable<Agency[]>;

  lang = "";
  result: {
    trips: any[];
    agencies: any[];
  } = {
    trips: [],
    agencies: [],
  };
  constructor(private api: ApiService, route: ActivatedRoute) {
    const requests$ = {
      trips: this.api.getTrips$(),
      agencies: this.api.getAgencies$(),
    };

    forkJoin(requests$).subscribe((response) => (this.result = response));

    this.lang = route.snapshot.data["lang"] || "";
    this.refreshWithOnPush();
  }

  onReload() {
    console.clear();
    console.log("♻️ reloading");
    this.refreshWithOnPush();
  }

  private refreshWithOnPush() {
    this.changeReference();
    this.useAsyncPipe();
  }

  private changeReference() {
    this.homeData.agencies = [...data.agencies];
  }
  private useAsyncPipe() {
    this.trips$ = this.api.getTrips$();
  }
}
