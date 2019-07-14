import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';

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
      nome:['', Validators.compose([Validators.required])],
      email:['', Validators.compose([Validators.required, Validators.email])],
      senha:['', Validators.compose([Validators.required])]
    });
  }
  
  criarConta(){
    if(!this.signUpForm.valid){
      return;
    }
    if(!this.auth.signUp(this.signUpForm.value)){
      return;
    }
    this.goToLoginPage();
  }

  goToLoginPage(){
    this.navCtrl.setRoot(LoginPage);
  }
}
