import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FinalPage } from './final';

@NgModule({
  declarations: [
    FinalPage,
  ],
  imports: [
    IonicPageModule.forChild(FinalPage),
  ],
  exports: [
    FinalPage
  ]
})
export class FinalPageModule {}
