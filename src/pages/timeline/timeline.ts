import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NovoPostPage } from '../novo-post/novo-post';
import { AngularFireDatabase } from '@angular/fire/database';
import { Post } from '../../entities/post';
import { Observable, Subscription, of } from 'rxjs';
import { AuthProvider } from '../../providers/auth/auth';
import { USERS } from '../../mockdata/mock-users';
import { User } from '../../entities/user';

@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html'
})
export class TimelinePage {
  postSubscription: Subscription;
  postList: Observable<any[]>;
  postRef: Observable<any[]>;
  friendsRef: Observable<any[]>;
  friendSubscription: Subscription;
  myfriends: Observable<User[]>;
  
  constructor(
    public navCtrl: NavController, 
    private db: AngularFireDatabase, 
    private auth: AuthProvider) {
    
  }
  
  ionViewDidLoad(){
    this.initViewData();
  }
  
  async initViewData() {
    // this.postRef = this.db.list('/posts/').valueChanges();
    // this.friendsRef = this.db.list('friends/' + this.auth.getCurrentUser().userId).valueChanges();
    
    // this.friendSubscription = this.friendsRef.subscribe(friendObjects=> {
    //   let friends = this.loadCurrentFriends(friendObjects);

    //   this.postSubscription = this.postRef.subscribe(userPosts => {
    //     let flatPosts: Post[] = new Array<Post>();
    //     Object.keys(userPosts).map(key => userPosts[key]).forEach( postWithKey => {
    //       Object.keys(postWithKey).map(key => postWithKey[key]).forEach( post => {
    //         if(friends.filter(f => f.userId == post.communicatorUserId).length > 0) {
    //           post.user = friends[friends.findIndex(u => u.userId == post.communicatorUserId)];             
    //           flatPosts.push(post);
    //           this.postList = of(flatPosts);
    //         }
    //       });
    //     });
    //   });
    // });
  }
  private loadCurrentFriends(friends): User[] {
    let idList = new Array();
    friends.forEach(friend => idList.push(friend.id));
    return USERS.filter(ftd => idList.includes(ftd.userId));
  }

  share(authorUserId, uuid){
    // this.db
    //   .object(`/posts/${authorUserId}/${uuid}`)
    //   .valueChanges().subscribe( obj => {
    //     obj['communicatorUserId'] = this.auth.getCurrentUser().id;
    //     obj['communicatorUserName'] = this.auth.getCurrentUser().nome;
    //     this.db
    //     .object(`/posts/${this.auth.getCurrentUser().id}/${uuid}`)
    //     .set(obj);
    //   });
  }

  goToNovoPostPage(params){
    if (!params) params = {};
    this.navCtrl.push(NovoPostPage);
  }
}
