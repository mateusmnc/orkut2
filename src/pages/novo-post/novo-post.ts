import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TimelinePage } from '../timeline/timeline';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';
import { AuthProvider } from '../../providers/auth/auth';
import { USERS } from '../../mockdata/mock-users';
import { User } from '../../entities/user';
import { Post } from '../../entities/post';
import { v4 as uuid } from 'uuid';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'page-novo-post',
  templateUrl: 'novo-post.html'
})
export class NovoPostPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page

  private postText: string;
  private imgSrc: string ='';
  private user: User;
  private postStatusText: string = "compartilhável";
  private postStatus: boolean = true;
  private post: Post;
  constructor(
    public navCtrl: NavController, 
    private auth: AuthProvider,
    private db: AngularFireDatabase) {
    // this.user = this.auth.getCurrentUser();
    this.user = USERS[3];
    
    this.post = new Post();
    this.post.uuid = uuid();
    this.post.communicatorUserId = this.user.id;
    this.post.authorUserId = this.user.id;
  }
  
  publicarPost(params){
    if (!params) params = {};
    
    this.post.text = this.postText;
    this.post.img = this.imgSrc;
    this.post.visibility = this.postStatus;
    console.log(this.post);
    // const itemRef = this.db.object(`posts/${this.post.communicatorUserId}/${this.post.uuid}`);
    const itemRef = this.db.list(`posts/${this.post.communicatorUserId}/`);
    itemRef.push(this.post);
    this.goToTimelinePage(params);

  }

  goToTimelinePage(params){
    if (!params) params = {};
    this.navCtrl.setRoot(TabsControllerPage);
  }

  getProfilePic(){
    return this.user.pic;
  }

  getName(){
    return this.user.nome;
  }
  onChange($event){
    this.imgSrc = $event;
  }

  changeStatus($event){
    this.postStatus = $event.checked;
    if(this.postStatus == false){
      this.postStatusText = "privado";
    } 
    else {
      this.postStatusText = "compartilhável";
    }
  }

  
}
