import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { NovoPostPage } from '../novo-post/novo-post';
import { Post } from '../../entities/post';
import { Observable} from 'rxjs';
import { AuthProvider } from '../../providers/auth/auth';
import { User } from '../../entities/user';
import { DatabaseProvider } from '../../providers/database/database';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html'
})
export class TimelinePage {
  posts: Observable<Post[]>;
  user: User;
  
  constructor(
    public navCtrl: NavController, 
    private db: DatabaseProvider, 
    private auth: AuthProvider,
    private app: App) {
    
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

  logout(){
    this.auth.logout().then( _ => {
        this.app.getRootNav().setRoot(LoginPage);
    });
  }
}
