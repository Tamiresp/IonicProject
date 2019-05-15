import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Item } from '../../models/item.model';

@IonicPage()

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage {
  public items: Item[] = [];
  searchTerm: any = "";

  constructor(private menu: MenuController, public navCtrl: NavController, public navParams: NavParams, public storage: Storage) { }

  ionViewDidLoad(error: any): void {
    this.storage.forEach((value: any, key: string) => {
      this.items.push(value);     
    })
      .catch(error);
      this.setFilteredItems();
  }
  setFilteredItems() {

    this.items = this.filterItems(this.searchTerm);

  }
  filterItems(searchTerm) {
    return this.items.filter((item) => {
      return item.description.toLowerCase().includes(searchTerm.toLowerCase());
    });

  }
  listItems(item: Item) {
    if(item.done != false){
      this.saveTask(item);
    }
    console.log(item);
  }
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
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
    this.saveTask(task);
  }

  saveTask(item: Item) {
    this.storage.set(item.id, item)
      .then(() => {
        console.log("salvo");
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

  editTask(description: string, index: number): void {
    this.navCtrl.push('ListPage', { description: description, index: index });
  }

  // set(key: string, value: any): Promise<void>{
  //   return new Promise((resolve, reject) => {
  //     //promise catch
  //   });
  // }
  

}
