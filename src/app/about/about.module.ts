import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AboutPage } from "./about.page";
import { HistoryComponent } from './history.component';
import { MissionComponent } from './mission.component';

@NgModule({
  declarations: [AboutPage, HistoryComponent, MissionComponent],
  imports: [CommonModule, RouterModule, SharedModule],
})
export class AboutModule {}
