import { NgModule } from '@angular/core';

import { IonicPageModule } from 'ionic-angular';

import { DetailsPage } from './details';

import { Focuser } from '../../components/focuser/focuser';
import { FormTab } from '../../components/formTab/formTab';

@NgModule({
  declarations: [
    DetailsPage,
    Focuser,
    FormTab
  ],
  imports: [
    IonicPageModule.forChild(DetailsPage),
  ],
  exports: [
    DetailsPage
  ]
})
export class DetailsPageModule {}
