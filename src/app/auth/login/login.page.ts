import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ComponentStatus } from "src/app/models/component-status.interface";
import { Credentials } from "src/app/models/credentials.interface";
import { AuthenticationService } from "../authentication.service";

@Component({
  selector: "app-login",
  template: `
    <h2>🔐 Login with your account</h2>
    <app-login-form
      (goHome)="onGoHome()"
      (logIn)="onLogIn($event)"
      (formDirty)="onFormDirty($event)"
    ></app-login-form>
  `,
  styles: [],
})
export class LoginPage implements OnInit, ComponentStatus {
  isFormDirty = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authentication: AuthenticationService
  ) {}

  ngOnInit(): void {}

  onGoHome() {
    // http://localhost:4214/(info:imatia)
    // localhost:4214/(info:msg)
    // http://localhost:4214/(info:Going%20home%20without%20logging%20in)
    this.router.navigate([
      {
        outlets: {
          primary: ["/"],
          info: ["Going home without logging in"],
        },
      },
    ]);
  }
  onLogIn(credentials: Credentials) {
    console.log("Simulated Login", credentials);
    this.isFormDirty = false;
    this.authentication.user.isAuthenticated = true;
    this.navigateBack();
  }
  onFormDirty(isFormDirty: boolean) {
    this.isFormDirty = isFormDirty;
  }

  canDeactivate(): boolean {
    if (!this.isFormDirty) return true;
    const response = window.confirm();
    return response;
  }

  private navigateBack() {
    const returnUrl = this.route.snapshot.queryParamMap.get("returnUrl") || "/";
    this.router.navigateByUrl(returnUrl);
  }
}
