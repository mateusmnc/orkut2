import { Injectable } from '@angular/core';
import { User } from '../../entities/user';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import 'rxjs/add/operator/first';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Post } from '../../entities/post';
import * as _ from "lodash";
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
  private posts: AngularFireList<any>;

  constructor(private db: AngularFireDatabase, private storageRef: AngularFireStorage) {
    this.users = this.db.list<User>('users');
    this.posts = this.db.list<any>('posts');
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

    try{
      const postRef = await this.db.object(`posts/${post.communicatorUserId}/${post.uuid}`);
      await postRef.set(post);
    } catch(e){
      console.log("save new post error");
      console.log(e);
    }
  }

  async saveImage(post: Post, imageData: any) {
    try{
      let imgRef = await this.storageRef.ref(post.imgPath);
      await imgRef.putString(imageData, "base64", {contentType: "image/jpg"});
    } catch(e){
      console.log("save image error");
      console.log(e);
    }
  }

  async getProfilePic(user: User) {
    const imgRef = this.storageRef.storage.ref(user.pic);
    return await imgRef.getDownloadURL();
  }

  async getPostPic(post: Post) {
    console.log("post pic path: " + post.imgPath);
    const imgRef = this.storageRef.storage.ref(post.imgPath);
    return await imgRef.getDownloadURL();
  }

  getUserByUid(uid: string) {
    return this.users.valueChanges()
      .pipe(
        map(us => us.filter(u => u.uid === uid)[0]),
        take(1))
      .toPromise();
  }

  getUserByEmail(email: string) {
    return this.users.valueChanges()
      .pipe(
        map(us => us.filter(u => u.email === email)[0]),
        take(1))
      .toPromise();
  }

  public getUserByUserId(userId: string): Observable<User> {
    return this.users.valueChanges()
      .pipe(
        map(us => us.filter(u => u.userId === userId)[0]),
        take(1));
  }
  
  public getPosts(friends: User[]): Observable<Post[]> {

    let friendsIds = friends.map(user => user.userId);

    return this.posts.valueChanges().pipe(
      map(usersWithPosts => {
        return _.values(usersWithPosts);}),
      map(postIndexes => {
        let posts: Post[] = new Array();

        postIndexes.forEach(postIndex => {
          Object.keys(postIndex).forEach(index =>{
            posts.push(postIndex[index]);
          })
        });
        return posts;}),
      map(posts =>{
        return posts.filter((post: Post) => friendsIds.includes(post.communicatorUserId));}),
      map(posts =>{
        return posts.map((post: Post) =>{
          post.user = friends[friends.findIndex(f => f.userId == post.communicatorUserId)];
          return post;});
        }),
      map(posts => {
        return posts.map((post:Post) => {
          if(post.imgPath != '' && post.imgPath != undefined){ 
            this.getPostPic(post)
            .then( imageUrl =>post.img = imageUrl)
            .catch( e => {console.log("error when loading posts"); console.log(e);});
          }
          return post;
        });
      })
    );
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

  resharePost(user: User, authorUserId: string, postUuid: string) {
    this.db.object(`/posts/${authorUserId}/${postUuid}`)
      .valueChanges()
      .subscribe( (postToReshare: Post) =>{
        postToReshare.communicatorUserId = user.userId;
        postToReshare.communicatorUserName = user.name
        
        this.db.object(`/posts/${user.userId}/${postUuid}`)
          .set(postToReshare);
      });
  }

  public addFriend(user: User, friendUserId: string){
    if(this.friends == null){
      this.friends = this.db.list('friends/' + user.userId);
    }
    this.friends.set(friendUserId, friendUserId);
  }

  public addFriendByEmail(user: User, friendEmail: string){
    this.getUserByEmail(friendEmail).then( friendFound => {
      this.addFriend(user, friendFound.userId);
    })
  }
  
  public removeFriend(user: User, friendUserId: string){
    if(this.friends == null){
      this.friends = this.db.list('friends/' + user.userId);
    }
    this.friends.remove(friendUserId);
  }

}
