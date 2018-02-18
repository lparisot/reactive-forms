import { Component, OnInit } from '@angular/core';

import { HeroService } from '../../../services/hero.service';
import { Hero } from '../../../data-model';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;
  isLoading = false;

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  getHeroes(): void {
    this.isLoading = true;
    this.selectedHero = undefined;
    this.heroService
      .getHeroes()
      .subscribe(heroes => { this.heroes = heroes; this.isLoading = false; console.log('end'); });
  }
}
