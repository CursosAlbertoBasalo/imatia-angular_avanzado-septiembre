import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FutureState } from ".";

export const selectFutureState = createFeatureSelector<FutureState>("future");

export const selectLoading = createSelector(
  selectFutureState,
  (state) => state.loading
);
