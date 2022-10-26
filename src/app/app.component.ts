import { Component } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { NavigationEnd, Router } from "@angular/router";
import { SwUpdate, VersionEvent } from "@angular/service-worker";
import { filter, interval } from "rxjs";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-root",
  template: `
    <app-header [title]="appTitle"></app-header>
    <main>
      <router-outlet></router-outlet>
    </main>
    <app-footer [title]="appTitle"></app-footer>
    <pre>19:04</pre>
    <section *ngIf="newVersion !== ''">
      🔔 {{ newVersion }}
      <button (click)="onClick()">♻️ Reload</button>
    </section>
  `,
  styles: [],
})
export class AppComponent {
  appTitle = environment.title;
  newVersion = "";

  onClick() {
    window.location.reload();
  }

  constructor(router: Router, titleService: Title, swUpdate: SwUpdate) {
    swUpdate.versionUpdates.subscribe((event: VersionEvent) => {
      if (event?.type === "VERSION_READY") {
        const version = event.latestVersion;
        this.newVersion = version.appData
          ? JSON.stringify(version.appData)
          : version.hash;
      }
    });

    const oneMinute = 1000 * 60;
    interval(oneMinute).subscribe(() => swUpdate.checkForUpdate());

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
