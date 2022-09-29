import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { map, Observable } from "rxjs";
import { Agency } from "../models/agency.interface";
import { ApiService } from "../services/api.service";
@Component({
  selector: "app-agencies",
  template: `
    <article>
      <button (click)="onNewClick()">➕ Add new Agency</button>
      <app-agencies-list
        *ngIf="agencies$ | async as agencies"
        [agencies]="agencies"
      ></app-agencies-list>
    </article>
    <pre>
Show trips for Agency...
    </pre
    >
    <h2>Selected: {{ agency }}</h2>
    <h4>Selected : {{ agency$ | async }}</h4>
  `,
  styles: [],
})
export class AgenciesPage {
  // agencies = this.data.getAgencies();
  // agencies: Agency[] = [];

  agencies$: Observable<Agency[]> = this.api.getAgencies$();

  agency: string = "";
  agency$!: Observable<string>;

  constructor(
    private router: Router,
    private api: ApiService,
    private route: ActivatedRoute
  ) {
    // api.getAgencies$().subscribe({ next: (body) => (this.agencies = body) });
    this.agency = route.snapshot.paramMap.get("id") || "";
    this.agency$ = route.paramMap.pipe(
      map((paramMap) => paramMap.get("id") || "")
    );
  }

  onNewClick = () => this.router.navigate(["agencies", "agency", "new"]);
}
