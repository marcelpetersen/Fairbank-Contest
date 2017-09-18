import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-thankyou',
  templateUrl: 'thankyou.html',
})
export class ThankyouPage {
  timer: any;
  name: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.name = navParams.get("name");
  }

  ionViewDidEnter() {
    this.startTimer();
  }

  startTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    this.timer = setTimeout(() => {
      this.startAgain();
    }, 30000);
  }

  ionViewWillLeave() {
    clearTimeout(this.timer);
  }

  startAgain() {
    this.navCtrl.setRoot(HomePage);
  }

}
