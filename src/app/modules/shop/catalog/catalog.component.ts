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
import { IStore } from '../../../core/interfaces/store-config.interface';
import { StoreState } from '../../../core/store/store/store.state';

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

  tenant$: Observable<IStore> = new Observable();
  tenant: IStore = null;

  selectedOption: number | null = null;
  selectedSubOption: number | null = null;

  searchTerm: string = '';

  constructor(private router: Router, private store: Store) {
    this.categories$ = this.store.select(CategoryState.getCategories);
    this.products$ = this.store.select(ProductState.getProducts);
    this.tenant$ = this.store.select(StoreState.getStore);
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

    this.tenant$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      if (resp) {
        console.log(resp);
        this.tenant = resp;
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

  filterProducts(): ICategory[] {
    if (!this.searchTerm) {
      return this.categories;
    }

    return this.categories.map(category => ({
      ...category,
      product: category.product.filter(product =>
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    })).filter(category => category.product.length > 0);
  }


  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
