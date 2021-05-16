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
  private activeAddFood = true;
  counterCalories: number;
  foodSelector: foodNode[] = [];
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
  addFoodItemButton(id: string){
    console.log("clicked " + id);
  }
  addFood(id: string) {

    this.choosedFood.push(
      this.copyFoodVector.find((food) => {
        return food.id === id;
      })
    );
  }
  compareWith(o1: foodNode, o2: foodNode | foodNode[]) {
    if (!o1 || !o2) {
      return o1 === o2;
    }

    if (Array.isArray(o2)) {
      return o2.some((u: foodNode) =>{
       u.id === o1.id

      });
    }
return o1.id === o2.id;
  }
  optionFind(){
    console.log("click");
    console.table(this.foodSelector);
    for(let it of this.foodSelector){
      this.addFood(it.id);
    }
  }

}
