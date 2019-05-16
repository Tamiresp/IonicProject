import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Item } from '../../models/item.model';
import { AngularFireAuth } from 'angularfire2/auth'

@IonicPage()

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [AngularFireAuth]
})

export class HomePage {
  public items: Item[] = [];
  searchTerm: any = "";
  public qtd;

  constructor(private toast: ToastController, private afAuth: AngularFireAuth, public alert: AlertController, public menu: MenuController, public navCtrl: NavController, public navParams: NavParams, public storage: Storage) { }

  ionViewDidLoad(error: any): void {
    this.storage.forEach((value: any, key: string) => {
      this.items.push(value);
    })
      .catch(error);
    this.setFilteredItems();
  }

  logout() {
    this.afAuth.auth.signOut();
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
    if (item.done != false) {
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
  filterList(item: Item) {
    if (item.done == false) {
      this.saveTask(item);
    }
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

  ionViewWillLoad() {
    this.afAuth.authState.subscribe(data => {
      if (data && data.email && data.uid) {
        this.toast.create({
          message: 'Bem Vindo, ${data.email}',
          duration: 3000
        }).present();
      } else {
        this.toast.create({
          message: 'Não foi possível encontar usuário',
          duration: 3000
        }).present();
      }
    });
  }

}


