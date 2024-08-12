import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './layout/footer/footer.component';
import { SidebarService } from './layout/services/aside.service';
import { FooterCartComponent } from './layout/footer-cart/footer-cart.component';

@NgModule({
  declarations: [LayoutComponent, SidebarComponent, HeaderComponent, FooterComponent, FooterCartComponent],
  imports: [CommonModule, RouterModule],
  exports: [LayoutComponent],
  providers: [SidebarService],
})

export class SharedModule {}
