export interface IDefaultResponse<T> {
  statusCode: number;
  message:    string;
  data:       T[] | T;
}
