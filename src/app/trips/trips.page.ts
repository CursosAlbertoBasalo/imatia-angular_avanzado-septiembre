import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from "@angular/core";
import { forkJoin, map, mergeMap, Observable } from "rxjs";
import { Agency } from "../models/agency.interface";
import { Trip } from "../models/trip.interface";
import { ApiService } from "../services/api.service";

@Component({
  template: `
    <h2>Confirmed Trips for active agencies</h2>

    <h3>Synchronous</h3>
    <!-- <p>Active agencies</p>
    <pre>{{ agencies | json }}</pre> -->
    <p>Confirmed Trips</p>
    <pre>{{ trips | json }}</pre>

    <h3>Asynchronous</h3>
    <!-- <p>Active agencies</p>
    <pre>{{ agencies | json }}</pre> -->
    <p>Confirmed Trips</p>
    <pre>{{ trips$ | async | json }}</pre>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [],
})
export class TripsPage {
  // agencies: Agency[] = [];
  trips: Trip[] = [];

  trips$: Observable<Trip[]> = this.api.getAgencies$().pipe(
    map((allAgencies) => allAgencies.filter(this.byStatusActive)),
    map((agencies) => agencies.map(this.fromAgencyToTrips$.bind(this))),
    map((tripRequests$) => forkJoin(tripRequests$)),
    mergeMap((tripRequest$) => tripRequest$),
    map((results) => results.flat()),
    map((allTrips) => allTrips.filter(this.byStatusConfirmed))
  );

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {
    // this.classicalSubscribe();
    this.parallelSubscribe();
  }

  private parallelSubscribe() {
    this.api.getAgencies$().subscribe((allAgencies: Agency[]) => {
      const agencies: Agency[] = allAgencies.filter(this.byStatusActive);
      const tripRequests$: Observable<Trip[]>[] = agencies.map(
        this.fromAgencyToTrips$.bind(this)
      );
      forkJoin(tripRequests$).subscribe((results) => {
        const allTrips = results.flat();
        this.trips = allTrips.filter(this.byStatusConfirmed);
        this.cdr.markForCheck();
      });
    });
  }

  private fromAgencyToTrips$(agency: Agency): Observable<Trip[]> {
    return this.api.getTripsByAgencyId$(agency.id);
  }

  private classicalSubscribe() {
    this.api.getAgencies$().subscribe((allAgencies: Agency[]) => {
      const agencies = allAgencies.filter(this.byStatusActive);
      agencies.forEach((a) => {
        this.api.getTripsByAgencyId$(a.id).subscribe((allTrips) => {
          const trips = allTrips.filter(this.byStatusConfirmed);
          this.trips.push(...trips);
          this.cdr.markForCheck();
        });
      });
    });
  }

  private byStatusActive(agency: Agency) {
    return agency.status === "Active";
  }
  private byStatusConfirmed(trip: Trip): boolean {
    return trip.status === "Confirmed";
  }
}
