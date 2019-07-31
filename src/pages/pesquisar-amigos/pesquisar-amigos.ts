import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Observable} from 'rxjs';
import { User } from '../../entities/user';
import { DatabaseProvider } from '../../providers/database/database';

@Component({
  selector: 'page-pesquisar-amigos',
  templateUrl: 'pesquisar-amigos.html'
})
export class PesquisarAmigosPage {
  
  friendsToAdd : Observable<User[]>;
  user: User;

  constructor(
    public navCtrl: NavController, 
    private db: DatabaseProvider, 
    private auth: AuthProvider) {}
  
  ionViewDidLoad(){
    this.initViewData();
  }

  async initViewData() {
    this.user = await this.auth.loadCurrentUser(this.auth.getCurrentAuthUser());
    this.db.getFriendsUserIds(this.user).subscribe(friends => {
      this.friendsToAdd = this.db.getUserToBeFriend(friends);
    });
  }

  async addPerson($event){
    this.db.addFriend(this.user, $event);
    console.log("adicionado " + $event);
  }
}
