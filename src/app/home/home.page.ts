import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { data } from "../data.repository";
import { Trip } from "../models/trip.interface";
import { ApiService } from "../services/api.service";

@Component({
  selector: "app-home",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-agencies [agencies]="homeData.agencies"></app-agencies>
    <app-trips *ngIf="trips$ | async as trips" [trips]="trips"></app-trips>
    <app-reloading (reload)="onReload()"></app-reloading>
    <h1>{{ lang }}</h1>
  `,
  styles: [],
})
export class HomePage {
  homeData = data;
  trips$!: Observable<Trip[]>;
  lang = "";
  constructor(private api: ApiService, route: ActivatedRoute) {
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
