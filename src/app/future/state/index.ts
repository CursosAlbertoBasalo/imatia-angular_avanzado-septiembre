import { createReducer, MetaReducer, on } from "@ngrx/store";
import { Trip } from "src/app/models/trip.interface";
import { environment } from "../../../environments/environment";
import { loadTrips } from "./trips.actions";
export * from "./trips.actions";

export const futureFeatureKey = "future";

export interface FutureState {
  loading: boolean;
  error: string;
  trips: Trip[];
}

export const initialState: FutureState = {
  loading: false,
  error: "",
  trips: [],
};

export const reducers = createReducer(
  initialState,
  on(loadTrips, (state: FutureState) => ({ ...state, loading: true }))
  // on(loadTripsSuccess),
  // on(loadTripsFailure)
);

export const metaReducers: MetaReducer<FutureState>[] = !environment.production
  ? []
  : [];
