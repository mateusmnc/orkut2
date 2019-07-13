import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TimelinePage } from '../timeline/timeline';

@Component({
  selector: 'page-novo-post',
  templateUrl: 'novo-post.html'
})
export class NovoPostPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController) {
  }
  
  publicarPost(params){
    if (!params) params = {};
    this.goToTimelinePage(params);
  }

  goToTimelinePage(params){
    if (!params) params = {};
    this.navCtrl.push(TimelinePage);
  }
}
