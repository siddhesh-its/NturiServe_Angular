// meal-list.component.ts
import { Component, OnInit } from '@angular/core';
import { MealService } from '../../services/meals.service';

import {
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

export interface NutritionalValues {
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
}

export interface Meal {
  nutritionalValues: NutritionalValues;
  _id: string;
  name: string;
  description: string;
  category: string;
  ingredients: string[];
  imageUrl: string;
}

@Component({
  selector: 'app-meals',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.css'],
})
export class MealsComponent implements OnInit {
  meals: Meal[] = [];
  filteredMeals: Meal[] = [];
  searchTerm: string = '';

  constructor(private mealService: MealService) {}

  ngOnInit(): void {
    this.fetchMeals();
  }

  fetchMeals(): void {
    this.mealService.getMeals().subscribe((meals: Meal[]) => {
      this.meals = meals;
      this.filteredMeals = [...this.meals];
    });
  }

  filterMeals(): void {
    this.filteredMeals = this.meals.filter((meal) =>
      meal.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
