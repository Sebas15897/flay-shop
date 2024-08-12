import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './layout/footer/footer.component';

@NgModule({
  declarations: [LayoutComponent, SidebarComponent, HeaderComponent, FooterComponent],
  imports: [CommonModule, RouterModule],
  exports: [LayoutComponent],
})

export class SharedModule {}
