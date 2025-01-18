import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] // Fixed the typo
})
export class HeaderComponent implements OnInit {
  isClicked: boolean = false;


  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    this.headerScrolled();
  }

  // Listen to window scroll events
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.headerScrolled();
  }

  // Function to handle header scroll behavior
  headerScrolled() {
    const selectHeader = this.el.nativeElement.querySelector('#header');
    const backtoTop = this.el.nativeElement.querySelector('.back-to-top');

    if (selectHeader) {
      if (window.scrollY > 100) {
        this.renderer.addClass(selectHeader, 'header-scrolled');
        if (backtoTop) {
          this.renderer.addClass(backtoTop, 'active');
        }
      } else {
        this.renderer.removeClass(selectHeader, 'header-scrolled');
        if (backtoTop) {
          this.renderer.removeClass(backtoTop, 'active');
        }
      }
    }
  }
  becameClicked(clickedElement:Event){
    this.isClicked = !this.isClicked
  }
}
