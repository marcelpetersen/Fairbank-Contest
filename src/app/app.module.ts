import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireOfflineModule } from 'angularfire2-offline';

import { HomePage } from '../pages/home/home';
import { DetailsPage } from '../pages/details/details';
import { MapPage } from "../pages/map/map";
import { RatingsPage } from "../pages/ratings/ratings";
import { FinalPage } from "../pages/final/final";
import { ThankyouPage } from "../pages/thankyou/thankyou";
import { TermsPage } from "../pages/terms/terms";
import { SetupPage } from "../pages/setup/setup";

import { DetailsPageModule } from '../pages/details/details.module';
import { MapPageModule } from "../pages/map/map.module";
import { RatingsPageModule } from "../pages/ratings/ratings.module";
import { FinalPageModule } from "../pages/final/final.module";
import { ThankyouPageModule } from "../pages/thankyou/thankyou.module";
import { TermsPageModule } from "../pages/terms/terms.module";
import { SetupPageModule } from "../pages/setup/setup.module";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { NativeStorage } from '@ionic-native/native-storage';
import { Network } from '@ionic-native/network';
import { BatteryStatus } from '@ionic-native/battery-status';
import { Geolocation } from '@ionic-native/geolocation';

import { IonicStorageModule } from '@ionic/storage';

import { AutoCompleteModule } from 'ionic2-auto-complete';

import { EntryProvider } from '../providers/entry/entry';
import { GeoServiceProvider } from '../providers/geo-service/geo-service';
import { ConnectivityServiceProvider } from '../providers/connectivity-service/connectivity-service';
import { DeviceServiceProvider } from '../providers/device-service/device-service';
import { MapToIterablePipe } from '../pipes/map-to-iterable/map-to-iterable';

export const firebaseConfig = {
  apiKey: "AIzaSyBMbOaJ85SrqjcTbZ94Ci6mKQdUlTlWyL8",
  authDomain: "fairbank-ac031.firebaseapp.com",
  databaseURL: "https://fairbank-ac031.firebaseio.com",
  projectId: "fairbank-ac031",
  storageBucket: "fairbank-ac031.appspot.com",
  messagingSenderId: "630523913624"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapToIterablePipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, { scrollAssist: false, autoFocusAssist: false }),
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['localstorage']
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireOfflineModule,

    DetailsPageModule,
    MapPageModule,
    RatingsPageModule,
    FinalPageModule,
    ThankyouPageModule,
    TermsPageModule,
    SetupPageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DetailsPage,
    MapPage,
    RatingsPage,
    FinalPage,
    ThankyouPage,
    TermsPage,
    SetupPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    NativeStorage,
    Network,
    BatteryStatus,
    Geolocation,

    EntryProvider,

    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GeoServiceProvider,
    ConnectivityServiceProvider,
    DeviceServiceProvider
  ]
})
export class AppModule {}
