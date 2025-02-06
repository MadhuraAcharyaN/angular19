import {
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { HttpClient } from '@angular/common/http';
import { Place } from '../place.model';
import { catchError, map, throwError } from 'rxjs';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent implements OnInit {
  places = computed(() => this.placesService.loadedUserPlaces()); //signal<Place[] | undefined>(undefined);
  isFetching = signal(false);
  erroSignal = signal('');
  private placesService = inject(PlacesService);
  // private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const sub$ = this.placesService
      .loadUserPlaces()

      .subscribe({
        error: (error: Error) => {
          console.log(error);
          this.erroSignal.set(error.message);
        },
        complete: () => {
          // console.log('complete');
          this.isFetching.set(false);
        },
      });

    this.destroyRef.onDestroy(() => {
      sub$.unsubscribe();
    });
  }

  removeSelectedPlace(place: Place): void {
    this.placesService.removeUserPlace(place);
  }
}
