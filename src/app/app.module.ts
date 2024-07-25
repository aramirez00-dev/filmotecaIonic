import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './pages/home/home.page';
import { LoginPage } from './pages/login/login.page';
import { RegisterPage } from './pages/register/register.page';
import { ProfilePage } from './pages/profile/profile.page';
import { MoviePage } from './pages/movie/movie.page';
import { TruncatePipe } from './pipes/truncate.pipe';
import { RatingPopupComponent } from './pages/movie/rating-popup/rating-popup.component';
import { EditMovieComponent } from './pages/movie/edit-movie/edit-movie.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    LoginPage,
    RegisterPage,
    MoviePage,
    ProfilePage,
    RatingPopupComponent,
    EditMovieComponent,
    TruncatePipe,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
