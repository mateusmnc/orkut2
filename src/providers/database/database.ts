import { Injectable } from '@angular/core';
import { User } from '../../entities/user';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import 'rxjs/add/operator/first';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {
  
  private users: AngularFireList<User>;
  private friends: AngularFireList<string>;
  friendsSubscription: any;

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

  async getUserByUid(uid: string) {
    try {
      let userList = await this.users.valueChanges().first().toPromise();
      return userList.filter(usr => usr.uid == uid)[0];  
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  public getUserByUserId(userId: string): Observable<User> {
    return this.users.valueChanges()
      .pipe(
        map(us => us.filter(u => u.userId === userId)[0]),
        take(1));
  }

  public getFriendsUserIds(user: User): Observable<string[]> {
    this.friends = this.db.list('friends/' + user.userId);
    return this.friends.valueChanges().pipe();
  }

  public getFriendsByUserIds(friends: string[]): Observable<User[]>{
    return this.users.valueChanges().pipe(
      map(users => {
        return users.filter( usr => friends.includes(usr.userId))
      })
    );
  }

  public getUserToBeFriend(friends: string[]): Observable<User[]>{
    return this.users.valueChanges().pipe(
      map(users => {
        console.log("response");
        console.log(users);
        console.log(friends);
          return users.filter(user => {
            if(!(user.userId in friends)){
              return user;
            }
          });
      })
    );
  }

  public addFriend(user: User, friendUserId: string){
    if(this.friends == null){
      this.friends = this.db.list('friends/' + user.userId);
    }
    this.friends.set(friendUserId, friendUserId);
  }
  
  public removeFriend(user: User, friendUserId: string){
    if(this.friends == null){
      this.friends = this.db.list('friends/' + user.userId);
    }
    this.friends.remove(friendUserId);
  }
}
