import { createReducer, on } from "@ngrx/store";
import { Trip } from "src/app/models/trip.interface";
import { FutureState } from ".";
import { loadTrips, loadTripsFailure, loadTripsSuccess } from "./trips.actions";

const initialState: FutureState = {
  loading: false,
  error: "",
  trips: [],
};

function tripsSuccessReducer(state: FutureState, payload: { trips: Trip[] }) {
  return {
    ...state,
    loading: false,
    trips: payload.trips,
    error: "",
  };
}

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

// Version 8

// function tripsReducer(state: FutureState, action: TripsActions): FutureState {
//   const actionType: TripsActionTypes = action.type as TripsActionTypes;
//   switch (action.type) {
//     case TripsActionTypes.LoadTrips:
//       return { ...state, loading: true };
//     case TripsActionTypes.LoadTripsSuccess:
//       return {
//         ...state,
//         loading: false,
//         trips: action.payload?.trips,
//         error: "",
//       };
//     case TripsActionTypes.LoadTripsFailure:
//       return {
//         ...state,
//         loading: false,
//         trips: [],
//         error: action.payload?.error,
//       };
//     default:
//       return state;
//   }
// }
