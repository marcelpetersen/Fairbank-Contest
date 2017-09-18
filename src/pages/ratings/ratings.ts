import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';

import { FormPage } from "../formPage";

import { FinalPage } from "../final/final";

import { EntryProvider } from "../../providers/entry/entry";

@IonicPage()
@Component({
  selector: 'page-ratings',
  templateUrl: 'ratings.html',
})
export class RatingsPage extends FormPage {
  currentPage: any = 3;
  rangeText: any = {
    'rateRides': 'Neutral',
    'rateMusic': 'Good',
    'rateAtmosphere': 'Good'
  };

  rideOptions: any = [
    "Not at all important", "Slightly Important", "Important", "Fairly Important", "Very Important"
  ];

  rangeOptions: any = [
    'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'
  ];

  howHearCheckboxes: any;

  howHearLabels: any = [
    'TV', 'Radio', 'Newspaper', 'Facebook Ad', 'BlogTO', 'Social Media', 'Poster', 'Postcard', 'Online', 'Word-of-Mouth', 'Other'
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder,
              public alertCtrl: AlertController, public entryProvider: EntryProvider) {
    super(navCtrl, navParams, formBuilder, alertCtrl);

    this.howHearCheckboxes = new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
      new FormControl(false)
    ]);

    this.form = formBuilder.group({
      howHear: this.howHearCheckboxes,
      howHearOther: [''],
      rateRides: ['3', [Validators.required]],
      rateMusic: ['3', [Validators.required]],
      rateAtmosphere: ['3', [Validators.required]],
    });

    this.nextPage = FinalPage;
  }

  updateEntry() {
    let values = this.form.value;
    values.howHear = this.howHearLabels.map((el) => {
      return el.replace(/\s+/g, '-').toLowerCase();
    }).filter((el, index) => {
      return values.howHear[index];
    });

    return this.entryProvider.updateEntry(values);
  }

  setRangeText(rangeTextId, rangeOptions = this.rangeOptions) {
    this.startTimer();
    this.rangeText[rangeTextId] = rangeOptions[(this.form.value[rangeTextId] - 1)];
  }
}
