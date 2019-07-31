import { Injectable } from '@angular/core';
import { User } from '../../entities/user';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import 'rxjs/add/operator/first';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Post } from '../../entities/post';

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

  constructor(private db: AngularFireDatabase, private storageRef: AngularFireStorage) {
    this.users = this.db.list<User>('users');
  }

  public async saveNewUser(newUser: User){
    let imageData = newUser.pic;
    newUser.pic = '';
    return this.users
      .push(newUser)
      .then(userCreated => {
        console.log("user foi criado   " + userCreated.key);
        newUser.userId = userCreated.key;

        this.storageRef
          .ref(`images/${newUser.userId}/profile.jpg`)
          .putString(imageData, "base64", {contentType: "image/jpg"});

          newUser.pic = `images/${newUser.userId}/profile.jpg`;
          return this.users.update(userCreated.key, newUser);
    });
  }

  async saveNewPost(post: Post) {
    const postRef = await this.db.object(`posts/${post.communicatorUserId}/${post.uuid}`);
    await postRef.set(post);
  }

  async saveImage(post: Post, imageData: any) {
    this.storageRef.ref(post.imgPath).putString(imageData, "base64", {contentType: "image/jpg"});
  }

  async getProfilePic(user: User) {
    console.log("text " + user.pic);
    const imgRef = this.storageRef.storage.ref(user.pic);
    return await imgRef.getDownloadURL();
  }

  getUserByUid(uid: string) {
    return this.users.valueChanges()
      .pipe(
        map(us => us.filter(u => u.uid === uid)[0]),
        take(1))
      .toPromise();
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
      }),
      map( users =>{
        return users.map(usr => {
          if(usr.pic != ''){
            this.getProfilePic(usr).then( imageURl =>{
              usr.picData = imageURl;
            }) 
          }
          return usr;
        });
      })
    );
  }

  public getUserToBeFriend(friends: string[]): Observable<User[]>{
    return this.users.valueChanges().pipe(
      map(users => {
          return users.filter(user => !(friends.includes(user.userId))
            // if(!(user.userId in friends)){
            //   return user;
            // }
          // }
          );
      }),
      map( users =>{
        return users.map(usr => {
          if(usr.pic != ''){
            this.getProfilePic(usr).then( imageURl =>{
              usr.picData = imageURl;
            }) 
          }
          return usr;
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
