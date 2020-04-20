import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FactOrFakeRequest } from '../../entities/factOrFakeRequest';
import { DatabaseProvider } from '../../providers/database/database';
import { Observable } from 'rxjs';

/**
 * Generated class for the FactsAndFakesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-facts-and-fakes',
  templateUrl: 'facts-and-fakes.html',
})
export class FactsAndFakesPage {
  factsAndFakes: Observable<FactOrFakeRequest[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams, private db: DatabaseProvider) {
  }
  // ngOnInit(){
  // }
  
  ionViewDidLoad() {
    this.factsAndFakes = this.db.getFactsAndFakes();
    console.log('ionViewDidLoad FactsAndFakesPage');
    // for (let ff = 0; ff < 10; ff++) {
    //   let newFf = new FactOrFakeRequest();
    //   newFf.uuid = "uuid qualquer";
    //   newFf.text = "Texto";
    //   newFf.textHex = "textHex";
    //   newFf.imgHex = "imgHex";
    //   newFf.image = "../../assets/img/adeni.jpg";
    //   newFf.status = "Em Avaliação";
    //   this.factsAndFakes.push(newFf);
    // } 
  }
  displayReason(reason:string){
    if(reason == "" || reason == undefined){
      return false;
    }

    return true;
  }
  getColor(response: string){
    if(response === "Em Avaliação"){
      return "warning";
    }

    if(response === "É Fato"){
      return "success";
    }
    if(response === "É Fake"){
      return "danger";
    }    
  }
}
