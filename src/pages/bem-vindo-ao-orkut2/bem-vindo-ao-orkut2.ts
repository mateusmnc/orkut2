import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { User } from '../../entities/user';

@Component({
  selector: 'page-bem-vindo-ao-orkut2',
  templateUrl: 'bem-vindo-ao-orkut2.html'
})
export class BemVindoAoOrkut2Page {
  
  public signUpForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    private auth: AuthProvider,
    private formBuilder: FormBuilder) {

    this.signUpForm = this.formBuilder.group({
      name:['', Validators.compose([Validators.required])],
      email:['', Validators.compose([Validators.required, Validators.email])],
      password:['', Validators.compose([Validators.required])]
    });
  }
  
  criarConta(){
    if(!this.signUpForm.valid){
      return;
    }
    let newUser:User = this.createUserFromForm(this.signUpForm.value);
    
    if(!this.auth.signUp(newUser)){
      return;
    }

    this.goToLoginPage();
  }

  createUserFromForm(newUser): User {
    return new User(null, newUser.name, newUser.email, newUser.password, null);
  }

  goToLoginPage(){
    this.navCtrl.setRoot(LoginPage);
  }
}
