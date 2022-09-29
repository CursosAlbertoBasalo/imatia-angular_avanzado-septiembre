import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map, Observable } from "rxjs";

@Component({
  selector: "app-info",
  template: `
    <p>👋🏼 {{ info$ | async }}</p>
  `,
  styles: [],
})
export class InfoComponent implements OnInit {
  info$: Observable<string>;
  constructor(route: ActivatedRoute) {
    this.info$ = route.params.pipe(map((params) => params["msg"] || "imatia"));
  }

  ngOnInit(): void {}
}
