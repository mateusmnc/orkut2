import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TimelinePage } from '../timeline/timeline';
import { BemVindoAoOrkut2Page } from '../bem-vindo-ao-orkut2/bem-vindo-ao-orkut2';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController) {
  }
  goToTimeline(params){
    if (!params) params = {};
    this.navCtrl.push(TimelinePage);
  }
  
  goToBemVindoAoOrkut2(params){
    if (!params) params = {};
    this.navCtrl.push(BemVindoAoOrkut2Page);
  }
}
