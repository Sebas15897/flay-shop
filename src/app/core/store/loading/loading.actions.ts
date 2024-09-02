export class LoadingShowAction {
  static readonly type = '[Loading] Show';
  constructor() {}
}

export class LoadingHiddeAction {
  static readonly type = '[Loading] Hidde';
  constructor() {}
}

export class AddLoadingTextAction {
  static readonly type = '[Loading] Add text loading';
  constructor(public payload: string) {}
}
