import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Agency } from "src/app/models/agency.interface";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "app-agencies-view",
  template: `
    <!-- <article *ngIf="agency$ | async as agency; else noData"> -->
    <article>
      <h2>{{ agency.name }}</h2>
      <pre> {{ agency | json }} </pre>
      <button (click)="onRemove(agency.id)">➖ Remove Agency</button>
    </article>
    <!-- <ng-template #noData>no data yet</ng-template> -->
  `,
  styles: [],
})
export class AgenciesViewPage {
  agency: Agency;
  // agency$: Observable<Agency>;

  constructor(
    route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) {
    this.agency = route.snapshot.data["agency"];
    // this.agency$ = this.api.getAgencyById$("space-y");
  }

  onRemove(agencyId: string) {
    this.api
      .deleteAgency$(agencyId)
      .subscribe(() => this.router.navigate(["agencies"]));
  }
}
