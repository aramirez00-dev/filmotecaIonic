import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { MovieService } from '../../services/movie-service';
import { Movie } from '../../models/movie-model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  movies: Movie[] = [];

  constructor(
    private movieService: MovieService,
    private menuCtrl: MenuController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.movieService.getMovies().subscribe(movies => {
      this.movies = movies;
    });
  }

  closeMenu() {
    this.menuCtrl.close();
  }

  logOut() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

    if (users && currentUser.username) {
      const updatedUsers = users.map((user: any) => {
        if (user.username === currentUser.username) {
          return currentUser;
        }
        return user;
      });

      localStorage.setItem('users', JSON.stringify(updatedUsers));
    }
    localStorage.removeItem('currentUser');
    this.navCtrl.navigateRoot('/login');
  }
}
