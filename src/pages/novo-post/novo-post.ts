import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TimelinePage } from '../timeline/timeline';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';

@Component({
  selector: 'page-novo-post',
  templateUrl: 'novo-post.html'
})
export class NovoPostPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page

  private postText: string;
  constructor(public navCtrl: NavController) {
  }
  
  publicarPost(params){
    if (!params) params = {};
    console.log(this.postText);
    this.goToTimelinePage(params);
  }

  goToTimelinePage(params){
    if (!params) params = {};
    this.navCtrl.setRoot(TabsControllerPage);
  }
}
