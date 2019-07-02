import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth'


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AngularFireAuth]
})
export class LoginPage {
  // user = {} as User;
  public user: any;
  loading: any;
  @ViewChild('usuario') email;
  @ViewChild('senha') password;

  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController, public loadingController: LoadingController,
    public afAuth: AngularFireAuth) {
    afAuth.user.subscribe((data => {
      this.user = data;
    }));
  }
  async login(user: User) {
    this.loading = this.loadingController.create({ content: "Logging in ,please wait..." });
    this.loading.present();
    try {
      const result = this.afAuth.auth.signInWithEmailAndPassword(this.email.value, this.password.value).then(() => {
        this.exibirToast('Login efetuado com sucesso ' + this.email.value);
        this.loading.dismissAll();
        this.navCtrl.setRoot('HomePage');
      })
        .catch((erro: any) => {
          this.exibirToast('Usuário não encontrado');
          this.loading.dismissAll();
        });
      console.log(result);


    } catch (e) {
      console.error(e);
    }

  }
  private exibirToast(mensagem: string): void {
    let toast = this.toastCtrl.create({
      duration: 3000,
      position: 'botton'
    });
    toast.setMessage(mensagem);
    toast.present();
  }
  register() {
    this.navCtrl.push('RegisterPage');
  }
  
}
