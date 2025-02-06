import {
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { catchError, map, of, throwError } from 'rxjs';
import { Place } from '../place.model';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  private placesService = inject(PlacesService);

  places = computed(() => this.placesService.loadedAvailablePlaces());
  isFetching = signal(false);
  erroSignal = signal('');
  // private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.isFetching.set(true);
    const subscription$ = this.placesService.loadAvailablePlaces().subscribe({
      error: (error: Error) => {
        console.log(error);
        this.erroSignal.set(error.message);
      },
      complete: () => {
        console.log('complete');
        this.isFetching.set(false);
      },
    });

    this.destroyRef.onDestroy(() => {
      console.log('ref');
      subscription$.unsubscribe();
    });
  }

  selectedPlace(place: Place): void {
    // this.httpClient
    //   .put('http://localhost:3000/user-places', {
    //     placeId: place.id,
    //   })
    //   .subscribe({
    //     next: (response) => {
    //       console.log(response);
    //     },
    //   });
    this.placesService.addPlaceToUserPlaces(place).subscribe();
  }
}
