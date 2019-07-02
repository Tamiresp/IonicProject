import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController, ToastController, LoadingController } from 'ionic-angular';
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
  public qtd;
  public searchTerm: string = '';
  public mark: string = '';
  public loading: any;
  constructor(private toast: ToastController, private afAuth: AngularFireAuth,
    public alert: AlertController, public menu: MenuController, public navCtrl: NavController,
    public navParams: NavParams, public storage: Storage, public loadingController: LoadingController) { }

  ionViewDidLoad(error: any): void {
    this.loading = this.loadingController.create({ content: "Logging in ,please wait..." });
    this.loading.present();
    this.storage.forEach((value: any, key: string) => {
      this.loading.dismissAll();
      this.items.push(value);
      
    })
      .catch(error);
      
  }

  logout() {
    this.afAuth.auth.signOut()
      .then(() => {
        this.exibirToast('Você saiu');
      })
      .catch((erro: any) => {
        this.exibirToast(erro);
      });
  }
  private exibirToast(mensagem: string): void {
    let toast = this.toast.create({
      duration: 3000,
      position: 'botton'
    });
    toast.setMessage(mensagem);
    toast.present();
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
    this.qtd++;
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
  

}


