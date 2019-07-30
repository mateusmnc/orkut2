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

  async getCurrentUser(){
    if(this.user == null){
      this.fillCurrentUser(this.afAuth.auth.currentUser);
    }
    return this.user;
  }

  async login(user: User) {

    try {
      const userCredential = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.pwd);
      console.log("userCredential: ");
      console.log(userCredential.user.uid);
      this.user = await this.fillCurrentUser(userCredential.user);
      console.log(this.user);
      return true;
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }
  
  loadCurrentUser(){
    this.fillCurrentUser(this.afAuth.auth.currentUser).then( u => {
      this.user = u;
      console.log("user is loaded");
      console.log(this.user.userId);
    })

  }

  async fillCurrentUser(fireUser: firebase.User) {
    return this.db.getUserByUid(fireUser.uid);
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
