import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TimelinePage } from '../timeline/timeline';
import { AmigosPage } from '../amigos/amigos';
import { FactCheckerPage } from '../fact-checker/fact-checker';

@Component({
  selector: 'page-tabs-controller',
  templateUrl: 'tabs-controller.html'
})
export class TabsControllerPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = FactCheckerPage;
  tab2Root: any = TimelinePage;
  tab3Root: any = AmigosPage;
  constructor(public navCtrl: NavController) {
  }
  
}
