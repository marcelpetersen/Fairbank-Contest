import { EntryProvider } from '../../providers/entry/entry';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DetailsPage } from '../details/details';
import { TermsPage } from "../terms/terms";
import { MapPage } from '../map/map';
import { RatingsPage } from '../ratings/ratings';
import { FinalPage } from '../final/final';
import { ThankyouPage } from '../thankyou/thankyou';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  changing: boolean = false;

  constructor(public entryProvider: EntryProvider, public navCtrl: NavController) {}

  ionViewDidEnter() {
    this.changing = false;
    this.entryProvider.clearEntry();
  }

  start(event) {
    if (this.changing) return;

    event.preventDefault();
    event.stopPropagation();

    this.changing = false;

    setTimeout(() => {
      this.navCtrl.push(DetailsPage, {}, { animate: false });
    }, 0);
  }

  openTerms() {
    this.navCtrl.push(TermsPage);
  }
}
