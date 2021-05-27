import { Component, OnInit, ViewChild} from '@angular/core';
import { IonButton, IonSelect } from '@ionic/angular';
import { foodItem } from './foodItem.model';
import { TableService } from './table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.page.html',
  styleUrls: ['./table.page.scss'],
})
export class TablePage implements OnInit {
  private copyFoodVector: foodItem[] = [];
  private choosedFood1: foodItem[] = [];
  private choosedFood2: foodItem[] = [];
  private choosedFood3: foodItem[] = [];
  private choosedFood4: foodItem[] = [];
  private activeAddFood = true;
  counterCalories: number;

  foodSelector: foodItem[] = [];
  private activemeal: string;

  private counterProtein: number;
  private counterCarbohydrates: number;
  private counterFat: number;
  private counterSodium: number;
  private counterSugar: number;

   @ViewChild('myselect') selectRef1: IonSelect;

  constructor(private tableservice: TableService) {}

  ngOnInit() {
    this.copyFoodVector = this.tableservice.get_allFoods();
  }
  getVectorCopy() {
    return [...this.copyFoodVector];
  }
  getChoosedFood1() {
    return [...this.choosedFood1];
  }
  getChoosedFood2() {
    return [...this.choosedFood2];
  }
  getChoosedFood3() {
    return [...this.choosedFood3];
  }
  getChoosedFood4() {
    return [...this.choosedFood4];
  }
  addFoodItemButton(id: string){
    console.log("clicked " + id);
  }
  addFood(id: string) {
    switch(this.activemeal){
      case"brbutton":
        this.choosedFood1.push(
          this.copyFoodVector.find((food) => {
           return food.id === id;
          })
        );
        break;
      case "lunchbutton":
        this.choosedFood2.push(
          this.copyFoodVector.find((food) => {
           return food.id === id;
          })
        );
        break;
      case "snacksbutton":
        this.choosedFood3.push(
          this.copyFoodVector.find((food) => {
           return food.id === id;
          })
        );
        break;
      case "dinnerbutton":
          this.choosedFood4.push(
            this.copyFoodVector.find((food) => {
             return food.id === id;
            })
          );
      break;

    }

  }
  compareWith(o1: foodItem, o2: foodItem | foodItem[]) {
    if (!o1 || !o2) {
      return o1 === o2;
    }

    if (Array.isArray(o2)) {
      return o2.some((u: foodItem) =>{
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

  displayOptions(event: any){
    this.activemeal = event.srcElement.id;
    console.log(this.activemeal);
    this.selectRef1.open();
  }
}
