import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { RegisterPage } from './pages/register/register.page';
import { HomePage } from './pages/home/home.page';
import { MoviePage } from './pages/movie/movie.page';
import { ProfilePage } from './pages/profile/profile.page';
import { EditMovieComponent } from './pages/movie/edit-movie/edit-movie.component';

const routes: Routes = [
  { path: 'home', component: HomePage },
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },
  { path: 'movie/:id', component: MoviePage },
  { path: 'edit-movie/:id', component: EditMovieComponent },
  { path: 'profile', component: ProfilePage },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
