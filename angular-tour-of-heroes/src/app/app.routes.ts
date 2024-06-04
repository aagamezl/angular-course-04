import { Routes } from '@angular/router';

import { HeroesComponent } from './heroes/heroes.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { HeroDetailsComponent } from './hero-details/hero-details.component';
import { HeroNewComponent } from './hero-new/hero-new.component';
import { authGuard } from './authentication/auth.guard';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'heroes',
    canActivate: [authGuard],
    component: HeroesComponent,
  },
  { path: 'heroes/new', component: HeroNewComponent },
  {
    path: 'detail/:id',
    canActivate: [authGuard],
    // component: HeroDetailsComponent
    loadComponent: () => import('./hero-details/hero-details.component').then(module => module.HeroDetailsComponent)
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    // component: DashboardComponent
    loadComponent: () => import('./dashboard/dashboard.component').then(module => module.DashboardComponent)
  },
  { path: 'login', component: LoginComponent },
  // { path: '**', component: ng NotFou }
];
