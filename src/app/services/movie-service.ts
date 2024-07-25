import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Movie } from '../models/movie-model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private moviesSubject = new BehaviorSubject<Movie[]>([]);
  private movies$ = this.moviesSubject.asObservable();

  constructor() {}

  initializeMovies(movies: Movie[]): void {
    this.moviesSubject.next(movies);
    console.log(movies);
  }

  getMovies(): Observable<Movie[]> {
    return this.movies$;
  }

  getMovieById(id: number): Movie | undefined {
    const movies = this.moviesSubject.getValue();
    return movies.find(movie => movie.id === id);
  }

  updateMovie(updatedMovie: Movie): void {
    const movies = this.moviesSubject.getValue();
    const index = movies.findIndex(movie => movie.id === updatedMovie.id);
    if (index !== -1) {
      movies[index] = updatedMovie;
      this.moviesSubject.next(movies);
    }
  }
}
