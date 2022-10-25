import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, Observable, of } from "rxjs";
import { ApiService } from "src/app/services/api.service";
import { loadTrips, loadTripsFailure, loadTripsSuccess } from "./trips.actions";

@Injectable()
export class TripsEffects {
  public loadTrips$: Observable<unknown> = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTrips),
      mergeMap(() =>
        this.api.getTrips$().pipe(
          map((trips) => loadTripsSuccess({ trips })),
          catchError((error) => of(loadTripsFailure({ error: error.message })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private api: ApiService) {}
}
