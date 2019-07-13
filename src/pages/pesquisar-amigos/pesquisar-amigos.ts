import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-pesquisar-amigos',
  templateUrl: 'pesquisar-amigos.html'
})
export class PesquisarAmigosPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController) {
  }
  
}
