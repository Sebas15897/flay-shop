import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  ViewChildren,
  QueryList,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { combineLatest, Observable, Subject, takeUntil } from 'rxjs';
import { Store } from '@ngxs/store';
import { StoreState } from '../../../core/store/store/store.state';
import { ICategory, IProduct } from '../../../core/interfaces/product.interface';
import { ProductState } from '../../../core/store/product/product.state';
import { CategoryState } from '../../../core/store/category/category.state';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})

export class CatalogComponent implements OnInit, AfterViewInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();

  @ViewChild('optionsHeader') optionsHeader!: ElementRef;
  @ViewChildren('productRow') productRows!: QueryList<ElementRef>;

  categories$: Observable<ICategory[]> = new Observable();
  categories: ICategory[] = [];

  products$: Observable<IProduct[]> = new Observable();
  products: IProduct[] = [];

  selectedOption: number | null = null;

  constructor(
    private router: Router,
    private elementRef: ElementRef,
    private store: Store
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const tree = this.router.parseUrl(this.router.url);
        if (tree.fragment) {
          this.scrollToBottom();
        }
      }
    });

    this.categories$ = this.store.select(CategoryState.getCategories);
    this.products$ = this.store.select(ProductState.getProducts);
  }

  ngOnInit() {
    this.subscribeState();
  }

  subscribeState() {
    this.categories$.pipe(takeUntil(this.destroy)).subscribe((categories) => {
      this.categories = categories;
    })
  }

  ngAfterViewInit() {
    if (this.optionsHeader) {
      const headerContainer = this.optionsHeader.nativeElement;

      headerContainer.addEventListener('wheel', (event: WheelEvent) => {
        if (event.deltaY !== 0) {
          headerContainer.scrollLeft += event.deltaY;
          event.preventDefault();
        }
      });
    }

    if (this.productRows) {
      this.productRows.forEach((row) => {
        const productRowElement = row.nativeElement;

        productRowElement.addEventListener('wheel', (event: WheelEvent) => {
          if (event.deltaY !== 0) {
            productRowElement.scrollLeft += event.deltaY;
            event.preventDefault();
          }
        });
      });
    }
  }

  scrollToBottom(): void {
    const startPosition = window.pageYOffset;
    const targetPosition = document.body.scrollHeight - window.innerHeight;
    const distance = targetPosition - startPosition;
    const duration = 1000;
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
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  }

  selectOption(option: number): void {
    this.selectedOption = option;
  }

  redirectToProduct() {
    this.router.navigate(['/shop/product']);
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
