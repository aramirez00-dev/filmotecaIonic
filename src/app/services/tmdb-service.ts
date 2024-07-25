import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movie } from '../models/movie-model';
import { MovieService } from './movie-service';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private apiKey = 'b3954a633a23e3d9f7ca4d72281f3fe6';
  private apiUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient, private movieService: MovieService) {}

  getPopularMovies(): Observable<Movie[]> {
    return this.http.get<any>(`${this.apiUrl}/movie/popular?api_key=${this.apiKey}&language=es-MX&page=1`).pipe(
      map(response => response.results.slice(0, 50)),
      map(movies => movies.map((movie: any) => this.mapToMovieModel(movie))),
      map(movies => {
        return movies;
      })
    );
  }

  private mapToMovieModel(movie: any): Movie {
    return {
      id: movie.id,
      name: movie.title,
      synopsis: movie.overview,
      mainPoster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      avgUserScore: movie.vote_average,
      releaseDate: movie.release_date,
      directors: [],
      actors: [],
      writers: [],
      genres: movie.genres ? movie.genres.map((genre: any) => genre.name) : [],
      duration: movie.runtime || 0
    };
  }

  getMovieDetails(movieId: number): Observable<Movie> {
    return this.http.get<any>(`${this.apiUrl}/movie/${movieId}?api_key=${this.apiKey}&language=es-MX&append_to_response=credits`).pipe(
      map(movie => {
        const directors = movie.credits.crew.filter((member: any) => member.job === 'Director').map((director: any) => director.name);
        const writers = movie.credits.crew.filter((member: any) => member.job === 'Writer').map((writer: any) => writer.name);
        const actors = movie.credits.cast.slice(0, 10).map((actor: any) => actor.name);
        const genres = movie.genres.map((genre: any) => genre.name);
        return {
          ...this.mapToMovieModel(movie),
          directors,
          writers,
          actors,
          genres,
          duration: movie.runtime
        };
      })
    );
  }
}
