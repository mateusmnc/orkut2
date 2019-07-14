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
    IonicModule.forRoot(MyApp)
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
    AuthProvider
  ]
})
export class AppModule {}