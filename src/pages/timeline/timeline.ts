import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NovoPostPage } from '../novo-post/novo-post';

@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html'
})
export class TimelinePage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController) {
  }
  
  goToNovoPostPage(params){
    if (!params) params = {};
    this.navCtrl.push(NovoPostPage);
  }
}
