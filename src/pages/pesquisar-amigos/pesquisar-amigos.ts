import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Observable} from 'rxjs';
import { User } from '../../entities/user';
import { DatabaseProvider } from '../../providers/database/database';
import { Contact, Contacts, ContactFindOptions, ContactFieldType } from "@ionic-native/contacts";
@Component({
  selector: 'page-pesquisar-amigos',
  templateUrl: 'pesquisar-amigos.html'
})
export class PesquisarAmigosPage {
  
  friendsToAdd : Observable<User[]>;
  user: User;
  myContacts: Contact[];

  constructor(
    public navCtrl: NavController, 
    private db: DatabaseProvider, 
    private auth: AuthProvider, 
    private contacts: Contacts) {}
  
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

  async addFromEmails(){
    let options = new ContactFindOptions();
    options.multiple = true;
    let fields: ContactFieldType[] = ['emails'];
    this.myContacts = await this.contacts.find(fields, options);
    this.myContacts.forEach( ct => this.db.addFriendByEmail(this.user, ct.emails[0].value));
    
  }
}
