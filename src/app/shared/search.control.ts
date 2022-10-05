import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from "@angular/core";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  pipe,
} from "rxjs";

@Component({
  selector: "app-search-control",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <input #searchInput type="search" placeholder="Search" />
  `,
})
export class SearchControl implements AfterViewInit {
  @Output() searchTerm = new EventEmitter<string>();
  @ViewChild("searchInput", { static: true }) searchInput!: ElementRef;

  ngAfterViewInit(): void {
    this.createSearchableTerm$().subscribe((searchTerm: string) => {
      this.searchTerm.emit(searchTerm);
    });
  }

  createSearchableTerm$() {
    const searchSource$ = fromEvent(this.searchInput.nativeElement, "input");
    return searchSource$.pipe(this.getPipe$());
  }

  getPipe$() {
    return pipe(
      debounceTime(500),
      map(this.toValue),
      filter(this.byLength),
      distinctUntilChanged()
    );
  }

  toValue = (event: any) => event.target.value;
  byLength = (searchTerm: string) => searchTerm.length > 2;
}
