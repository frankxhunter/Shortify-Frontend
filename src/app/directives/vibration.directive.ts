import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appVibration]',
  exportAs: 'appVibration'
})
export class VibrationDirective {

  @Input() shouldVibrate = false;
  constructor(private el: ElementRef, private render: Renderer2) { }

  vibration() {
    if (this.shouldVibrate) {
      this.render.addClass(this.el.nativeElement, "vibration")
      setTimeout(() => this.render.removeClass(this.el.nativeElement, "vibration"), 300)
    }
  }

}
