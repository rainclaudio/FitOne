import { Component, OnInit, ViewChild} from '@angular/core';
import { IonButton, IonSelect } from '@ionic/angular';
import { foodNode } from './foodNode.model';
import { TableService } from './table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.page.html',
  styleUrls: ['./table.page.scss'],
})
export class TablePage implements OnInit {
  private copyFoodVector: foodNode[] = [];
  private choosedFood1: foodNode[] = [];
  private choosedFood2: foodNode[] = [];
  private choosedFood3: foodNode[] = [];
  private choosedFood4: foodNode[] = [];
  private activeAddFood = true;
  counterCalories: number;
  foodSelector: foodNode[] = [];
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
  getChoosedFood() {
    return [...this.choosedFood1];
  }
  addFoodItemButton(id: string){
    console.log("clicked " + id);
  }
  addFood(id: string) {

    this.choosedFood1.push(
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

  displayOptions(event: any){
    console.log(event.srcElement.id);
    this.selectRef1.open();
  }
}
