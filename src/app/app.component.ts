import { Component, OnInit } from '@angular/core';
import { TmdbService } from './services/tmdb-service';
import { MovieService } from './services/movie-service';
import { UserService } from './services/user-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private tmdbService: TmdbService, private movieService: MovieService, private userService: UserService) {}

  ngOnInit() {
    this.userService.clearAllUsers();
    this.userService.initializeUsers();
    this.tmdbService.getPopularMovies().subscribe(movies => {
      this.movieService.initializeMovies(movies);
    });
  }
}
