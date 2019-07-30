import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PesquisarAmigosPage } from '../pesquisar-amigos/pesquisar-amigos';
import { AuthProvider } from '../../providers/auth/auth';
import { Observable, Subscription, of } from 'rxjs';
import { User } from '../../entities/user';
import { DatabaseProvider } from '../../providers/database/database';

@Component({
  selector: 'page-amigos',
  templateUrl: 'amigos.html'
})
export class AmigosPage {
  
  friendsToDisplay : Observable<User[]>;
  constructor(public navCtrl: NavController, private db: DatabaseProvider, private auth:AuthProvider) {}
  
  ionViewDidLoad(){
    this.initViewData();
  }

  async initViewData() {
    let user = await this.auth.getCurrentUser();
    this.db.getUserByUserId(await user.userId);
    this.db.getFriendsUserIds(await this.auth.getCurrentUser()).subscribe(friends => {
      this.friendsToDisplay = this.db.getFriendsByUserIds(friends);
    });    
  }

  goToPesquisarAmigosPage(params){
    if (!params) params = {};
    this.navCtrl.push(PesquisarAmigosPage);
  }

  async removeFriend($event){
    console.log("removeu " + $event);
    this.db.removeFriend(await this.auth.getCurrentUser(), $event);
  }
}
