import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from "angularfire2/auth"

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [AngularFireAuth]
})
export class RegisterPage {
  user = {} as User;
  loading: any;
  constructor(private toast: ToastController, private afAuth: AngularFireAuth, private loadingController: LoadingController,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  async register(user: User) {
    this.loading = this.loadingController.create({ content: "Please wait..." });
    this.loading.present();
    try{
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      console.log(result);
      this.toast.create({
        message: 'Usuario cadastrado',
        duration: 3000
      }).present();
      this.loading.dismissAll();
    }catch(e){
      console.error(e);
      this.loading.dismissAll();
    }
    
  }

}
