import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Agency } from "../models/agency.interface";

@Component({
  selector: "app-agencies",
  changeDetection: ChangeDetectionStrategy.Default,
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
      [itemTemplate]="agencyListItem"
    ></app-list>
    <ng-template #agencyListItem let-context>
      <span [ngClass]="context.status | agencyStatus">{{ context.name }}</span>
      <ng-container
        *ngIf="
          context.range === 'Interplanetary';
          then interplanetary;
          else orbital
        "
      ></ng-container>
    </ng-template>
    <ng-template #interplanetary>🪐</ng-template>
    <ng-template #orbital>🌍</ng-template>
  `,
})
export class AgenciesComponent {
  @Input() agencies: Agency[] = [];
  byStatus(status: string) {
    console.log("status", status);
    return status.toLowerCase();
  }

  getHeader() {
    const header = `We work with ${this.agencies.length} agencies`;
    // console.log("header", header);
    return header;
  }
}
