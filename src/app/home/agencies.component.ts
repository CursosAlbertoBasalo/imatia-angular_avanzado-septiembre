import { Component, Input } from "@angular/core";
import { Agency } from "../models/agency.interface";

@Component({
  selector: "app-agencies",
  styles: [
    `
      .active {
        font-style: normal;
        font-weight: bold;
      }
      .pending {
        font-style: italic;
      }
    `,
  ],
  template: `
    <app-list
      [header]="getHeader()"
      [data]="agencies"
      [itemTemplate]="agencyTemplate"
    ></app-list>
    <ng-template #agencyTemplate let-context>
      <span [ngClass]="byStatus(context.status)">{{ context.name }}</span>
      <span *ngIf="context.range === 'Interplanetary'">🪐</span>
      <span *ngIf="context.range === 'Orbital'">🌍</span>
    </ng-template>
  `,
})
export class AgenciesComponent {
  @Input() agencies: Agency[] = [];
  byStatus = (status: string) => status.toLowerCase();
  getHeader = () => `We work with ${this.agencies.length} agencies`;
}
