import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { StateModule } from './core/store/store.module';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { provideNgxMask } from 'ngx-mask';
import { LoadingInterceptor } from './core/interceptors/token-session/token-session-interceptor.interceptor';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MatDialogModule,
    RouterModule,
    AppRoutingModule,
    NgxSpinnerModule,
    StateModule,
    HttpClientModule,
    MatNativeDateModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    provideNgxMask(),
  ],
  bootstrap: [AppComponent],
})

export class AppModule {}
