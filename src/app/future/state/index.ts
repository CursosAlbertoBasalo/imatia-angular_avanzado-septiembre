import { MetaReducer } from "@ngrx/store";
import { Trip } from "src/app/models/trip.interface";
import { environment } from "../../../environments/environment";
export * from "./trips.actions";
export * from "./trips.effects";
export * from "./trips.reducers";
export * from "./trips.selectors";

export const futureFeatureKey = "future";

export interface FutureState {
  loading: boolean;
  error: string;
  trips: Trip[];
}

export const metaReducers: MetaReducer<FutureState>[] = !environment.production
  ? []
  : [];
