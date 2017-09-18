import { Injectable } from '@angular/core';

import { Platform } from 'ionic-angular';

import { Network } from '@ionic-native/network';

declare var Connection;

@Injectable()
export class ConnectivityServiceProvider {
  onDevice: boolean;
  connected: boolean = false;
  connectionType: any = 'none';

  constructor(public platform: Platform, private network: Network) {
    this.platform.ready().then(() => {
      this.onDevice = this.platform.is('cordova');

      this.connectionType = this.network.type;
      this.connected = (this.connectionType != 'none');

      let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
        this.connected = false;
        this.connectionType = "none";
      });

      let connectSubscription = this.network.onConnect().subscribe(() => {
        setTimeout(() => {
          if (this.network.type !== 'none') {
            this.connected = true;
          } else {
            this.connected = false;
          }

          this.connectionType = this.network.type;
        }, 3000);
      });
    });
  }

  isOnline(): boolean {
    return this.connected === true;
  }
 
  isOffline(): boolean {
    return this.connected === false;
  }
 
  getConnectionType(): boolean {
    return this.connectionType;
  }
}