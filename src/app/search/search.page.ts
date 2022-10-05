import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  template: `
    <app-search-control
      (searchTerm)="onSearchTerm($event)"
    ></app-search-control>
    <h3>{{ searchTerm }}</h3>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPage {
  searchTerm: string = "";
  onSearchTerm(searchTerm: string) {
    this.searchTerm = searchTerm;
    console.log("Received", this.searchTerm);
  }
}
