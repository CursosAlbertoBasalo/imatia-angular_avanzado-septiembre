import { Component } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-root",
  template: `
    <app-header [title]="appTitle"></app-header>
    <main>
      <router-outlet></router-outlet>
    </main>
    <app-footer [title]="appTitle"></app-footer>
  `,
  styles: [],
})
export class AppComponent {
  appTitle = environment.title;
  constructor(router: Router, titleService: Title) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        let route = router.routerState.root;
        let routeTitle = "";
        while (route.firstChild) {
          route = route.firstChild;
        }
        routeTitle = route.snapshot.data["title"] || "";
        console.log(routeTitle);
        titleService.setTitle(routeTitle);
      });
  }
}
