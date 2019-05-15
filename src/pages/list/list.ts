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
  public description: string;
  public index: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.description = this.navParams.get('description');
    this.index = this.navParams.get('index');

  }

  ionViewDidLoad() {
    this.navCtrl.getPrevious().data = {};
  }

  addTask(): void {

    const homePage = this.navCtrl.getPrevious();
    homePage.data.description = this.description;
    homePage.data.index = this.index;

    this.navCtrl.pop();
   
  }
}
