import { Component } from '@angular/core';
import { Location, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Hero } from '../heroes/hero';
import { HeroService } from '../heroes/hero.service';
import { PowersService } from '../heroes/powers.service';
import { Power } from '../heroes/power';

@Component({
  selector: 'app-hero-details',
  standalone: true,
  imports: [
    FormsModule,
    NgFor,
    NgIf,
    ReactiveFormsModule,
    UpperCasePipe
  ],
  templateUrl: './hero-details.component.html',
  styleUrl: './hero-details.component.css'
})
export class HeroDetailsComponent {
  hero?: Hero<number>;
  powers: Power[] = [];

  heroForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)
    ]),
    alias: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)
    ]),
    power: new FormControl(-1, Validators.required),
  });

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private powerService: PowersService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getHero();

    this.getPowers();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.heroService.getHero(id)
      .subscribe(hero => {
        this.hero = hero;
        this.heroForm.patchValue(hero);
      });
  }

  getPowers(): void {
    this.powerService.getAll().subscribe(powers => this.powers = powers);
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit(): void {
    if (this.heroForm.valid && !this.heroForm.pristine) {
      const hero = {
        id: this.hero?.id,
        ...this.heroForm.value
      } as Hero<number>;

      this.heroService.updateHero(hero)
        .subscribe(() => this.goBack());
    }
  }
}
