import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../services/movie-service';
import { Movie } from '../../models/movie-model';
import { PopoverController } from '@ionic/angular';
import { RatingPopupComponent } from './rating-popup/rating-popup.component';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-movie',
  templateUrl: 'movie.page.html',
  styleUrls: ['movie.page.scss'],
})
export class MoviePage implements OnInit, OnDestroy {
  movie: Movie | undefined;
  private subscription: Subscription = new Subscription();
  vistaStatus: boolean = false;
  userRatings: { movieId: number; rating: number }[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    private popoverController: PopoverController
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.route.params.pipe(
        switchMap(params => {
          const movieId = +params['id'];
          return this.movieService.getMovies();
        })
      ).subscribe(movies => {
        const movieId = +this.route.snapshot.paramMap.get('id')!;
        this.movie = movies.find(movie => movie.id === movieId);
        this.loadUserRatings();
      })
    );
  }

  loadUserRatings() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.userRatings = currentUser.ratings || [];
    this.vistaStatus = !!this.userRatings.find(rating => rating.movieId === this.movie?.id);
    console.log('Loaded User Ratings:', this.userRatings);
  }

  toggleVista() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

    if (this.vistaStatus) {
      this.userRatings = this.userRatings.filter(rating => rating.movieId !== this.movie?.id);
    } else {
      this.userRatings.push({ movieId: this.movie!.id, rating: 0 });
    }

    currentUser.ratings = this.userRatings;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    console.log('Updated User Ratings:', currentUser.ratings);
    this.vistaStatus = !this.vistaStatus;
  }

  async presentPopover(ev: any) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const currentRating = this.userRatings.find(rating => rating.movieId === this.movie?.id)?.rating || 0;

    const popover = await this.popoverController.create({
      component: RatingPopupComponent,
      event: ev,
      translucent: true,
      componentProps: {
        currentRating
      }
    });

    popover.onDidDismiss().then((result) => {
      if (result.data !== undefined) {
        this.updateRating(result.data);
      }
    });

    return await popover.present();
  }

  updateRating(rating: number) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const ratingIndex = this.userRatings.findIndex(r => r.movieId === this.movie?.id);

    if (ratingIndex !== -1) {
      this.userRatings[ratingIndex].rating = rating;
    } else {
      this.userRatings.push({ movieId: this.movie!.id, rating });
    }

    currentUser.ratings = this.userRatings;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    console.log('Rating Updated:', this.userRatings);
  }

  editInfo() {
    if (this.movie) {
      this.router.navigate(['/edit-movie', this.movie.id]);
    }
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
