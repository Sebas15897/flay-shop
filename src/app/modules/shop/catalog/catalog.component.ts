import { Component, AfterViewInit, ElementRef, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements AfterViewInit {
  @ViewChild('optionsHeader') optionsHeader!: ElementRef;
  @ViewChildren('productRow') productRows!: QueryList<ElementRef>;
  selectedOption: number | null = null;

  constructor(
    private router: Router,
    private elementRef: ElementRef
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const tree = this.router.parseUrl(this.router.url);
        if (tree.fragment) {
          this.scrollToBottom();
        }
      }
    });
  }

  ngAfterViewInit() {
    if (this.optionsHeader) {
      const headerContainer = this.optionsHeader.nativeElement;

      headerContainer.addEventListener('wheel', (event: WheelEvent) => {
        if (event.deltaY !== 0) {
          headerContainer.scrollLeft += event.deltaY;
          event.preventDefault(); // Evita el desplazamiento vertical por defecto
        }
      });
    }

    // Asegúrate de que productRows esté disponible y tenga elementos
    if (this.productRows) {
      this.productRows.forEach((row) => {
        const productRowElement = row.nativeElement;

        productRowElement.addEventListener('wheel', (event: WheelEvent) => {
          if (event.deltaY !== 0) {
            productRowElement.scrollLeft += event.deltaY;
            event.preventDefault(); // Evita el desplazamiento vertical por defecto
          }
        });
      });
    }
  }

  scrollToBottom(): void {
    const startPosition = window.pageYOffset;
    const targetPosition = document.body.scrollHeight - window.innerHeight;
    const distance = targetPosition - startPosition;
    const duration = 1000; // Duración de la animación en milisegundos
    let startTime: number | null = null;

    function animation(currentTime: number) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t: number, b: number, c: number, d: number): number {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  }

  selectOption(option: number): void {
    this.selectedOption = option;
  }

  redirectToProduct(){
    this.router.navigate(['/shop/product']);
  }
}