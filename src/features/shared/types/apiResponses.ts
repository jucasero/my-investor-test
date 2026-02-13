export type successResponse<T> = {
  message: string;
  data: T;
};

export type successResponseWithPagination<T> = {
  pagination: {
    page: number;
    limit: number;
    totalFunds: number;
    totalPages: number;
  };
  data: T[];
};

export type errorResponse = {
  error: string;
};
