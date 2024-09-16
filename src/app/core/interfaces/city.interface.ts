export interface ICitiesResponse {
  statusCode: number;
  message:    string;
  data:       ICity[];
}

export interface ICity {
  id:   number;
  name: string;
}
