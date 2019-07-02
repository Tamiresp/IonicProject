import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
import { Item } from '../../models/item.model';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the TerminatedTasksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-terminated-tasks',
  templateUrl: 'terminated-tasks.html',
})
export class TerminatedTasksPage {
  public items: Item[] = [];
  searchTerm: any = "";
  public qtd;
 
  constructor(public alert: AlertController, public menu: MenuController, public navCtrl: NavController, public navParams: NavParams, public storage: Storage) { }
 
  ionViewDidLoad(error: any): void {
    this.storage.forEach((value: any, key: string) => {
      this.items.push(value);
    })
      .catch(error);
   
  }
 
  listItems(item: Item) {
    if (item.done != false) {
      this.saveTask(item);
    }
    console.log(item);
  }
 
  ionViewDidEnter(): void {
    const { description } = this.navCtrl.getByIndex(0).data;
    const { index } = this.navCtrl.getByIndex(0).data;
 
    if (description && index === undefined) {
      const item: Item = {
        description: description,
        done: false,
        id: Math.random().toString().split('.')[1]
      };
      this.items.push(item);
      this.saveTask(item);
    } else if (index !== undefined) {
      this.items[index].description = description;
      this.saveTask(this.items[index]);
    }
 
  }
  markAsDone(task: Item): void {
    task.done = !task.done;
   // this.saveTask(task);
  }

  saveTask(item: Item) {
    this.storage.set(item.id, item)
      .then(() => {
        console.log("salvo");
        this.qtd++; ///fazer depois
      })
      .catch();
  }
 
  private deleteTask(index: number): void {
    this.storage.remove(this.items[index].id)
      .then(() => {
        this.items.splice(index, 1);
        console.log("deletado");
      })
      .catch();
 
  }
  presentConfirm(index: number) {
    let alert = this.alert.create({
      title: 'Confirm delete',
      message: 'Do you want delete this task?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.storage.remove(this.items[index].id)
            .then(() => {
              this.items.splice(index, 1);
              console.log("deletado");
            })
            .catch();
          }
        }
      ]
    });
    alert.present();
  }
 
  editTask(description: string, index: number): void {
    this.navCtrl.push('ListPage', { description: description, index: index });
  }

}
