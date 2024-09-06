import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})

export class LayoutComponent {
  showAlternativeFooter: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateFooter();
      });

    this.updateFooter();
  }

  updateFooter() {
    const currentRoute = this.router.url;
    this.showAlternativeFooter =
      currentRoute.includes('/shop/product') ||
      currentRoute.includes('/shop/shopping-cart') ||
      currentRoute.includes('/shop/shipping-information');
  }
}
