import { HomePage } from './home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

interface Array<T> {
    fill(value: T): Array<T>;
}

export class FormPage {
  timer: any;
  timerEvent: any;
  confirming: boolean = false;
  form: FormGroup;
  nextPage: any;
  numPages: any = 4;
  totalPages: Array<number>;
  submitting: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public alertCtrl: AlertController) {
    this.totalPages = Array.apply(null, new Array(this.numPages)).map((x, i) => i + 1);
  }

  ionViewDidEnter() {
    this.confirming = false;
    this.startTimer();

    this.timerEvent = function() {
      this.startTimer();
    }.bind(this);

    document.addEventListener("mousemove", this.timerEvent, false);
    document.addEventListener("mousedown", this.timerEvent, false);
    document.addEventListener("keypress", this.timerEvent, false);
    document.addEventListener("DOMMouseScroll", this.timerEvent, false);
    document.addEventListener("mousewheel", this.timerEvent, false);
    document.addEventListener("touchmove", this.timerEvent, false);
    document.addEventListener("MSPointerMove", this.timerEvent, false);
  }

  ionViewDidLeave() {
    document.removeEventListener("mousemove", this.timerEvent);
    document.removeEventListener("mousedown", this.timerEvent);
    document.removeEventListener("keypress", this.timerEvent);
    document.removeEventListener("DOMMouseScroll", this.timerEvent);
    document.removeEventListener("mousewheel", this.timerEvent);
    document.removeEventListener("touchmove", this.timerEvent);
    document.removeEventListener("MSPointerMove", this.timerEvent);
  }

  startTimer() {
    if (this.confirming) return;

    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    this.timer = setTimeout(() => {
      this.presentPrompt();
    }, 30000);
  }

  ionViewWillLeave() {
    clearTimeout(this.timer);
  }

  onSubmit() {
    this.submitting = true;
    this.updateEntry().then(() => {
      this.navCtrl.push(this.nextPage);
      this.submitting = false;
    });
  }

  presentPrompt() {
    this.confirming = true;

    let secondTimer;
    let alert = this.alertCtrl.create({
      title: 'Entry Inactivity',
      message: 'Your entry will end in 30 seconds for inactivity.',
      buttons: [
        {
          text: 'Cancel Entry',
          role: 'cancel',
          handler: () => {
            clearTimeout(secondTimer);
            alert.dismiss().then(() => {
              this.cancel();
            });
            return false;
          }
        },
        {
          text: 'Continue',
          handler: () => {
            clearTimeout(secondTimer);
            alert.dismiss().then(() => {
              this.confirming = false;
              this.startTimer();
            });
            return false;
          }
        }
      ]
    });

    alert.present().then(() => {
      secondTimer = setTimeout(() => {
          alert.dismiss().then(() => {
            this.cancel();
          });
      }, 30000);
    });
  }

  cancel() {
    this.navCtrl.setRoot(HomePage);
  }

  back() {
    this.navCtrl.pop();
  }

  updateEntry() {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }
}