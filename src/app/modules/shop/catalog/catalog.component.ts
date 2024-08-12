import { ViewportScroller } from '@angular/common';
import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements AfterViewInit {
  @ViewChild('optionsHeader') optionsHeader!: ElementRef;
  selectedOption: number | null = null;

  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const tree = this.router.parseUrl(this.router.url);
        if (tree.fragment) {
          this.viewportScroller.scrollToAnchor(tree.fragment);
        }
      }
    });
  }

  ngAfterViewInit() {
    if (this.optionsHeader) {
      const container = this.optionsHeader.nativeElement;

      container.addEventListener('wheel', (event: WheelEvent) => {
        if (event.deltaY !== 0) {
          container.scrollLeft += event.deltaY;
          event.preventDefault(); // Evita el desplazamiento vertical por defecto
        }
      });
    }
  }

  selectOption(option: number): void {
    this.selectedOption = option;
  }

  redirectToProduct(){
    this.router.navigate(['/shop/product']);
  }
}
