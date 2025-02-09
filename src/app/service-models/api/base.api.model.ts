export interface HttpResponse<T> {
  success: boolean;
  statusCode: number;
  data: T;
}
