import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NovoPostPage } from '../novo-post/novo-post';
import { AngularFireDatabase } from '@angular/fire/database';
import { Post } from '../../entities/post';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html'
})
export class TimelinePage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  // items: Observable<{}[]>;
  constructor(public navCtrl: NavController, private db: AngularFireDatabase) {
    // this.items = this.db.list('/posts/3').valueChanges();
    // this.items.subscribe(posts => {
    //   posts.forEach( (post, index) => {
    //     console.log(post);
    //   });
    // });
  }
  
  goToNovoPostPage(params){
    if (!params) params = {};
    this.navCtrl.push(NovoPostPage);
  }
}
