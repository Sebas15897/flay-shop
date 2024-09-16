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

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(
    private store: Store,
  ) {}

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
/*         this.sweetAlertHelper.createCustomAlert({
          title: 'Error',
          text: 'Ha ocurrido un error. Si el problema persiste, por favor, contacta con soporte técnico.',
          icon: 'error',
        }); */

        return throwError(() => error);
      }),
      finalize(() => {
        this.store.dispatch(new LoadingHiddeAction());
      })
    );
  }
}
