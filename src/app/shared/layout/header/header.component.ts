import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService  } from '../services/aside.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    private router: Router,
    private sidebarService : SidebarService
  ) {}

  redirectToHome(){
    this.router.navigate(['/shop/home']);
  }

  redirectToCart(){
    this.router.navigate(['/shop/shopping-cart']);
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}