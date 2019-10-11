import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TimelinePage } from '../pages/timeline/timeline';
import { AmigosPage } from '../pages/amigos/amigos';
import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';
import { LoginPage } from '../pages/login/login';
import { BemVindoAoOrkut2Page } from '../pages/bem-vindo-ao-orkut2/bem-vindo-ao-orkut2';
import { NovoPostPage } from '../pages/novo-post/novo-post';
import { PesquisarAmigosPage } from '../pages/pesquisar-amigos/pesquisar-amigos';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';

import { FIREBASE_CONFIG } from './firebase.config';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth'
import { DatabaseProvider } from '../providers/database/database';
import { Camera } from '@ionic-native/camera';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { Contacts } from '@ionic-native/contacts';

@NgModule({
  declarations: [
    MyApp,
    TimelinePage,
    AmigosPage,
    TabsControllerPage,
    LoginPage,
    BemVindoAoOrkut2Page,
    NovoPostPage,
    PesquisarAmigosPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TimelinePage,
    AmigosPage,
    TabsControllerPage,
    LoginPage,
    BemVindoAoOrkut2Page,
    NovoPostPage,
    PesquisarAmigosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    DatabaseProvider,
    Camera,
    Contacts
  ]
})
export class AppModule {}