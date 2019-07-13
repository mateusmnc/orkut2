import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PesquisarAmigosPage } from '../pesquisar-amigos/pesquisar-amigos';

@Component({
  selector: 'page-amigos',
  templateUrl: 'amigos.html'
})
export class AmigosPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController) {
  }
  
  goToPesquisarAmigosPage(params){
    if (!params) params = {};
    this.navCtrl.push(PesquisarAmigosPage);
  }
}
