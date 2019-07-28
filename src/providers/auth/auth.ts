import { Injectable } from '@angular/core';
import { User } from '../../entities/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { DatabaseProvider } from '../database/database';
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  private user: User;

  constructor(private afAuth: AngularFireAuth, private db: DatabaseProvider) {}

  getCurrentUser(){
    return this.user;
  }

  async login(user: User) {

    // this.user = USERS.filter( user => user.email == email && user.senha == senha)[0];
    
    // if(this. == null){
      // return false;
    // }
    return true;
  }
  async isUserSignedIn(){
    if(this.afAuth.auth.currentUser != null){
      console.log("user is logged in");
      console.log(this.afAuth.auth)
      return true;
    }
  }

  async signUp(newUser: User) {
    this.signUpAtFirebase(newUser).then(response => {
      console.log(response);
      
      if(!response.additionalUserInfo.isNewUser){
        console.log("user already exists");
      }

      this.user = new User();
      this.user.name = newUser.name;
      this.user.email = response.user.email;
      this.user.uid = response.user.uid;
      this.db.saveNewUser(this.user)
      .then(
        result =>{
          console.log("user successfully saved:");
          console.log(result);
          return true;
        },
        error => {
          console.log("User cannot be created")
          console.log(error);
          return false;
        }
      );
    })
  }

  private async signUpAtFirebase(newUser: User){
    try{
      return <firebase.auth.UserCredential> await this.afAuth.auth.createUserWithEmailAndPassword(newUser.email, newUser.pwd);
    } catch(exception){
      console.log(exception);
      return;
    }
  }
}
