import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BemVindoAoOrkut2Page } from '../bem-vindo-ao-orkut2/bem-vindo-ao-orkut2';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';
import { AuthProvider } from '../../providers/auth/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../entities/user';

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
        password:['', Validators.compose([Validators.required])]
      });
  
  }

  ionViewDidLoad(){
    if(this.auth.isUserSignedIn()){
      this.auth.loadCurrentUser();
      this.goToTabsControllerPage();
    }
  }

  async login(){
    if(!this.loginForm.valid){
      return;
    }

    let userToLogin = this.buildUserFromForm(this.loginForm.value);

    if(await this.auth.login(userToLogin)){
      console.log("login, if->gotoTabasPage()");
      this.goToTabsControllerPage();
    }

  }

  private buildUserFromForm(loginForm){
    let user = new User();
    user.email = loginForm.email;
    user.pwd = loginForm.password;
    return user;
  }

  goToTabsControllerPage(){
    this.navCtrl.push(TabsControllerPage);
  }
  
  goToBemVindoAoOrkut2(){
    this.navCtrl.push(BemVindoAoOrkut2Page);
  }
}
