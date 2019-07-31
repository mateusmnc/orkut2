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

  logout() {
    this.afAuth.auth.signOut();
  }

  getCurrentUser(){
    // return this.loadCurrentUser(this.afAuth.auth.currentUser);
  }

  async login(user: User) {

    try {
      const userCredential = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.pwd);
      if(userCredential != null){
        console.log("AUTH.TS, ASYNC LOGIN: login efetuado com sucesso");
        return true;
      }
    }
    catch (error) {
      console.log("AUTH.TS, ASYNC LOGIN: login falhou");
      console.log(error);
      return false;
    }
  }
  
  async loadCurrentUser(fireUser: firebase.User){
    try {
    this.user = await this.db.getUserByUid(fireUser.uid)
    if(this.user.pic != ''){
      this.user.picData = await this.db.getProfilePic(this.user);
    }
      console.log(this.user.picData);
      return this.user;

    } catch (error) {
      console.log("ERROR");
      console.log(error);
    }
  }

  fillCurrentUser(fireUser: firebase.User) {
    return this.db.getUserByUid(fireUser.uid);
  }
  getCurrentAuthUser(){
    return this.afAuth.auth.currentUser;
  }

  isUserSignedIn(){
    return this.afAuth.auth.currentUser != null;
  }

  async signUp(newUser: User) {
    return this.signUpAtFirebase(newUser).then(userCredential => {
      console.log(userCredential);
      
      if(!userCredential.additionalUserInfo.isNewUser){
        console.log("user already exists");
      }

      this.user = new User();
      this.user.name = newUser.name;
      this.user.email = userCredential.user.email;
      this.user.uid = userCredential.user.uid;
      this.user.pic = newUser.pic;
      return this.db.saveNewUser(this.user)
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
