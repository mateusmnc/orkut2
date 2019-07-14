import { HttpClient } from '@angular/common/http';
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

  login(email: string, senha: string):boolean {
    this.currentUser = USERS.filter( user => user.email == email && user.senha == senha)[0];
    
    if(this.currentUser == null){
      return false;
    }
    return true;
  }
}
