import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { USERS } from '../../mockdata/mock-users';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthProvider } from '../../providers/auth/auth';
import { Observable, of } from 'rxjs';
import { User } from '../../entities/user';

@Component({
  selector: 'page-pesquisar-amigos',
  templateUrl: 'pesquisar-amigos.html'
})
export class PesquisarAmigosPage {
  
  friends : Observable<any[]>;
  friendsToAdd : Observable<User[]>;

  constructor(
    public navCtrl: NavController, 
    private db: AngularFireDatabase, 
    private auth: AuthProvider) {

    this.friends = this.db.list('friends/' + this.auth.getCurrentUser().id).valueChanges(); 
    this.friends.subscribe(
      friendsList => {
          console.log("friends"); 
          console.log(friendsList);
          console.log("friends[0]" + friendsList[0]);
          // this.friendsToAdd = USERS;
          let idList: number[] = new Array();
          friendsList.forEach(friend => {
            idList.push(friend.id);
            console.log(friend.id);
          })
          console.log(USERS.filter(fta => !idList.includes(fta.id)));
          this.friendsToAdd = of(USERS.filter(fta => !idList.includes(fta.id)));
      });
  }

  addPerson($event){
    this.db.list(`friends/` + this.auth.getCurrentUser().id).push({id : $event})
    console.log("adicionado " + $event);
  }
}
