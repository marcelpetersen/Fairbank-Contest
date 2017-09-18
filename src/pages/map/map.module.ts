import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapPage } from './map';

import { AutoCompleteModule } from "ionic2-auto-complete";

@NgModule({
  declarations: [
    MapPage,
  ],
  imports: [
    AutoCompleteModule,
    IonicPageModule.forChild(MapPage),
  ],
  exports: [
    MapPage
  ]
})
export class MapPageModule {}
