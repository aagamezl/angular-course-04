import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location, NgFor } from '@angular/common';

import { HeroNew, HeroService } from '../heroes/hero.service';
import { PowersService } from '../heroes/powers.service';
import { Power } from '../heroes/power';

@Component({
  selector: 'app-hero-new',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule],
  templateUrl: './hero-new.component.html',
  styleUrl: './hero-new.component.css'
})
export class HeroNewComponent {
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
    this.getPowers();
  }

  getPowers(): void {
    this.powerService.getAll().subscribe(powers => this.powers = powers);
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit(): void {
    if (this.heroForm.valid) {
      const hero = this.heroForm.value as HeroNew;

      this.heroService.create(hero)
        .subscribe(() => this.goBack());
    }
  }
}
