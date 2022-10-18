import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user.interface";
import { ApiService } from "../services/api.service";
import { AuthenticationStore } from "./authentication.store";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  user = {
    name: "Anonymous",
    email: "",
    isAuthenticated: false,
  };
  constructor(private api: ApiService, private store: AuthenticationStore) {
    const auth = { email: "", accessToken: "token", isAuthenticated: true };
    store.setState(auth);
    auth.email = "kk";
    store.getState$().subscribe((auth) => (auth.email = "kk"));
  }

  register$(user: Partial<User>): Observable<string> {
    return this.api.register$({
      name: user.name,
      email: user.email,
      password: user.password,
    });
  }
}
