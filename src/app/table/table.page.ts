import { Component, OnInit } from '@angular/core';
import { foodNode } from './foodNode.model';
import { TableService } from './table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.page.html',
  styleUrls: ['./table.page.scss'],
})
export class TablePage implements OnInit {
  private copyFoodVector: foodNode[] = [];
  private choosedFood: foodNode[] = [];

  counterCalories: number;
  private counterProtein: number;
  private counterCarbohydrates: number;
  private counterFat: number;
  private counterSodium: number;
  private counterSugar: number;

  constructor(private tableservice: TableService) {}

  ngOnInit() {
    this.copyFoodVector = this.tableservice.get_allFoods();
  }
  getVectorCopy() {
    return [...this.copyFoodVector];
  }
  getChoosedFood() {
    return [...this.choosedFood];
  }
  addFood(id: string) {

    this.choosedFood.push(
      this.copyFoodVector.find((food) => {
        return food.id === id;
      })
    );
  }
}
