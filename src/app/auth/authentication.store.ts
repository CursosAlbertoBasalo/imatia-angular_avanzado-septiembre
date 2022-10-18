import { Injectable } from "@angular/core";
import { BehaviorSubject, distinctUntilChanged, map, Observable } from "rxjs";
import { Auth } from "../models/auth.interface";

@Injectable({ providedIn: "root" })
export class AuthenticationStore {
  private initialState: Auth = {
    email: "",
    isAuthenticated: false,
    accessToken: "",
  };
  private state$ = new BehaviorSubject(this.initialState);

  public getState(): Auth {
    return this.clone(this.state$.getValue());
  }
  public getState$(): Observable<Auth> {
    return this.state$.asObservable().pipe(map((auth) => this.clone(auth)));
  }
  public selectIsAuthenticated$(): Observable<boolean> {
    return this.select$<boolean>((state) => state.isAuthenticated);
  }
  public select$<T>(selector: (state: Auth) => T): Observable<T> {
    return this.getState$().pipe(map(selector), distinctUntilChanged());
  }

  public setState(mutation: Partial<Auth>): void {
    const current = this.getState();
    const mutationCloned = this.clone(mutation);
    const next = { ...current, ...mutationCloned };
    this.state$.next(next);
  }

  private clone(auth: any): any {
    return JSON.parse(JSON.stringify(auth));
  }
}
