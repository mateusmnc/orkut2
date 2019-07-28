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

  constructor(private afAuth: AngularFireAuth, private db: DatabaseProvider) {
    // if(this.isUserSignedIn()){
      // this.fillCurrentUser(this.afAuth.auth.currentUser);
      // this.user = this.fetchCurrentUser(this.afAuth.auth.currentUser);
    // }
  }

  async getCurrentUser(){
    if(!this.isUserSignedIn()){
      this.user = await this.fetchCurrentUser(this.afAuth.auth.currentUser);
    }
    return this.user;
  }

  async login(user: User) {
    let userCredential = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.pwd);
    this.user = await this.fetchCurrentUser(userCredential.user);
        
    // this.afAuth.auth.signInWithEmailAndPassword(user.email, user.pwd).then(
    //   userCredential =>{
    //     this.fillCurrentUser(userCredential.user);
    //   }, 
    //   error =>{
    //     console.log("Error during login");
    //     console.log(error);
    //   }
    // );

  // }
  // private fillCurrentUser(fireUser: firebase.User) {
  //   this.user = this.db.getUserByUid(fireUser.uid);
  // }
  }
  private async fetchCurrentUser(fireUser: firebase.User): Promise<User> {
    return await this.db.getUserByUid(fireUser.uid);
  }

  isUserSignedIn(){
    console.log("isUserSignedIn");
    console.log(this.afAuth.auth.currentUser);
    return this.afAuth.auth.currentUser != null;
  }

  async signUp(newUser: User) {
    this.signUpAtFirebase(newUser).then(userCredential => {
      console.log(userCredential);
      
      if(!userCredential.additionalUserInfo.isNewUser){
        console.log("user already exists");
      }

      this.user = new User();
      this.user.name = newUser.name;
      this.user.email = userCredential.user.email;
      this.user.uid = userCredential.user.uid;
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
