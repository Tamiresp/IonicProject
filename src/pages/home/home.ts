import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  public tasks = [];
 
  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidEnter(): void {
    const { description } = this.navCtrl.getByIndex(0).data;
    const { index } = this.navCtrl.getByIndex(0).data;
    const {qtdEdit} = this.navCtrl.getByIndex(0).data;

    if (description && index === undefined) {
      const item = {
        description: description,
        done: false,
        qtd: 0
      };

      this.tasks.push(item);
    } else if (index !== undefined) {
      this.tasks[index].description = description;
    }
  }

  private deleteTask(index: number): void {
    this.tasks.splice(index, 1);
  }

  editTask(description: string, index: number, qtdEdit: number): void {
    const task = {
      description: description,
      index: index,
      qtdEdit: qtdEdit++
    };

    this.navCtrl.push('ListPage', task);
    
   
  }
}
