import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TimelinePage } from '../timeline/timeline';
import { BemVindoAoOrkut2Page } from '../bem-vindo-ao-orkut2/bem-vindo-ao-orkut2';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';
import { AuthProvider } from '../../providers/auth/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  
  public loginForm: FormGroup;

  constructor(
    public navCtrl: NavController, 
    private auth: AuthProvider,
    private formBuilder: FormBuilder) {

      this.loginForm = this.formBuilder.group({
        email:['', Validators.compose([Validators.required, Validators.email])],
        senha:['', Validators.compose([Validators.required])]
      });
  
  }

  login(){
    if(this.auth.login(this.loginForm.value.email, this.loginForm.value.senha)){
      this.goToTabsControllerPage();
    }
  }
  goToTabsControllerPage(){
    this.navCtrl.push(TabsControllerPage);
  }
  
  goToBemVindoAoOrkut2(){
    this.navCtrl.push(BemVindoAoOrkut2Page);
  }
}
