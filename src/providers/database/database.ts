import { Injectable } from '@angular/core';
import { User } from '../../entities/user';
import { AngularFireDatabase } from '@angular/fire/database';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {
  
  users = this.db.list<User>('users');

  constructor(private db: AngularFireDatabase) {
  }

  public async saveNewUser(newUser: User){
    return this.users
      .push(newUser)
      .then(userCreated => {
        newUser.userId = userCreated.key;
        this.users.update(userCreated.key, newUser);
    });
  }
}
