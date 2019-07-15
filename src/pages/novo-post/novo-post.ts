import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TimelinePage } from '../timeline/timeline';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';
import { AuthProvider } from '../../providers/auth/auth';
import { USERS } from '../../mockdata/mock-users';
import { User } from '../../entities/user';

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
  private postStatus: string = "compartilhável";

  constructor(public navCtrl: NavController, private auth: AuthProvider) {
    // this.user = this.auth.getCurrentUser();
    this.user = USERS[3];

  }
  
  publicarPost(params){
    if (!params) params = {};
    console.log(this.postText);
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
    if($event.checked == false){
      this.postStatus = "privado";
      return;
    }

    this.postStatus = "compartilhável";

  }
}
