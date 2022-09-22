import { Component, Input, TemplateRef } from "@angular/core";

@Component({
  selector: "app-list",
  template: `
    <article>
      <h3>{{ header }}</h3>
      <ul *ngIf="data.length > 0">
        <li *ngFor="let item of data">
          <ng-container
            [ngTemplateOutlet]="itemTemplate"
            [ngTemplateOutletContext]="{ $implicit: item }"
          ></ng-container>
        </li>
      </ul>
      <span *ngIf="data.length <= 0">🕳️ No data yet</span>
    </article>
  `,
  styles: [],
})
export class ListComponent {
  @Input() header = "";
  @Input() data: unknown[] = [];
  @Input() itemTemplate!: TemplateRef<HTMLElement>;
}
