import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from '../services/aside.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isVisible = false;

  constructor(
    private router: Router,
    private sidebarService: SidebarService
  ) {}

  ngOnInit() {
    this.sidebarService.sidebarVisible$.subscribe(isVisible => {
      this.isVisible = isVisible;
      if (isVisible == true) {
        document.body.style.overflow = 'hidden';
      }else{
        document.body.style.overflow = '';
      }
    });
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  redirectToCart(){
    this.router.navigate(['/shop/shopping-cart']);
    
    if (this.isVisible == true) {
      this.toggleSidebar();
    }
  }

  redirectToHome(){
    this.router.navigate(['/shop/home']);

    if (this.isVisible == true) {
      this.toggleSidebar();
    }
  }

  redirectToCatalog(){
    this.router.navigate(['/shop/catalog']);

    if (this.isVisible == true) {
      this.toggleSidebar();
    }
  }
}