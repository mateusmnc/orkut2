import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PesquisarAmigosPage } from '../pesquisar-amigos/pesquisar-amigos';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthProvider } from '../../providers/auth/auth';
import { Observable, of, Subscription } from 'rxjs';
import { User } from '../../entities/user';
import { USERS } from '../../mockdata/mock-users';
import { _keyValueDiffersFactory } from '@angular/core/src/application_module';

@Component({
  selector: 'page-amigos',
  templateUrl: 'amigos.html'
})
export class AmigosPage {
  
  private friends : Observable<any[]>;
  friendsToDisplay : Observable<User[]>;
  private idList: number[] = new Array();
  private subscription: Subscription;
  constructor(public navCtrl: NavController, private db:AngularFireDatabase, private auth:AuthProvider) {
    this.friends = this.db.list('friends/' + this.auth.getCurrentUser().id).valueChanges(); 
    this.subscription = this.friends.subscribe(this.buildAmigosList());
  }
  
  private buildAmigosList(): (value: any[]) => void {
    return friendsList => {
      friendsList.forEach(friend => {this.idList.push(friend.id);});
      this.friendsToDisplay = of(USERS.filter(ftd => this.idList.includes(ftd.id)));
    };
  }

  goToPesquisarAmigosPage(params){
    if (!params) params = {};
    this.navCtrl.push(PesquisarAmigosPage);
  }

  removeFriend($event){
    console.log("removeu " + $event);
    console.log("antes do filtro " + this.idList);
    this.idList = this.idList.filter( i => i != $event);
    console.log("antes do filtro " + this.idList);
    this.subscription.unsubscribe();
    
    this.db.list('friends/' + this.auth.getCurrentUser().id).remove().then( resolve => {
      this.idList.forEach( idAmigo => {
        this.db.list('friends/' + this.auth.getCurrentUser().id).push({id: idAmigo});
      });
    });

    this.subscription = this.friends.subscribe(this.buildAmigosList());
    
    // t.orderByValue().equalTo('test1')
    // this.db.database.ref('friends/' + this.auth.getCurrentUser().id)
    // .orderByValue()
    // .equalTo($event)
    // .ref.remove();
    // this.db.object('friends/' + this.auth.getCurrentUser().id)
  }
}
