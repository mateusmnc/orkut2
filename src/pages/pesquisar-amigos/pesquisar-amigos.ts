import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Observable, of} from 'rxjs';
import { User } from '../../entities/user';
import { DatabaseProvider } from '../../providers/database/database';

@Component({
  selector: 'page-pesquisar-amigos',
  templateUrl: 'pesquisar-amigos.html'
})
export class PesquisarAmigosPage {
  
  friendsToAdd : Observable<User[]>;

  constructor(
    public navCtrl: NavController, 
    private db: DatabaseProvider, 
    private auth: AuthProvider) {}
  
  ionViewDidLoad(){
    this.initViewData();
  }

  async initViewData() {
    this.db.getFriendsUserIds(await this.auth.getCurrentUser()).subscribe(friends => {
      this.db.getUserToBeFriend(friends).subscribe(users => {
        this.friendsToAdd = of(users.filter(user => !(friends.includes(user.userId))));
      });
    });
  }

  async addPerson($event){
    this.db.addFriend(await this.auth.getCurrentUser(), $event);
    // this.db.list(`friends/` + (await this.auth.getCurrentUser()).userId).push({id : $event})
    console.log("adicionado " + $event);
  }
}
