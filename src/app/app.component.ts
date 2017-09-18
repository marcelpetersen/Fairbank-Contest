import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';

import { HomePage } from '../pages/home/home';
import { SetupPage } from "../pages/setup/setup";

import { ConnectivityServiceProvider } from '../providers/connectivity-service/connectivity-service';
import { DeviceServiceProvider } from '../providers/device-service/device-service';

@Component({
  templateUrl: 'app.html',
  providers: [ConnectivityServiceProvider]
})
export class MyApp {
  rootPage: any = null;

  constructor(connectivityService: ConnectivityServiceProvider, platform: Platform, statusBar: StatusBar, 
              splashScreen: SplashScreen, private keyboard: Keyboard, public deviceService: DeviceServiceProvider) {
    platform.ready().then(() => {
      statusBar.hide();
      splashScreen.hide();
      keyboard.disableScroll(true);

      deviceService.ready().then(() => {
        deviceService.hasDeviceName().then((hasDeviceName) => {
          if (!hasDeviceName) {
            this.rootPage = SetupPage;
          } else {
            this.deviceService.login().then(() => {
              this.rootPage = HomePage;
            });
          }
        });
      });
    });
  }
}
