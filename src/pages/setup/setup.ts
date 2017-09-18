import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { DeviceServiceProvider } from '../../providers/device-service/device-service';

import { HomePage } from "../home/home";

@IonicPage()
@Component({
  selector: 'page-setup',
  templateUrl: 'setup.html',
})
export class SetupPage {
  form: FormGroup;
  showBack: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder,
              public deviceService: DeviceServiceProvider) {
    this.form = formBuilder.group({
      deviceName: ['', [Validators.required]],
    });
  }

  ionViewDidLoad() {
    this.deviceService.hasDeviceName().then((hasDevice) => {
      this.showBack = hasDevice;
    });
  }

  back() {
    this.navCtrl.pop();
  }

  onSubmit() {
    console.log(this.form.value.deviceName);
    this.deviceService.setDeviceName(this.form.value.deviceName).then(() => {
      this.navCtrl.push(HomePage);
    });
  }
}
