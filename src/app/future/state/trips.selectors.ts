import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FutureState } from ".";

const selectFutureState = createFeatureSelector<FutureState>("future");

export const selectLoading = createSelector(
  selectFutureState,
  (state) => state.loading
);
export const selectIdle = createSelector(
  selectFutureState,
  (state) => !state.loading
);
export const selectTrips = createSelector(
  selectFutureState,
  (state) => state.trips
);
export const selectTripsCounter = createSelector(
  selectFutureState,
  (state) => state.trips.length
);
export const selectError = createSelector(selectFutureState, (state) =>
  state.error.toUpperCase()
);
