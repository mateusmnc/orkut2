import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';
import { AuthProvider } from '../../providers/auth/auth';
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
  public postStatusText: string = "compartilhável";
  private postStatus: boolean = true;
  private post: Post;
  constructor(
    public navCtrl: NavController, 
    private auth: AuthProvider,
    private db: AngularFireDatabase) {
    this.user = this.auth.getCurrentUser();
    
    this.post = new Post();
    this.post.uuid = uuid();
    this.post.communicatorUserId = this.user.id;
    this.post.communicatorUserName = this.user.nome;
    this.post.authorUserId = this.user.id;
    this.post.authorUserName = this.user.nome;
  }
  
  publicarPost(params){
    if (!params) params = {};
    
    this.buildPost();
    
    const itemRef = this.db.object(`posts/${this.post.communicatorUserId}/${this.post.uuid}`);
    itemRef.set(this.post);
    this.goToTimelinePage(params);

  }

  private buildPost() {
    this.post.text = this.postText;
    this.post.img = this.imgSrc;
    this.post.visibility = this.postStatus;
    this.post.timestamp = Date.now();
    console.log(this.post);
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
