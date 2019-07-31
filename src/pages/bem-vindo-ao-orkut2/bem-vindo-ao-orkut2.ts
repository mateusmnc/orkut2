import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { User } from '../../entities/user';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-bem-vindo-ao-orkut2',
  templateUrl: 'bem-vindo-ao-orkut2.html'
})
export class BemVindoAoOrkut2Page {
  
  public signUpForm: FormGroup;
  public imagesrc: string = '../../assets/img/camera.png';

  private readonly options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true
  }
  imageData: any;

  constructor(
    public navCtrl: NavController,
    private auth: AuthProvider,
    private formBuilder: FormBuilder,
    private camera: Camera) {

    this.signUpForm = this.formBuilder.group({
      name:['', Validators.compose([Validators.required])],
      email:['', Validators.compose([Validators.required, Validators.email])],
      password:['', Validators.compose([Validators.required])]
    });
  }
  
  criarConta(){
    if(!this.signUpForm.valid && this.imagesrc != '../../assets/img/camera.png'){
      return;
    }
    let newUser:User = this.createUserFromForm(this.signUpForm.value, this.imageData);
    
    this.auth.signUp(newUser).then( res => {
      if(res === true){
        console.log("res == true");
        this.goToLoginPage();
      }
    });
  }

  createUserFromForm(newUserForm, imageData): User {
    let newUser:User = new User();
    newUser.name = newUserForm.name;
    newUser.email = newUserForm.email;
    newUser.pwd = newUserForm.password;
    newUser.pic = imageData;
    return newUser;
  }

  goToLoginPage(){
    this.navCtrl.setRoot(LoginPage);
  }

  async takeProfilePicture(){
      this.imageData = await this.camera.getPicture(this.options);
      this.imagesrc = 'data:image/jpeg;base64,' + this.imageData;
  }
}
