import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements AfterViewInit {
  @ViewChild('carousel') carouselImages!: ElementRef;
  selectedOption: number | null = null;
  selectedOptionSecond: number | null = null;
  isOpen: boolean = false;
  currentIndex: number = 0;
  dots: number[] = [];

  constructor(private router: Router) {}

  ngAfterViewInit() {
    if (this.carouselImages) {
      const container = this.carouselImages.nativeElement;
      
      this.dots = Array.from({ length: this.getSlidesCount() }, (_, i) => i);
      this.updateDots();

      container.addEventListener('scroll', () => {
        this.updateCurrentIndex();
        this.updateDots();
      });

      // Manejo de desplazamiento con la rueda del ratón
      container.addEventListener('wheel', (event: WheelEvent) => {
        if (event.deltaY !== 0) {
          container.scrollLeft += event.deltaY;
          event.preventDefault();
        }
      });
    }
  }

  getSlidesCount(): number {
    return this.carouselImages.nativeElement.children.length;
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
    this.updateCarousel();
  }

  updateCarousel(): void {
    const container = this.carouselImages.nativeElement;
    const containerWidth = container.offsetWidth;
    const slideWidth = container.querySelector('.carousel-container')?.offsetWidth || 0;
    const offset = (this.currentIndex * slideWidth) - (containerWidth / 2) + (slideWidth / 2);

    container.scrollTo({
      left: offset,
      behavior: 'smooth'
    });
  }

  updateCurrentIndex(): void {
    const container = this.carouselImages.nativeElement;
    const containerWidth = container.offsetWidth;
    const slideWidth = container.querySelector('.carousel-container')?.offsetWidth || 0;
    this.currentIndex = Math.round(container.scrollLeft / slideWidth);
    this.currentIndex = Math.max(0, Math.min(this.currentIndex, this.getSlidesCount() - 1));
  }

  updateDots(): void {
    const dots = document.querySelectorAll('.carousel-dots span');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentIndex);
    });
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