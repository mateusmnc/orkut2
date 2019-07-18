import { Injectable } from '@angular/core';
import { USERS } from '../../mockdata/mock-users';
import { User } from '../../entities/user';
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  private currentUser: User;
  // constructor(public http: HttpClient) {
  constructor() {
    console.log('Hello AuthProvider Provider');
  }

  getCurrentUser(){
    return this.currentUser;
  }
  login(email: string, senha: string):boolean {
    this.currentUser = USERS.filter( user => user.email == email && user.senha == senha)[0];
    
    if(this.currentUser == null){
      return false;
    }
    return true;
  }

  signUp(signUpForm): boolean {
    if(USERS.filter(user => user.email == signUpForm.email)[0] != null){
      console.log("já existe, id: " + USERS.filter(user => user.email == signUpForm.email && user.senha == signUpForm.senha)[0].id);
      return false;
    }
    USERS.push(new User(USERS.length, signUpForm.nome, signUpForm.email, signUpForm.senha, 'assets/img/profile/coragem.jpg'));
    console.log(USERS);
    return true;
  }
}
