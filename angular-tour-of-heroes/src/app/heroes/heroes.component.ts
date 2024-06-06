import { Component } from '@angular/core';
import { NgClass, NgFor, UpperCasePipe } from '@angular/common';

import { Hero } from './hero';
import { HeroDetailsComponent } from '../hero-details/hero-details.component';
import { HeroService } from './hero.service';
import { MessageService } from '../message.service';
import { RouterModule } from '@angular/router';
import { forkJoin, map, mergeMap } from 'rxjs';
import { PowersService } from './powers.service';

// export interface HeroWithPower extends Omit<Hero, 'power'> {
//   power: string;
// }

export enum OrderDirection {
  DOWN,
  UP
};

type OrderColumn = | 'name' | 'alias' | 'power';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [
    NgClass,
    NgFor,
    HeroDetailsComponent,
    UpperCasePipe,
    RouterModule
  ],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent {
  heroes: Hero<string>[] = [];
  // heroesWithPower: HeroWithPower[] = [];
  orderDirection: Record<OrderColumn, OrderDirection> = {
    'name': OrderDirection.UP,
    'alias': OrderDirection.UP,
    'power': OrderDirection.UP,
  };

  constructor(
    private heroService: HeroService,
    private powersService: PowersService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  onChangeOrder(column: OrderColumn) {
    if (this.orderDirection[column] === OrderDirection.DOWN) {
      this.orderDirection[column] = OrderDirection.UP;
      this.heroes.sort((a, b) => a[column].localeCompare(b[column]))
    } else {
      this.orderDirection[column] = OrderDirection.DOWN;
      this.heroes.sort((a, b) => b[column].localeCompare(a[column]))
    }
  }

  getHeroes(): void {
    this.heroService.getHeroes().pipe(
      mergeMap(heroes =>
        forkJoin(
          heroes.map(hero =>
            this.powersService.getById(hero.power).pipe(
              map(power => ({
                ...hero,
                power: power.name
              }))
            )
          )
        )
      )
    ).subscribe(heroes => this.heroes = heroes)
  }
}
