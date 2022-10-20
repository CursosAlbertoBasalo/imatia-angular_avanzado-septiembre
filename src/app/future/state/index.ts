import { createReducer, MetaReducer, on } from "@ngrx/store";
import { Trip } from "src/app/models/trip.interface";
import { environment } from "../../../environments/environment";
import { loadTrips, loadTripsFailure, loadTripsSuccess } from "./trips.actions";
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

const tripsSuccessReducer = (
  state: FutureState,
  payload: { trips: Trip[] }
) => ({
  ...state,
  loading: false,
  trips: payload.trips,
  error: "",
});

const tripsFailureReducer = (
  state: FutureState,
  payload: { error: string }
) => ({
  ...state,
  loading: false,
  trips: [],
  error: payload.error,
});

export const reducers = createReducer(
  initialState,
  on(loadTrips, (state: FutureState) => ({ ...state, loading: true })),
  on(loadTripsSuccess, tripsSuccessReducer),
  on(loadTripsFailure, tripsFailureReducer)
);

export const metaReducers: MetaReducer<FutureState>[] = !environment.production
  ? []
  : [];
