import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';

import { UUID } from 'angular2-uuid';

import { AfoListObservable, AngularFireOfflineDatabase } from 'angularfire2-offline/database';
import { AngularFireDatabase } from "angularfire2/database";

import 'rxjs/add/operator/map';
import { ConnectivityServiceProvider } from "../connectivity-service/connectivity-service";

@Injectable()
export class EntryProvider {
  currentEntry: any = {};
	entries: any;
  //entriesList: any;
	//emailLookup: any;
	//phoneLookup: any;

  constructor(public db: AngularFireOfflineDatabase, public platform: Platform) {
    this.entries = db.list('/entries');
    //this.emailLookup  = db.database.ref('/emailLookup');
    //this.phoneLookup = db.database.ref('/phoneLookup');
  }

  public clearEntry() {
    this.currentEntry = {};
  }

  public updateEntry(data) {
    return new Promise((resolve, reject) => {
      Object.assign(this.currentEntry, data);
      resolve();
    });
  }

  public getEntry() {
    return this.currentEntry;
  }

  public submitEntry() {
    return new Promise((resolve, reject) => { 
      this.entries.push(this.currentEntry).then(() => {
        resolve('');
      })
      /*
      let uuid = UUID.UUID();

      this.emailLookup.update({ [this.currentEntry.email]: uuid }).then(() => {
        this.phoneLookup.update({ [this.currentEntry.phone]: uuid }).then(() => {
          this.entries.update({ [uuid]: this.currentEntry }).then(() => {
            this.clearEntry();
            resolve('');
          }).catch((error) => {
            resolve('');
          });
        }).catch((error) => {
          this.emailLookup.child(this.currentEntry.email).remove();
          resolve('');
        });
      }).catch((error) => {
        resolve('');
      });
      */
    });
  }

  public getEntries() {
    return this.entries;
  }
}
