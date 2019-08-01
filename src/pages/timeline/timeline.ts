import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NovoPostPage } from '../novo-post/novo-post';
import { Post } from '../../entities/post';
import { Observable, Subscription} from 'rxjs';
import { AuthProvider } from '../../providers/auth/auth';
import { User } from '../../entities/user';
import { DatabaseProvider } from '../../providers/database/database';

@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html'
})
export class TimelinePage {
  postSubscription: Subscription;
  posts: Observable<Post[]>;
  postRef: Observable<any[]>;
  friendsRef: Observable<any[]>;
  friendSubscription: Subscription;
  myfriends: Observable<User[]>;
  user: User;
  
  constructor(
    public navCtrl: NavController, 
    private db: DatabaseProvider, 
    private auth: AuthProvider) {
    
  }
  
  ionViewDidLoad(){
    this.initViewData();
  }
  
  async initViewData() {
    this.user = await this.auth.loadCurrentUser(this.auth.getCurrentAuthUser());
    this.db.getFriendsUserIds(this.user).subscribe(friends => {
      this.db.getFriendsByUserIds(friends).subscribe(friendsUsers =>{
        this.posts = this.db.getPosts(friendsUsers);
      });
    });    
  }

  share(authorUserId, postUuid){
    this.db.resharePost(this.user, authorUserId, postUuid);
  }

  goToNovoPostPage(params){
    if (!params) params = {};
    this.navCtrl.push(NovoPostPage);
  }
}
