import {
  IAddClientPayload,
  IClientInfoPayload,
  IClient,
} from '../../interfaces/client.interface';

export class GetClientInfoAction {
  static readonly type = '[Client] Get Client Info';
  constructor(public payload: IClientInfoPayload) {}
}

export class AddNewClientAction {
  static readonly type = '[Client] Add New Client';
  constructor(public payload: IAddClientPayload) {}
}

export class SetClientAction {
  static readonly type = '[Client] Set Client';
  constructor(public client: IClient) {}
}

export class SetNewClientAction {
  static readonly type = '[Client] Set New Client';
  constructor(public newClient: IClient) {}
}
