import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PesquisarAmigosPage } from '../pesquisar-amigos/pesquisar-amigos';
import { AuthProvider } from '../../providers/auth/auth';
import { Observable } from 'rxjs';
import { User } from '../../entities/user';
import { DatabaseProvider } from '../../providers/database/database';

@Component({
  selector: 'page-amigos',
  templateUrl: 'amigos.html'
})
export class AmigosPage {
  
  friendsToDisplay : Observable<User[]>;
  user: User;
  constructor(public navCtrl: NavController, private db: DatabaseProvider, private auth:AuthProvider) {}
  
  ionViewDidLoad(){
    this.initViewData();
  }

  async initViewData() {
    this.user = await this.auth.loadCurrentUser(this.auth.getCurrentAuthUser());
    this.db.getUserByUserId(this.user.userId);
    this.db.getFriendsUserIds(this.user).subscribe(friends => {
      this.friendsToDisplay = this.db.getFriendsByUserIds(friends);
    });    
  }

  goToPesquisarAmigosPage(params){
    if (!params) params = {};
    this.navCtrl.push(PesquisarAmigosPage);
  }

  async removeFriend($event){
    console.log("removeu " + $event);
    this.db.removeFriend(this.user, $event);
  }
}
