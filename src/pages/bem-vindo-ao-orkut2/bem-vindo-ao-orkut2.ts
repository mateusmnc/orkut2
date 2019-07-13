import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-bem-vindo-ao-orkut2',
  templateUrl: 'bem-vindo-ao-orkut2.html'
})
export class BemVindoAoOrkut2Page {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController) {
  }
  
  goToLoginPage(params){
    if (!params) params = {};
    this.navCtrl.setRoot(LoginPage);
  }
}
