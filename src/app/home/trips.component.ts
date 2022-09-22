import { Component } from "@angular/core";
import { data } from "../data.repository";

@Component({
  selector: "app-trips",
  styles: [
    `
      .green {
        color: green;
      }
      .orange {
        color: orange;
      }
      .sold-out {
        color: red;
      }
      .few-places {
        color: orange;
      }
    `,
  ],
  template: `
    <app-list
      [header]="getHeader()"
      [data]="trips"
      [itemTemplate]="tripTemplate"
    >
      <ng-template #tripTemplate let-context>
        <span [ngClass]="byStatus(context.status)">
          {{ context.destination }}
        </span>
        <span>💸 {{ context.flightPrice | currency }}</span>
        <span>⤴️ {{ context.startDate | date: "yyyy-MMM-dd" }}</span>
        <span>⤵️ {{ context.endDate | date: "yyyy-MMM-dd" }}</span>
        <span [ngClass]="byPlaces(context.places)">
          🧑🏼‍🚀 {{ context.places }}
        </span>
        <span *ngIf="context.kind === 'WithStay'">🧳</span>
        <span *ngIf="context.kind === 'TripOnly'">🛰️</span>
      </ng-template>
    </app-list>
  `,
})
export class TripsComponent {
  trips = data.trips;
  getHeader = () => `Offering ${this.trips.length} trips`;
  byStatus = (status: string) => (status === "Confirmed" ? "green" : "orange");
  byPlaces(places: number): string {
    if (places === 0) return "sold-out";
    if (places < 8) return "few-places";
    return "";
  }
}
