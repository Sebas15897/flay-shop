import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import {
  LoadingHiddeAction,
  LoadingShowAction,
} from '../../store/loading/loading.actions';
import { MatDialog } from '@angular/material/dialog';
import { FlayAlertComponent } from '../../components/flay-alert/flay-alert.component';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private store: Store, private dialog: MatDialog) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.store.dispatch(new LoadingShowAction());

    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // Puedes agregar cualquier lógica aquí si es necesario
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.dialog.open(FlayAlertComponent, {
          width: 'auto',
          data: {
            title: '¡Error!',
            type: 'error',
            text: error.error.message,
            saveButtonText: 'Ok',
            hiddeCancelBtn: true,
          },
        });
        return throwError(() => error);
      }),
      finalize(() => {
        this.store.dispatch(new LoadingHiddeAction());
      })
    );
  }
}
