import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @ViewChild('carousel') carouselImages!: ElementRef;
  selectedOption: number | null = null;
  selectedOptionSecond: number | null = null;
  isOpen: boolean = false;

  constructor(
    private router: Router,
  ) {}

  ngAfterViewInit() {
    if (this.carouselImages) {
      const container = this.carouselImages.nativeElement;

      container.addEventListener('wheel', (event: WheelEvent) => {
        if (event.deltaY !== 0) {
          container.scrollLeft += event.deltaY;
          event.preventDefault(); // Evita el desplazamiento vertical por defecto
        }
      });
    }
  }

  toggleDescription(): void {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: number): void {
    this.selectedOption = option;
  }

  selectOptionSecond(option: number): void {
    this.selectedOptionSecond = option;
  }
}
