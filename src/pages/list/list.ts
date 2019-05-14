import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  public qtdAdd = 0;
  public task: { description: string, index: number, qtdAdd: number };
  public description: string;
 
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.task = this.navParams.data.description ? this.navParams.data : {};
    this.description = this.task.description;
    this.qtdAdd = this.task.qtdAdd;
  }

  ionViewDidLoad() {
    this.navCtrl.getPrevious().data = {};
  }

  addTask(): void {

    const homePage = this.navCtrl.getPrevious();
    homePage.data.description = this.description;
    homePage.data.index = this.task.index;

    this.navCtrl.pop();
    this.qtdAdd++;
    console.log(this.qtdAdd);
  }
}
