import {
  Directive,
  HostListener,
  HostBinding,
  ElementRef,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @HostBinding('class.show')
  isOpen = false;

  @HostListener('click')
  toggleOpen() {
    // switch true/false when user click the dropdown
    this.isOpen = !this.isOpen;

    // get the html element that need to be modified
    const htmlElement = this.elementRef.nativeElement.querySelector('.dropdown-menu');

    // Add/remove .show based on the value of isOpen
    if (this.isOpen) {
      this.renderer.addClass(htmlElement, 'show');
    } else {
      this.renderer.removeClass(htmlElement, 'show');
    }
  }
}
