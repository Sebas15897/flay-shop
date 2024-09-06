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
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Store } from '@ngxs/store';
import {
  ICategory,
  IProduct,
} from '../../../core/interfaces/product.interface';
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

  parentCategories: ICategory[] = [];
  subcategories: ICategory[] = [];

  products$: Observable<IProduct[]> = new Observable();
  products: IProduct[] = [];

  selectedOption: number | null = null;
  selectedSubOption: number | null = null;

  searchTerm: string = '';

  constructor(private router: Router, private store: Store) {
    this.categories$ = this.store.select(CategoryState.getCategories);
    this.products$ = this.store.select(ProductState.getProducts);
  }

  ngOnInit() {
    this.subscribeState();
  }

  subscribeState() {
    this.categories$.pipe(takeUntil(this.destroy)).subscribe((categories) => {
      if (categories) {
        const { parentCategories, subcategories } =
          this.separateParentAndSubcategories(categories);
        this.categories = categories;
        this.parentCategories = parentCategories;
      }
    });
  }

  separateParentAndSubcategories(categories: ICategory[]): {
    parentCategories: ICategory[];
    subcategories: ICategory[];
  } {
    const parentCategories: ICategory[] = [];
    const subcategories: ICategory[] = [];

    categories.forEach((category) => {
      if (!category.parent) {
        parentCategories.push(category);
      } else {
        subcategories.push(category);
      }
    });

    return { parentCategories, subcategories };
  }

  ngAfterViewInit() {}

  selectOption(option: number): void {
    this.selectedOption = option;
    this.subcategories = this.getSubcategoriesByParent(option);
    const element = document.getElementById('category-' + option);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  getSubcategoriesByParent(parentId: number): ICategory[] {
    return this.categories.filter(
      (subcategory) => subcategory.parent && subcategory.parent.id === parentId
    );
  }

  selectSubcategory(subcategoryId: number): void {
    this.selectedSubOption = subcategoryId;
    const element = document.getElementById('category-' + subcategoryId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  redirectToProduct(product: IProduct) {
    this.router.navigate([`/shop/product/${product.id}`]);
  }

  filterCategories(): ICategory[] {
    if (!this.searchTerm) return this.parentCategories;

    return this.parentCategories.filter((category) =>
      category.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
