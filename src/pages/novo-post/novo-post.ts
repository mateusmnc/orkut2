import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';
import { AuthProvider } from '../../providers/auth/auth';
import { User } from '../../entities/user';
import { Post } from '../../entities/post';
import { v4 as uuid } from 'uuid';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DatabaseProvider } from '../../providers/database/database';

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
  imageData: any;

  constructor(
    public navCtrl: NavController, 
    private auth: AuthProvider,
    private db: DatabaseProvider,
    private camera: Camera) {
    
  }
  ionViewDidLoad(){
    this.initViewData();
  }

  async initViewData() {
    try {
      this.user = await this.auth.loadCurrentUser(this.auth.getCurrentAuthUser());
      this.post = new Post();
      this.post.uuid = uuid();
      this.post.communicatorUserId = this.user.userId;
      this.post.communicatorUserName = this.user.name;
      this.post.authorUserId = this.user.userId;
      this.post.authorUserName = this.user.name;

      console.log("NOVO-POST.ts, initViewData");
    } catch (error) {
      console.log("error in initViewData");
      console.log(error);
    }
  }
  
  async publicarPost(params){
    if (!params) params = {};
    
    this.buildPost();
    try {
      await this.db.saveNewPost(this.post);
      // const itemRef = await this.db.object(`posts/${this.post.communicatorUserId}/${this.post.uuid}`);
      // await itemRef.set(this.post);
      if(this.post.imgPath != '' && this.post.imgPath != undefined){ 
        await this.db.saveImage(this.post, this.imageData);
        this.goToTimelinePage(params);
        return;
      }
      this.goToTimelinePage(params);
      
    } catch (error) {
      console.log("Nao foi possivel publicar o post");
      console.log(error);
    }    
  }

  private buildPost() {
    this.post.text = this.postText;
    this.post.visibility = this.postStatus;
    this.post.timestamp = Date.now();
    if(this.imgSrc != ''){ 
      this.post.imgPath = 'images/posts/' + this.post.authorUserId + '/' + this.post.uuid + '.jpg';
    }
    console.log(this.post);
  }

  goToTimelinePage(params){
    if (!params) params = {};
    this.navCtrl.setRoot(TabsControllerPage)
    .catch(error => console.log(error));
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

  async addPicture(sourceTypeValue: number){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: sourceTypeValue
    };

    this.imageData = await this.camera.getPicture(options);
    this.imgSrc = 'data:image/jpeg;base64,' + this.imageData; 
  }
  
}
