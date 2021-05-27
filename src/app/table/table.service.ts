import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { foodItem } from './foodItem.model';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  private var1: foodItem;

  private foodVector: foodItem[] = [];
  create_food(
    id: string,
    calories: number,
    carbohydrates: number,
    fat: number,
    protein: number,
    sodium: number,
    sugar: number
  ) {
    const hola = { id, calories, carbohydrates, fat, protein, sodium, sugar };
    return hola;
  }
  constructor(){
    this.foodVector.push(this.create_food('Banana', 89, 23, 9, 1, 1, 12));
    this.foodVector.push(this.create_food('Quaker', 73, 11, 2, 3, 0, 0));
    this.foodVector.push(this.create_food('Yogurt', 184, 15, 2, 28, 218, 15));

    this.foodVector.push(this.create_food('Pollo', 198, 0, 2, 46, 0, 0));
    this.foodVector.push(this.create_food('Arroz', 100, 22, 0, 2, 283, 0));

    this.foodVector.push(this.create_food('Egg', 72, 0, 5, 6, 71, 0));
    this.foodVector.push(this.create_food('Protein', 258, 6, 4, 48, 0, 4));
    this.foodVector.push(this.create_food('Oil', 60, 0, 7, 0, 0, 0));
  }
  get_allFoods() {
    return [...this.foodVector];
  }
  get_Food(id_food: string) {
    this.var1 = this.foodVector.find((food) => {
      return food.id === id_food;
    });
    return this.var1;
  }
}
