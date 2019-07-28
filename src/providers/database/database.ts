import { Injectable } from '@angular/core';
import { User } from '../../entities/user';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {
  
  private users: AngularFireList<User>;

  constructor(private db: AngularFireDatabase) {
    this.users = this.db.list<User>('users');
  }

  public async saveNewUser(newUser: User){
    return this.users
      .push(newUser)
      .then(userCreated => {
        newUser.userId = userCreated.key;
        this.users.update(userCreated.key, newUser);
    });
  }

  public getUserByUid(uid: string): User {
    let user: User;
    let usersUpdated = this.users.valueChanges().subscribe( userList => {
      user = userList.filter(usr => usr.uid == uid)[0];
    });
    usersUpdated.unsubscribe();
    console.log("userByUid: " + uid);
    console.log(user);
    return user;
  }
}
