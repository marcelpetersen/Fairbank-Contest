import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

import { FormPage } from '../formPage';

import { MapPage } from "../map/map";
import { RatingsPage } from '../ratings/ratings';

import { ConnectivityServiceProvider } from "../../providers/connectivity-service/connectivity-service";
import { EntryProvider } from "../../providers/entry/entry";

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class DetailsPage extends FormPage {
  currentPage: any = 1;
  askingPostalCode: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public alertCtrl: AlertController,
              public connectionService: ConnectivityServiceProvider, public entryProvider: EntryProvider) {
    super(navCtrl, navParams, formBuilder, alertCtrl);

    this.form = formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, this.phoneValidator.bind(this)]]
    });
  }

  ionViewDidEnter() {
    this.askingPostalCode = !this.connectionService.isOnline();

    if (this.askingPostalCode) {
      this.nextPage = RatingsPage;
    } else {
      this.nextPage = MapPage;
    }
    
    if (this.askingPostalCode && !this.form.contains("postalCode")) {
      this.form.addControl('postalCode', new FormControl("", [this.postalCodeValidator.bind(this)]));
    } else if (!this.askingPostalCode && this.form.contains("postalCode")) {
      this.form.removeControl("postalCode");
    }

    super.ionViewDidEnter();
  }

  updateEntry() {
    return this.entryProvider.updateEntry(this.form.value);
  }

  phoneValidator(control: FormControl): {[s: string]: boolean} {
    if (control.value !== '') {
      if (!control.value.match('\\(?\\d{3}\\)? *-? *\\d{3} *-? *-?\\d{4}')) {
        return {invalidPhone: true};
      }
    } else {
      return {};
    }
  }

  postalCodeValidator(control: FormControl): {[s: string]: boolean} {
    if (control.value !== '') {
      if (!control.value.match(/[ABCEGHJKLMNPRSTVXY][0-9][ABCEGHJKLMNPRSTVWXYZ] ?[0-9][ABCEGHJKLMNPRSTVWXYZ][0-9]/i)) {
        return {invalidPostalCode: true};
      }
    }
  }
}