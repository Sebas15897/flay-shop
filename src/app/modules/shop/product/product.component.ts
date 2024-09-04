import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { IProduct, IProductByIdPayload } from '../../../core/interfaces/product.interface';
import { Store } from '@ngxs/store';
import { GetProductByIdAction } from '../../../core/store/product/product.actions';
import { StoreState } from '../../../core/store/store/store.state';
import { IStore } from '../../../core/interfaces/store-config.interface';
import { ProductState } from '../../../core/store/product/product.state';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})

export class ProductComponent implements OnInit, AfterViewInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();

  @ViewChild('carousel') carouselImages!: ElementRef;
  selectedOption: number | null = null;
  selectedOptionSecond: number | null = null;
  isOpen: boolean = false;
  currentIndex: number = 0;
  dots: number[] = [];

  productId: string = '';

  shop$: Observable<IStore> = new Observable();
  shop: IStore = null;

  product$: Observable<IProduct> = new Observable();
  product: IProduct = null;

  constructor(private activatedRoute: ActivatedRoute, private store: Store) {
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
    this.shop$ = this.store.select(StoreState.getStore);
    this.product$ = this.store.select(ProductState.getSelectedProduct);
  }

  ngOnInit() {
    this.subscribeState();
  }

  subscribeState() {
    this.shop$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      if (resp) {
        const payload: IProductByIdPayload = {
          productId: this.productId,
          tenantId: resp.name?.toLowerCase(),
        };
        this.store.dispatch(new GetProductByIdAction(payload));
      }
    });

    this.product$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      if (resp) {
        this.product = resp;
      }
    });
  }

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
    const slideWidth =
      container.querySelector('.carousel-container')?.offsetWidth || 0;
    const offset =
      this.currentIndex * slideWidth - containerWidth / 2 + slideWidth / 2;

    container.scrollTo({
      left: offset,
      behavior: 'smooth',
    });
  }

  updateCurrentIndex(): void {
    const container = this.carouselImages.nativeElement;
    const containerWidth = container.offsetWidth;
    const slideWidth =
      container.querySelector('.carousel-container')?.offsetWidth || 0;
    this.currentIndex = Math.round(container.scrollLeft / slideWidth);
    this.currentIndex = Math.max(
      0,
      Math.min(this.currentIndex, this.getSlidesCount() - 1)
    );
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

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
