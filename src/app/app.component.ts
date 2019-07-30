import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthProvider } from '../providers/auth/auth';
// import { Unsubscribe } from 'firebase';
// import firebase from 'firebase';
// import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  rootPage:any = LoginPage;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private auth: AuthProvider,
    db: AngularFireDatabase) {
      // const unsubscribe:Unsubscribe = firebase.auth().onAuthStateChanged(
      //   user => {
      //     if(user){
      //       this.auth.loadCurrentUser();
      //       this.rootPage = TabsControllerPage;
      //       unsubscribe();
      //     }else{
      //       this.rootPage = LoginPage;
      //       unsubscribe();
      //     }
      // });
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  
}
