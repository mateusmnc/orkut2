import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import {Md5} from 'ts-md5/dist/md5';
import { FactOrFakeRequest } from '../../entities/factOrFakeRequest';
import { DatabaseProvider } from '../../providers/database/database';
import { v4 as uuid } from 'uuid';


/**
 * Generated class for the FactCheckerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-fact-checker',
  templateUrl: 'fact-checker.html',
})
export class FactCheckerPage {
  private textToCheck: string;
  public imgSrc: string ='../../assets/img/add-image.png';
  public toggleNewVerify: boolean = true;
  public answerColor: string = "warning";
  public answer: string = "Em avaliação";

  imageData: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private camera: Camera, 
    public file:File, 
    private db: DatabaseProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FactCheckerPage');
  }

  newFactChecking(){
    this.toggleNewVerify = !this.toggleNewVerify;
    this.answerColor = "warning";
    this.answer = "Em Avaliação"
    this.textToCheck = "";
  }

  async send(imageToCheckElement){
    console.log("--------SEND clicked----------");
    
    let ffRequest = new FactOrFakeRequest();
    ffRequest.uuid = uuid();
    
    if(this.textToCheck){
      let hashedText = Md5.hashStr(this.textToCheck);
      ffRequest.textHex = hashedText.toString();
      // ffRequest.text = this.textToCheck;
      console.log(hashedText);
    }

    if(imageToCheckElement.src){
      console.log("imageTocheckSrc");
      console.log(imageToCheckElement.src);
      let hashedBlob = Md5.hashStr(imageToCheckElement.src);
      ffRequest.imgHex = hashedBlob.toString();
      // ffRequest.image = imageToCheckElement.src; 
      console.log(hashedBlob);
    }

    try {
      let factOrFake = await this.db.factOrFakeAlreadyExists(ffRequest);
      if(!factOrFake){
        ffRequest.status = "Em Avaliação";
        this.displayResponse(ffRequest.status);
        this.db.sendFactOrFakeRequest(ffRequest);
      } else {
        console.log("reached else");
        console.log(factOrFake.status);
        this.displayResponse(factOrFake.status);
      }
    } catch (error) {
      console.log("factOrFake - try");
      console.log(error);
    }

    this.toggleNewVerify = !this.toggleNewVerify;
  }

  displayResponse(response : string){
    this.answer = response;
    this.answerColor = this.defineAnswerColor(response);
  }

  public defineAnswerColor(response : string):string {
    if(response === "Em Avaliação"){
      return "warning";
    }

    if(response === "É Fato"){
      return "success";
    }
    if(response === "É Fake"){
      return "danger";
    }
  }

  async addPicture(sourceTypeValue: number, imageToCheckElement){

    const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        // destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
        sourceType: sourceTypeValue
      };
      
      this.imageData = await this.camera.getPicture(options);
      // let filename = this.imageData.substring(this.imageData.lastIndexOf('/')+1).split('?')[0];
      // let path =  this.imageData.substring(0,this.imageData.lastIndexOf('/')+1);
      // this.file.readAsDataURL(path, filename).then(res=> this.imgSrc = res  );

      this.imgSrc = 'data:image/jpeg;base64,' + this.imageData;

      // this.imgSrc = this.imageData;
      // this.imgSrc = (<any>window).Ionic.WebView.convertFileSrc(this.imageData);
      // console.log(this.imgSrc);
  }

}
