import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';

import { FormPage } from "../formPage";

import { ThankyouPage } from "../thankyou/thankyou";

import { EntryProvider } from "../../providers/entry/entry";

@IonicPage()
@Component({
  selector: 'page-final',
  templateUrl: 'final.html',
})
export class FinalPage extends FormPage {
  currentPage: any = 4;
  rangeText: any = {
    'rateFood': 'Good',
    'rateShopping': 'Good',
    'attendAgain': 'Unsure'
  };

  rangeOptions: any = [
    'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'
  ];

  householdNames = [
    'Single', 'Couple', '1-2 Children', '3-4 Children', '4+ Children'
  ];

  householdOptions = [
    'single', 'couple', '1-2-children', '3-4-children', '4-plus-children'
  ];

  attendOptions: any = [
    'Not likely', 'Somewhat unlikely', 'Unsure', 'Likely', 'Very Likely'
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder,
              public alertCtrl: AlertController, public entryProvider: EntryProvider) {
    super(navCtrl, navParams, formBuilder, alertCtrl);

    this.form = formBuilder.group({
      rateFood: ['3', [Validators.required]],
      rateShopping: ['3', [Validators.required]],
      attendAgain: ['3', [Validators.required]],
      householdStatus: [''],
      comments: ['']
    });

    this.nextPage = ThankyouPage;
  }

  updateEntry() {
    return new Promise((resolve, reject) => {
      this.entryProvider.updateEntry(this.form.value).then(() => {
        this.entryProvider.submitEntry();
        resolve();
      });
    });
  }

  setRangeText(rangeTextId, rangeOptions = this.rangeOptions) {
    this.startTimer();
    this.rangeText[rangeTextId] = rangeOptions[(this.form.value[rangeTextId] - 1)];
  }
}
