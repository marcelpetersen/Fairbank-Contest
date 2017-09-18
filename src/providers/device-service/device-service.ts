import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';

import { BatteryStatus } from '@ionic-native/battery-status';

import { Storage } from '@ionic/storage';

import { AngularFireDatabase } from "angularfire2/database";

@Injectable()
export class DeviceServiceProvider {
  user: any;
  userData: any = {
    state: 'offline',
    charging: false,
    battery: null
  };

  constructor(public platform: Platform, public storage: Storage, public db: AngularFireDatabase, private batteryStatus: BatteryStatus) {}

  ready() {
    return this.storage.ready();
  }

  hasDeviceName() {  
    return this.storage.get("deviceName").then((deviceName) => {
      return deviceName != null;
    });
  }

  getDeviceName() {
    return this.storage.get("deviceName");
  }

  setDeviceName(deviceName) {
    return this.storage.set("deviceName", deviceName).then(() => {
      this.login();
    });
  }

  login() {
    return this.getDeviceName().then((deviceName) => {
      this.user = this.db.object('/users/' + deviceName);
      this.userData.state = "online";
      this.user.set(this.userData);
      this.user.$ref.onDisconnect().update({ state: "offline", plugged: false, battery: 0 });

      if (this.platform.is('cordova')) {
        let subscription = this.batteryStatus.onChange().subscribe((status) => {
          if (status.isPlugged) {
            this.userData.charging = true;
          } else {
            this.userData.charging = false;
          }

          this.userData.battery = status.level;

          this.user.set(this.userData);
        });
      }
    });
  }
}
