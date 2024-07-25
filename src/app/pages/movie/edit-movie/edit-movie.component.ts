import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/models/movie-model';
import { MovieService } from 'src/app/services/movie-service';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.scss'],
})
export class EditMovieComponent implements OnInit {
  movie: Movie | undefined;

  movieName: string = '';
  movieSynopsis: string = '';
  movieAvgUserScore: number | undefined;
  movieReleaseDate: string = '';
  movieDuration: number | undefined;

  directorsInput: string = '';
  actorsInput: string = '';
  writersInput: string = '';
  genresInput: string = '';

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const movieId = +this.route.snapshot.paramMap.get('id')!;

    this.movieService.getMovies().subscribe(movies => {
      this.movie = movies.find(movie => movie.id === movieId);

      if (this.movie) {
        this.movieName = this.movie.name;
        this.movieSynopsis = this.movie.synopsis;
        this.movieAvgUserScore = this.movie.avgUserScore;
        this.movieReleaseDate = this.movie.releaseDate;
        this.movieDuration = this.movie.duration;

        this.directorsInput = this.movie.directors.join(', ');
        this.actorsInput = this.movie.actors.join(', ');
        this.writersInput = this.movie.writers.join(', ');
        this.genresInput = this.movie.genres.join(', ');

        this.cdr.detectChanges();
      }
    });
  }

  updateDirectors(value: string) {
    this.directorsInput = value;
  }

  updateActors(value: string) {
    this.actorsInput = value;
  }

  updateWriters(value: string) {
    this.writersInput = value;
  }

  updateGenres(value: string) {
    this.genresInput = value;
  }

  saveChanges() {
    if (this.movie) {
      this.movie.name = this.movieName;
      this.movie.synopsis = this.movieSynopsis;
      this.movie.avgUserScore = this.movieAvgUserScore!;
      this.movie.releaseDate = this.movieReleaseDate;
      this.movie.duration = this.movieDuration!;

      this.movie.directors = this.directorsInput.split(',').map(s => s.trim());
      this.movie.actors = this.actorsInput.split(',').map(s => s.trim());
      this.movie.writers = this.writersInput.split(',').map(s => s.trim());
      this.movie.genres = this.genresInput.split(',').map(s => s.trim());

      this.movieService.updateMovie(this.movie);
      this.router.navigate(['/movie', this.movie.id]);
    }
  }

  goBack(){
    if(this.movie){
      this.router.navigate(['/movie', this.movie.id]);
    }
  }
}
