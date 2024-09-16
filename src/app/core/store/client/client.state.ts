import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { ClientService } from '../../services/client/client.service';
import {
  GetClientInfoAction,
  AddNewClientAction,
  SetClientAction,
} from './client.actions';
import { IClient } from '../../interfaces/client.interface';
import { tap } from 'rxjs/operators';
import { FlayAlertComponent } from '../../components/flay-alert/flay-alert.component';
import { MatDialog } from '@angular/material/dialog';

export class ClientStateModel {
  client: IClient | null;
}

@State<ClientStateModel>({
  name: 'client',
  defaults: {
    client: null,
  },
})
@Injectable()
export class ClientState {
  constructor(
    private clientService: ClientService,
    private dialog: MatDialog
  ) {}

  @Selector()
  static getClient(state: ClientStateModel): IClient | null {
    return state.client;
  }

  @Action(GetClientInfoAction)
  getClientInfo(
    ctx: StateContext<ClientStateModel>,
    { payload }: GetClientInfoAction
  ) {
    return this.clientService.getClientInfo(payload).pipe(
      tap(
        (client: IClient) => {
          if (client) {
            ctx.dispatch(new SetClientAction(client));
          }
        },
        (error) => {
          if (error.status === 404) {
            this.dialog.open(FlayAlertComponent, {
              width: 'auto',
              data: {
                title: '¡Error!',
                type: 'error',
                text: 'Cliente no encontrado',
                saveButtonText: 'Ok',
                hiddeCancelBtn: true,
              },
            });
          }
        }
      )
    );
  }

  @Action(AddNewClientAction)
  addNewClient(
    ctx: StateContext<ClientStateModel>,
    { payload, tenantId }: AddNewClientAction
  ) {
    return this.clientService.addNewCLients(payload, tenantId).pipe(
      tap((client: IClient) => {
        ctx.dispatch(new SetClientAction(client));
      })
    );
  }

  @Action(SetClientAction)
  setClient(ctx: StateContext<ClientStateModel>, { client }: SetClientAction) {
    ctx.patchState({ client });
  }
}
