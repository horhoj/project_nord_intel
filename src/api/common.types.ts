// Тип возвращаемой ошибки для getApiErrors
export interface ApiError {
  errorMessage: string;
  errorResponseMessage?: string;
  errors?: Record<string, string[]>;
}
