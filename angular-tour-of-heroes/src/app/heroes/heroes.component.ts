import { Component } from '@angular/core';
import { NgFor, UpperCasePipe } from '@angular/common';

import { Hero } from './hero';
import { HeroDetailsComponent } from '../hero-details/hero-details.component';
import { HeroService } from './hero.service';
import { MessageService } from '../message.service';
import { RouterModule } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [
    NgFor,
    HeroDetailsComponent,
    UpperCasePipe,
    RouterModule
  ],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent {
  heroes: Hero[] = [];
  selectedHero?: Hero;

  constructor(
    private heroService: HeroService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;

    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes)
  }
}
