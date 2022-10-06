import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  template: `
    <app-search-control (search)="onSearch($event)"></app-search-control>
    <h3>{{ searchTerm }}</h3>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPage {
  searchTerm: string = "";
  onSearch(searchTerm: string) {
    this.searchTerm = searchTerm;
    console.log("Searching for", this.searchTerm);
  }
}
