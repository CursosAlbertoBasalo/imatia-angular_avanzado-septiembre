import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FutureState } from ".";

export const selectFutureState = createFeatureSelector<FutureState>("future");

export const selectLoading = createSelector(
  selectFutureState,
  (state) => state.loading
);
export const selectTrips = createSelector(
  selectFutureState,
  (state) => state.trips
);
export const selectError = createSelector(
  selectFutureState,
  (state) => state.error
);
