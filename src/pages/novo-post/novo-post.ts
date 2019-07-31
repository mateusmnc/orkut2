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
  public user: User;
  public postStatusText: string = "compartilhável";
  private postStatus: boolean = true;
  private post: Post;
  constructor(
    public navCtrl: NavController, 
    private auth: AuthProvider,
    private db: AngularFireDatabase) {
    
  }
  ionViewDidLoad(){
    this.initViewData();
  }

  async initViewData() {
    try {
      this.user = await this.auth.loadCurrentUser(this.auth.getCurrentAuthUser());
      this.post = new Post();
      this.post.uuid = uuid();
      // this.post.communicatorUserId = this.user.userIdid;
      this.post.communicatorUserName = this.user.name;
      // this.post.authorUserId = this.user.userId;
      this.post.authorUserName = this.user.name;

      console.log("NOVO-POST.ts, initViewData");
      console.log(this.user.name);
      console.log(this.post.uuid); 
    } catch (error) {
      
    }
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
