import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { USERS } from '../../mockdata/mock-users';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthProvider } from '../../providers/auth/auth';
import { Observable } from 'rxjs';
import { User } from '../../entities/user';

@Component({
  selector: 'page-pesquisar-amigos',
  templateUrl: 'pesquisar-amigos.html'
})
export class PesquisarAmigosPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  friends : Observable<any[]>;
  friendsToAdd : User[];
  constructor(
    public navCtrl: NavController, 
    private db: AngularFireDatabase, 
    private auth: AuthProvider) {
    this.friends = this.db.list('friends/' + this.auth.getCurrentUser().id).valueChanges(); 
    this.friends.subscribe(
      friends => {
        if(friends.length == 0){
          this.friendsToAdd = USERS;
        }
        console.log(friends); console.log(friends)
      },
      error => {this.friendsToAdd = USERS; console.log("error");});
  }

  addPerson($event){
    console.log("adicionado " + $event);
  }
}
