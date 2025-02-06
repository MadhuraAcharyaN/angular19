import { inject, Injectable, signal } from '@angular/core';

import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, take, tap, throwError } from 'rxjs';
import { ErrorService } from '../shared/error.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private URL = 'http://localhost:3000';
  private userPlaces = signal<Place[]>([]);
  private availablePlaces = signal<Place[]>([]);
  private errorService = inject(ErrorService);

  loadedUserPlaces = this.userPlaces.asReadonly();
  loadedAvailablePlaces = this.availablePlaces.asReadonly();
  private http = inject(HttpClient);

  loadAvailablePlaces(): Observable<Place[]> {
    return this.http.get<{ places: Place[] }>(`${this.URL}/places`).pipe(
      map((res) => res.places),
      catchError((err) => {
        return throwError(
          () => new Error('Something Went Wrong !. Please try after sometimes')
        );
      }),
      tap({
        next: (places) => this.availablePlaces.set(places),
      })
    );
  }

  loadUserPlaces(): Observable<Place[]> {
    return this.http.get<{ places: Place[] }>(`${this.URL}/user-places`).pipe(
      map((res) => res.places),
      catchError((err) => {
        return throwError(
          () =>
            new Error(
              'Something Went Wrong Fetching your fav places!. Please try after sometimes'
            )
        );
      }),
      tap((places) => {
        this.userPlaces.set(places);
      })
    );
  }

  addPlaceToUserPlaces(place: Place) {
    return this.http
      .put<{ userPlaces: Place[] }>(`${this.URL}/user-places`, {
        placeId: place.id,
      })
      .pipe(
        take(1),
        catchError(() => {
          this.errorService.showError('Something went wrong while adding');
          return throwError(
            () => new Error('Something went wrong while adding')
          );
        }),
        tap((places) => {
          this.userPlaces.set(places.userPlaces);
        })
      );
  }

  removeUserPlace(place: Place) {
    return this.http
      .delete<{ userPlaces: Place[] }>(`${this.URL}/user-places/${place.id}`)
      .pipe(take(1))
      .subscribe((res) => {
        this.userPlaces.set(res.userPlaces);
      });
  }
}
