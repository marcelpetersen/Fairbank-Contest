import { Platform } from 'ionic-angular';
import { Directive, Renderer, ElementRef} from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard';

@Directive({
  selector: '[focuser2]' // Attribute selector
})
export class Focuser {
  constructor(private platfrom: Platform, private keyboard: Keyboard, private renderer: Renderer, private elementRef: ElementRef) {}

  ngAfterViewChecked() {
    const element = this.elementRef.nativeElement.querySelector('input');
    // we need to delay our call in order to work with ionic ...
    setTimeout(() => {
      this.renderer.invokeElementMethod(element, 'focus', []);
      if (this.platfrom.is('cordova')) {
        //this.keyboard.show();
      }
    }, 350);
  }
}
